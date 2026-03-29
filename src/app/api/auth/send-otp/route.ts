import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { directusAdmin } from '@/lib/directus-admin';
import { createItem, readItems, deleteItems } from '@directus/sdk';
import type { OtpCode } from '@/lib/directus';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Delete any existing unused OTPs for this email
    const existing = await directusAdmin.request(
      readItems('otp_codes', {
        filter: { email: { _eq: normalizedEmail }, used: { _eq: false } },
        fields: ['id'],
      } as never)
    ) as unknown as OtpCode[];

    if (existing.length) {
      await directusAdmin.request(
        deleteItems('otp_codes', existing.map((r) => r.id) as never)
      );
    }

    // Generate new OTP — expires in 10 minutes
    const code = generateOTP();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await directusAdmin.request(
      createItem('otp_codes', {
        email: normalizedEmail,
        code,
        expires_at,
        used: false,
      } as never)
    );

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'Infysmart <noreply@infysmart.com>',
      to: normalizedEmail,
      subject: `${code} — Your Infysmart Login Code`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
            <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
              <div style="background:#2563eb;padding:28px 32px;">
                <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Infy<span style="color:#fbbf24;">Smart</span></h1>
              </div>
              <div style="padding:32px;">
                <h2 style="margin:0 0 8px;color:#0f172a;font-size:18px;">Your Login Code</h2>
                <p style="margin:0 0 24px;color:#64748b;font-size:14px;">Use this one-time code to sign in to your Infysmart account. It expires in <strong>10 minutes</strong>.</p>
                <div style="background:#f1f5f9;border-radius:10px;padding:24px;text-align:center;letter-spacing:12px;font-size:36px;font-weight:800;color:#2563eb;margin-bottom:24px;">
                  ${code}
                </div>
                <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
