'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface B6B7KapanisProps {
  content: {
    pullQuote: string;
    h2: string;
    subtitle: string;
    body: string;
    cta1Text: string;
    cta1Href: string;
    cta2Text: string;
    cta2Href: string;
    disclaimer: string;
  };
}

export default function B6B7Kapanis({ content }: B6B7KapanisProps) {
  return (
    <section style={{ backgroundColor: '#F8FAFB', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className={clsx('mx-auto', 'flex', 'flex-col', 'items-center')} style={{ maxWidth: '1180px', padding: '0 52px' }}>
        {/* Pull Quote */}
        <div
          className={clsx('font-bold', 'italic')}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '26px',
            lineHeight: '1.4',
            color: '#18625F',
            borderLeft: '4px solid #FFCB00',
            paddingLeft: '24px',
            maxWidth: '720px',
            width: '100%',
            margin: '0 auto 60px',
            fontWeight: 700,
          }}
        >
          {content.pullQuote}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: '720px',
            height: '1px',
            background: '#E5E7EB',
            margin: '0 auto 56px',
          }}
        />

        {/* H2 */}
        <h2
          className={clsx('text-center', 'font-extrabold', 'mb-4')}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            color: '#1A2A2A',
            fontWeight: 800,
          }}
        >
          {content.h2}
        </h2>

        {/* Subtitle */}
        <p
          className={clsx('text-center', 'font-semibold', 'italic', 'mb-6')}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '17px',
            lineHeight: '1.5',
            color: '#18625F',
            fontWeight: 600,
            whiteSpace: 'pre-line',
          }}
        >
          {content.subtitle}
        </p>

        {/* Body */}
        <p
          className="text-center"
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#6B7280',
            maxWidth: '640px',
            margin: '0 auto 40px',
          }}
        >
          {content.body}
        </p>

        {/* CTA Group */}
        <div className={clsx('flex', 'flex-row', 'items-center', 'gap-4', 'mb-5')} style={{ justifyContent: 'center' }}>
          {/* CTA 1 - Primary Gold */}
          <Link
            href={content.cta1Href}
            className={clsx('font-bold', 'rounded-md', 'transition-background-color', 'duration-[120ms]', 'ease-linear', 'transition-box-shadow')}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '15px',
              padding: '14px 28px',
              backgroundColor: '#FFCB00',
              color: '#0F2E2C',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E6B800';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,203,0,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFCB00';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
            }}
          >
            {content.cta1Text}
          </Link>

          {/* CTA 2 - Secondary Teal Outline */}
          <Link
            href={content.cta2Href}
            className={clsx('font-semibold', 'rounded-md', 'transition-background-color', 'duration-[120ms]', 'ease-linear', 'transition-border-color')}
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '15px',
              padding: '14px 28px',
              color: '#28AFB0',
              background: 'transparent',
              border: '2px solid #28AFB0',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(40,175,176,0.08)';
              e.currentTarget.style.borderColor = '#1F9092';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#28AFB0';
            }}
          >
            {content.cta2Text}
          </Link>
        </div>

        {/* Disclaimer */}
        <p
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '13px',
            fontStyle: 'normal',
            color: 'rgba(0,0,0,0.45)',
            lineHeight: '1.65',
            textAlign: 'center',
            maxWidth: '640px',
            margin: '20px auto 0',
          }}
        >
          {content.disclaimer}
        </p>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 640px) {
          section {
            padding: 64px 0 !important;
          }
          div[style*='padding: 0 52px'] {
            padding: 0 24px !important;
          }
          div[style*='fontSize: 26px'] {
            font-size: 20px !important;
          }
          div[style*='flex-row'] {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          a[style*='padding: 14px 28px'] {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
