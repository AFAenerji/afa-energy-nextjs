import { NextResponse } from 'next/server';

interface AssessmentBody {
  name: string;
  email: string;
  company?: string;
  atrStatus: string;
  capacity: string;
  projectPhase: string;
  dataReady: string;
  locale: string;
  _hp?: string;
}

const ATR_LABELS: Record<string, string> = {
  approved: 'Onaylandı',
  'in-process': 'Süreçte',
  none: 'Yok',
};

const PHASE_LABELS: Record<string, string> = {
  'land-development': 'Arazi Geliştirme',
  rtb: 'RTB (Ready to Build)',
  operational: 'İşletme',
};

const DATA_LABELS: Record<string, string> = {
  yes: 'Evet',
  no: 'Hayır',
};

export async function POST(request: Request) {
  try {
    const body: AssessmentBody = await request.json();

    // Honeypot check
    if (body._hp) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
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

    const atrLabel = ATR_LABELS[body.atrStatus] || body.atrStatus;
    const phaseLabel = PHASE_LABELS[body.projectPhase] || body.projectPhase;
    const dataLabel = DATA_LABELS[body.dataReady] || body.dataReady;

    const apiKey = process.env.RESEND_API_KEY;
    const targetInbox = process.env.ASSESSMENT_INBOX || 'afa_form_360@afaenerji.com';

    if (!apiKey) {
      console.log('[Technical Assessment Submission]', {
        name: body.name,
        email: body.email,
        company: body.company || '—',
        atrStatus: atrLabel,
        capacity: `${body.capacity} MW`,
        projectPhase: phaseLabel,
        dataReady: dataLabel,
        locale: body.locale,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({ success: true });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    // 1) Internal notification
    await resend.emails.send({
      from: 'AFA Energy <noreply@afaenergy.ro>',
      to: [targetInbox],
      replyTo: body.email,
      subject: `[Teknik Ön Değerlendirme] ${body.name} — ${body.capacity} MW`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #18625F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFCB00; font-size: 18px; margin: 0;">Teknik Ön Değerlendirme Talebi</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;">AFA Energy Romania — Yatırımcı Tarafı</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;">Ad Soyad:</td>
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
              <tr style="border-top: 1px solid #E0E0E0;">
                <td style="padding: 12px 0 8px; color: #666;">ATR Durumu:</td>
                <td style="padding: 12px 0 8px; font-weight: 600; color: #18625F;">${atrLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Kurulu Güç:</td>
                <td style="padding: 8px 0; font-weight: 600;">${body.capacity} MW</td>
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
                <td style="padding: 8px 0; color: #666;">Dil:</td>
                <td style="padding: 8px 0;">${(body.locale || 'tr').toUpperCase()}</td>
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
      subject: 'Teknik Ön Değerlendirme Talebiniz Alındı — AFA Energy Romania',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #18625F; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FFCB00; font-size: 18px; margin: 0;">AFA Energy Romania</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;">Teknik Ön Değerlendirme</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #E0E0E0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 14px; color: #333; line-height: 1.6;">Sayın ${body.name},</p>
            <p style="font-size: 14px; color: #333; line-height: 1.6;">Teknik ön değerlendirme talebiniz başarıyla alınmıştır. Ekibimiz talebinizi 48 saat içinde inceleyecek ve size geri dönüş yapacaktır.</p>
            <p style="font-size: 14px; color: #333; line-height: 1.6; font-weight: 600;">Süreç Adımları:</p>
            <ol style="font-size: 14px; color: #333; line-height: 1.8; padding-left: 20px;">
              <li>Talebiniz teknik ekibimiz tarafından incelenecektir.</li>
              <li>Ön değerlendirme kapsamı ve zaman çizelgesi paylaşılacaktır.</li>
              <li>ATR Matrix metodolojisi ile bağımsız teknik analiz başlatılacaktır.</li>
              <li>Nihai rapor ve yatırım kararı desteği sunulacaktır.</li>
            </ol>
            <p style="font-size: 13px; color: #666; margin-top: 24px; border-top: 1px solid #E0E0E0; padding-top: 16px;">
              Bu otomatik bir bilgilendirme mesajıdır. Sorularınız için doğrudan bu e-postaya yanıt verebilirsiniz.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Assessment API Error]', err);
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 },
    );
  }
}
