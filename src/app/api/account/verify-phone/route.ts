import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { directusAdmin } from '@/lib/directus-admin';
import { readItems, updateItem } from '@directus/sdk';
import type { OtpCode } from '@/lib/directus';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { phone, otp } = await request.json() as { phone: string; otp: string };
    const cleanPhone = phone?.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10 || !otp) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Verify OTP
    const records = await directusAdmin.request(
      readItems('otp_codes', {
        filter: {
          phone: { _eq: cleanPhone },
          code: { _eq: otp },
          used: { _eq: false },
          expires_at: { _gt: new Date().toISOString() },
        },
        sort: ['-date_created'],
        limit: 1,
      } as never)
    ) as unknown as OtpCode[];

    if (!records.length) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    // Mark OTP used
    await directusAdmin.request(
      updateItem('otp_codes', records[0].id, { used: true } as never)
    );

    // Save phone to customer
    await directusAdmin.request(
      updateItem('customers', Number(session.user.id), { phone: cleanPhone } as never)
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('verify-phone error:', err);
    return NextResponse.json({ error: 'Failed to verify phone' }, { status: 500 });
  }
}
