'use client';

// AFA ENERGY ROMANIA - GLOBAL HATA ARAYÜZÜ (v5.0 Nötr Dil Standardı)

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif', backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ padding: '48px', textAlign: 'center', maxWidth: '600px' }}>
          
          {/* Başlık: Nötr ve Otoriter */}
          <h1 style={{ color: '#18625F', fontSize: '24px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            İŞLEM TAMAMLANAMADI
          </h1>
          
          {/* Açıklama: Teknik detay yok, süre vaadi yok */}
          <p style={{ color: '#666666', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
            Şu anda teknik bir kontrol yürütülmektedir. Lütfen daha sonra tekrar deneyin.
          </p>

          {/* Aksiyon: Buton Tasarımı */}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#18625F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            YENİDEN DENE
          </button>

          {/* Alternatif Erişim (Locale Uyumlu Göreli Link) */}
          <div style={{ marginTop: '24px' }}>
            <a href="./" style={{ color: '#18625F', fontSize: '14px', textDecoration: 'none', borderBottom: '1px solid #18625F' }}>
              Ana Sayfaya Dön
            </a>
          </div>

        </div>
      </body>
    </html>
  );
}
