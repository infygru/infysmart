import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems, createItem, updateItem } from '@directus/sdk';
import type { Customer, OtpCode } from '@/lib/directus';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      id: 'email-otp',
      name: 'Email OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string)?.toLowerCase().trim();
        const otp = (credentials?.otp as string)?.trim();
        if (!email || !otp) return null;

        // Find a valid, unused, non-expired OTP
        const records = await directusAdmin.request(
          readItems('otp_codes', {
            filter: {
              email: { _eq: email },
              code: { _eq: otp },
              used: { _eq: false },
              expires_at: { _gt: new Date().toISOString() },
            },
            sort: ['-date_created'],
            limit: 1,
          } as never)
        ) as unknown as OtpCode[];

        if (!records.length) return null;

        // Mark OTP as used
        await directusAdmin.request(
          updateItem('otp_codes', records[0].id, { used: true } as never)
        );

        // Find or create customer
        const existing = await directusAdmin.request(
          readItems('customers', {
            filter: { email: { _eq: email } },
            limit: 1,
          } as never)
        ) as unknown as Customer[];

        let customer: Customer;
        if (existing.length) {
          customer = existing[0];
          if (!customer.email_verified) {
            await directusAdmin.request(
              updateItem('customers', customer.id, { email_verified: true } as never)
            );
          }
        } else {
          customer = await directusAdmin.request(
            createItem('customers', {
              email,
              email_verified: true,
              status: 'active',
            } as never)
          ) as unknown as Customer;
        }

        return {
          id: String(customer.id),
          email: customer.email,
          name: customer.name ?? null,
          image: customer.avatar ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Only runs on initial sign-in (when account is present)
      if (account && user) {
        if (account.provider === 'google') {
          const email = token.email?.toLowerCase();
          if (email) {
            const existing = await directusAdmin.request(
              readItems('customers', {
                filter: { email: { _eq: email } },
                limit: 1,
              } as never)
            ) as unknown as Customer[];

            if (existing.length) {
              token.customerId = String(existing[0].id);
              // Backfill google_id + avatar if first Google login
              if (!existing[0].google_id) {
                await directusAdmin.request(
                  updateItem('customers', existing[0].id, {
                    google_id: account.providerAccountId,
                    avatar: user.image ?? undefined,
                    email_verified: true,
                    name: existing[0].name ?? user.name ?? undefined,
                  } as never)
                );
              }
            } else {
              const newCustomer = await directusAdmin.request(
                createItem('customers', {
                  email,
                  name: user.name ?? null,
                  google_id: account.providerAccountId,
                  avatar: user.image ?? null,
                  email_verified: true,
                  status: 'active',
                } as never)
              ) as unknown as Customer;
              token.customerId = String(newCustomer.id);
            }
          }
        } else {
          // Email OTP — user.id is already the Directus customer ID
          token.customerId = user.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.customerId) {
        session.user.id = token.customerId as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  session: { strategy: 'jwt' },
});
