import { Suspense } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems } from '@directus/sdk';
import type { Customer } from '@/lib/directus';
import ProfileClient from './ProfileClient';
import { Loader2 } from 'lucide-react';

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/login?callbackUrl=/account');

  const customers = await directusAdmin.request(
    readItems('customers', {
      filter: { id: { _eq: Number(session.user.id) } },
      fields: ['id', 'name', 'email', 'phone', 'email_verified', 'google_id', 'avatar', 'status', 'date_created', 'saved_address'],
      limit: 1,
    } as never)
  ) as unknown as Customer[];

  const customer = customers[0] ?? null;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    }>
      <ProfileClient
        customer={customer}
        sessionEmail={session.user.email ?? ''}
        sessionName={session.user.name ?? ''}
      />
    </Suspense>
  );
}
