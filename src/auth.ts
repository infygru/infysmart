import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems, createItem, updateItem } from '@directus/sdk';
import type { Customer, OtpCode } from '@/lib/directus';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,

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
        try {
          const email = (credentials?.email as string)?.toLowerCase().trim();
          const otp = (credentials?.otp as string)?.trim();
          if (!email || !otp) return null;

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

          await directusAdmin.request(
            updateItem('otp_codes', records[0].id, { used: true } as never)
          );

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
        } catch (err) {
          console.error('[email-otp authorize]', err);
          return null;
        }
      },
    }),

    Credentials({
      id: 'phone-otp',
      name: 'Phone OTP',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const phone = (credentials?.phone as string)?.replace(/\D/g, '');
          const otp = (credentials?.otp as string)?.trim();
          if (!phone || phone.length !== 10 || !otp) return null;

          const records = await directusAdmin.request(
            readItems('otp_codes', {
              filter: {
                phone: { _eq: phone },
                code: { _eq: otp },
                used: { _eq: false },
                expires_at: { _gt: new Date().toISOString() },
              },
              sort: ['-date_created'],
              limit: 1,
            } as never)
          ) as unknown as OtpCode[];

          if (!records.length) return null;

          await directusAdmin.request(
            updateItem('otp_codes', records[0].id, { used: true } as never)
          );

          const existing = await directusAdmin.request(
            readItems('customers', {
              filter: { phone: { _eq: phone } },
              limit: 1,
            } as never)
          ) as unknown as Customer[];

          let customer: Customer;
          if (existing.length) {
            customer = existing[0];
          } else {
            customer = await directusAdmin.request(
              createItem('customers', {
                phone,
                status: 'active',
              } as never)
            ) as unknown as Customer;
          }

          return {
            id: String(customer.id),
            email: customer.email ?? null,
            name: customer.name ?? null,
            image: customer.avatar ?? null,
          };
        } catch (err) {
          console.error('[phone-otp authorize]', err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === 'google') {
          try {
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
          } catch (err) {
            console.error('[jwt google callback]', err);
          }
        } else {
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
