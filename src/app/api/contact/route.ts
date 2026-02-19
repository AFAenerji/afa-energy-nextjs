import { NextResponse } from 'next/server';

interface ContactBody {
  name: string;
  email: string;
  company?: string;
  message: string;
  role: string;
  locale: string;
}

const roleLabels: Record<string, string> = {
  investor: 'Yatırımcı / Fon',
  developer: 'Geliştirici / Proje',
  default: 'Genel Başvuru',
};

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve mesaj alanları zorunludur.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // If no API key, log to console and return success (dev mode)
      console.log('[Contact Form Submission]', {
        name: body.name,
        email: body.email,
        company: body.company || '—',
        role: roleLabels[body.role] || body.role,
        locale: body.locale,
        message: body.message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ success: true });
    }

    // Send via Resend
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const roleLabel = roleLabels[body.role] || body.role;

    await resend.emails.send({
      from: 'AFA Energy <noreply@afaenergy.ro>',
      to: ['info@afaenergy.ro'],
      replyTo: body.email,
      subject: `[${roleLabel}] Yeni İletişim Talebi — ${body.name}`,
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
                <td style="padding: 8px 0; font-weight: 600;">${body.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">E-posta:</td>
                <td style="padding: 8px 0;"><a href="mailto:${body.email}" style="color: #18625F;">${body.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Kurum:</td>
                <td style="padding: 8px 0;">${body.company || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Dil:</td>
                <td style="padding: 8px 0;">${body.locale.toUpperCase()}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E0E0E0;">
              <p style="color: #666; font-size: 13px; margin: 0 0 8px;">Mesaj:</p>
              <p style="color: #0B1F1E; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${body.message}</p>
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
      { status: 500 }
    );
  }
}
