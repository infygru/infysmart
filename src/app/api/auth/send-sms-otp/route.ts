import { NextResponse } from 'next/server';
import { directusAdmin } from '@/lib/directus-admin';
import { createItem, readItems, deleteItems } from '@directus/sdk';
import { sendOTPSMS } from '@/lib/fast2sms';
import type { OtpCode } from '@/lib/directus';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json() as { phone: string };

    const cleaned = phone?.replace(/\D/g, '');
    if (!cleaned || cleaned.length !== 10) {
      return NextResponse.json({ error: 'Valid 10-digit mobile number required' }, { status: 400 });
    }

    // Delete existing unused OTPs for this phone
    const existing = await directusAdmin.request(
      readItems('otp_codes', {
        filter: { phone: { _eq: cleaned }, used: { _eq: false } },
        fields: ['id'],
      } as never)
    ) as unknown as OtpCode[];

    if (existing.length) {
      await directusAdmin.request(
        deleteItems('otp_codes', existing.map((r) => r.id) as never)
      );
    }

    const code = generateOTP();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await directusAdmin.request(
      createItem('otp_codes', {
        phone: cleaned,
        code,
        expires_at,
        used: false,
      } as never)
    );

    const sent = await sendOTPSMS(cleaned, code);
    if (!sent) {
      return NextResponse.json({ error: 'Failed to send SMS. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send SMS OTP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
