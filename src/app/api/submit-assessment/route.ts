import { NextResponse } from 'next/server';
import { escapeHtml } from '@/lib/security/escapeHtml';
import { isValidEmail } from '@/lib/security/validateEmail';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';
import { generateReferenceCode } from '@/lib/referenceCode';

interface AssessmentBody {
  name: string;
  email: string;
  company?: string;
  atrStatus: string;
  capacity: string;
  projectPhase: string;
  dataReady: string;
  selectedFlow?: string;
  locale: string;
  _hp?: string;
}

const RATE_LIMIT = { maxRequests: 5, windowMs: 60_000 };

const ATR_LABELS: Record<string, string> = {
  approved: 'Onaylandı',
  'in-process': 'Süreçte',
  none: 'Yok',
};

const PHASE_LABELS: Record<string, string> = {
  'land-development': 'Arazi geliştirme',
  rtb: 'İnşaata hazır (ready-to-build, RTB)',
  operational: 'İşletmede',
};

const DATA_LABELS: Record<string, string> = {
  yes: 'Evet',
  no: 'Hayır',
};

const FLOW_LABELS: Record<string, string> = {
  A: 'Yol A — Teknik durum tespiti',
  B: 'Yol B — ATR ve şebeke analizi',
  C: 'Yol C — mevzuat ve izin denetimi',
};

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const limit = checkRateLimit(`assessment:${ip}`, RATE_LIMIT);
    if (!limit.allowed) {
    return NextResponse.json(
  { error: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyiniz.' },
  {
    status: 429,
    headers: {
      'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
      'X-RateLimit-Remaining': '0',
    },
  },
);
    }

    const body: AssessmentBody = await request.json();

    // Honeypot check — silently accept but discard
    if (body._hp) {
      console.warn('[Assessment Honeypot Triggered]', { ip, timestamp: new Date().toISOString() });
      return NextResponse.json({ success: true });
    }

    // Server-side validation
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: 'Ad alanı zorunludur.' },
        { status: 400 },
      );
    }

    if (!body.email?.trim()) {
      return NextResponse.json(
        { error: 'E-posta alanı zorunludur.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 },
      );
    }

    if (!body.atrStatus || !body.capacity?.trim() || !body.projectPhase || !body.dataReady) {
      return NextResponse.json(
        { error: 'Tüm teknik alanlar zorunludur.' },
        { status: 400 },
      );
    }

    // Sanitize all user-provided values before template injection
    const safeName = escapeHtml(body.name.trim());
    const safeEmail = escapeHtml(body.email.trim());
    const safeCompany = escapeHtml((body.company || '—').trim());
    const safeCapacity = escapeHtml(body.capacity.trim());
    const safeLocale = escapeHtml((body.locale || 'tr').trim());
    const atrLabel = escapeHtml(ATR_LABELS[body.atrStatus] || body.atrStatus);
    const phaseLabel = escapeHtml(PHASE_LABELS[body.projectPhase] || body.projectPhase);
    const dataLabel = escapeHtml(DATA_LABELS[body.dataReady] || body.dataReady);
    const safeFlow = escapeHtml(FLOW_LABELS[body.selectedFlow || ''] || body.selectedFlow || '—');

    const referenceCode = generateReferenceCode();

    const apiKey = process.env.RESEND_API_KEY;
    const targetInbox = process.env.ASSESSMENT_INBOX || 'hq@afaenergy.ro';

    if (!apiKey) {
      console.log('[Technical Assessment Submission]', {
        referenceCode,
        name: safeName,
        email: safeEmail,
        company: safeCompany,
        atrStatus: atrLabel,
        capacity: `${safeCapacity} MW`,
        projectPhase: phaseLabel,
        dataReady: dataLabel,
        locale: safeLocale,
        selectedFlow: safeFlow,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ success: true, referenceCode });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    // 1) Internal notification
    await resend.emails.send({
      from: 'AFA Energy <noreply@afaenergy.ro>',
      to: [targetInbox],
      replyTo: body.email,
      subject: `[${referenceCode}] Teknik Ön Değerlendirme — ${safeName} — ${safeCapacity} MW`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #18625F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFCB00; font-size: 18px; margin: 0;">Teknik Ön Değerlendirme Talebi</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;">AFA Energy Romania — Yatırımcı Tarafı</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;">Referans Kodu:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #18625F; font-family: monospace; font-size: 15px;">${referenceCode}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;">Ad Soyad:</td>
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
              <tr style="border-top: 1px solid #E0E0E0;">
                <td style="padding: 12px 0 8px; color: #666;">ATR Durumu:</td>
                <td style="padding: 12px 0 8px; font-weight: 600; color: #18625F;">${atrLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Kurulu Güç:</td>
                <td style="padding: 8px 0; font-weight: 600;">${safeCapacity} MW</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Proje Aşaması:</td>
                <td style="padding: 8px 0;">${phaseLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Veri Durumu:</td>
                <td style="padding: 8px 0;">${dataLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Hizmet Yolu:</td>
                <td style="padding: 8px 0; font-weight: 600;">${safeFlow}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Dil:</td>
                <td style="padding: 8px 0;">${safeLocale.toUpperCase()}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    // 2) Auto-response to applicant
    await resend.emails.send({
      from: 'AFA Energy <noreply@afaenergy.ro>',
      to: [body.email],
      subject: `[${referenceCode}] Teknik Ön Değerlendirme Talebiniz Alındı — AFA Energy Romania`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #18625F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFCB00; font-size: 18px; margin: 0;">AFA Energy Romania</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;">Teknik Ön Değerlendirme</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 14px; color: #333; line-height: 1.6;">Sayın ${safeName},</p>
            <p style="font-size: 14px; color: #333; line-height: 1.6;">Teknik ön değerlendirme talebiniz başarıyla alınmıştır. Ekibimiz talebinizi inceleyerek 3 iş günü içinde size geri dönüş sağlayacaktır.</p>
            <p style="font-size: 14px; color: #18625F; line-height: 1.6; font-weight: 600;">Referans Kodunuz: <span style="font-family: monospace; font-size: 15px;">${referenceCode}</span></p>
            <p style="font-size: 14px; color: #333; line-height: 1.6; font-weight: 600;">Süreç Adımları:</p>
            <ol style="font-size: 14px; color: #333; line-height: 1.8; padding-left: 20px;">
              <li>Talebiniz teknik ekibimiz tarafından incelenecektir.</li>
              <li>Ön değerlendirme kapsamı ve zaman çizelgesi paylaşılacaktır.</li>
              <li>ATR Matrisi metodolojisi ile bağımsız teknik analiz başlatılacaktır.</li>
              <li>Nihai rapor ve yatırım kararı desteği sunulacaktır.</li>
            </ol>
            <p style="font-size: 13px; color: #666; margin-top: 24px; border-top: 1px solid #E0E0E0; padding-top: 16px;">
              Bu otomatik bir bilgilendirme mesajıdır. Sorularınız için doğrudan bu e-postaya yanıt verebilirsiniz.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, referenceCode });
  } catch (err) {
    console.error('[Assessment API Error]', err);
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 },
    );
  }
}
