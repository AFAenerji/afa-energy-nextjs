import { NextResponse } from 'next/server';
import { escapeHtml } from '@/lib/security/escapeHtml';
import { isValidEmail } from '@/lib/security/validateEmail';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';

interface ContactBody {
  name: string;
  email: string;
  company?: string;
  message: string;
  role: string;
  locale: string;
  _hp?: string;
}

const RATE_LIMIT = { maxRequests: 5, windowMs: 60_000 };

const roleLabels: Record<string, string> = {
  investor: 'Yatırımcı / Fon',
  developer: 'Geliştirici / Proje',
  default: 'Genel Başvuru',
};

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const limit = checkRateLimit(`contact:${ip}`, RATE_LIMIT);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        },
      );
    }

    const body: ContactBody = await request.json();

    // Honeypot check — silently accept but discard
    if (body._hp) {
      console.warn('[Contact Honeypot Triggered]', { ip, timestamp: new Date().toISOString() });
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve mesaj alanları zorunludur.' },
        { status: 400 },
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 },
      );
    }

    // Sanitize all user-provided values before template injection
    const safeName = escapeHtml(body.name.trim());
    const safeEmail = escapeHtml(body.email.trim());
    const safeCompany = escapeHtml((body.company || '—').trim());
    const safeMessage = escapeHtml(body.message.trim());
    const safeLocale = escapeHtml((body.locale || 'tr').trim());
    const roleLabel = escapeHtml(roleLabels[body.role] || body.role || 'Genel');

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // If no API key, log to console and return success (dev mode)
      console.log('[Contact Form Submission]', {
        name: safeName,
        email: safeEmail,
        company: safeCompany,
        role: roleLabel,
        locale: safeLocale,
        message: safeMessage,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ success: true });
    }

    // Send via Resend
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'AFA Energy <noreply@afaenergy.ro>',
      to: ['hq@afaenergy.ro'],
      replyTo: body.email,
      subject: `[${roleLabel}] Yeni İletişim Talebi — ${safeName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0F2E2C; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFCB00; font-size: 18px; margin: 0;">AFA Energy Romania</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;">Yeni İletişim Talebi</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;">Profil:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #18625F;">${roleLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Ad Soyad:</td>
                <td style="padding: 8px 0; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">E-posta:</td>
                <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #18625F;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Kurum:</td>
                <td style="padding: 8px 0;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Dil:</td>
                <td style="padding: 8px 0;">${safeLocale.toUpperCase()}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E0E0E0;">
              <p style="color: #666; font-size: 13px; margin: 0 0 8px;">Mesaj:</p>
              <p style="color: #0B1F1E; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 },
    );
  }
}
