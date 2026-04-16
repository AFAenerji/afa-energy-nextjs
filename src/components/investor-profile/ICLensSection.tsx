import clsx from 'clsx';

interface Question {
  text: string;
}

interface ICLensSectionProps {
  kicker: string;
  h2: string;
  questions: Question[];
}

export default function ICLensSection({ kicker, h2, questions }: ICLensSectionProps) {
  return (
    <section
      aria-labelledby="y3-5-title"
      className="bg-white"
      style={{ padding: '80px 0' }}
    >
      <div className={clsx('max-w-[1180px]', 'mx-auto', 'px-[52px]')}>
        {/* Header */}
        <div className={clsx('text-center', 'mb-12')}>
          <div
            className={clsx('text-xs', 'font-semibold', 'uppercase', 'tracking-wider', 'mb-3')}
            style={{ color: '#28AFB0', letterSpacing: '0.18em' }}
          >
            {kicker}
          </div>
          <h2
            id="y3-5-title"
            className={clsx('text-3xl', 'font-bold')}
            style={{ color: '#0F2E2C', fontFamily: 'Montserrat, sans-serif' }}
          >
            {h2}
          </h2>
        </div>

        {/* Questions List - max-width: 640px */}
        <div className={clsx('max-w-[640px]', 'mx-auto')}>
          {questions.map((question, index) => (
            <div key={index} className={clsx('flex', 'gap-4', 'items-start', 'mb-5')}>
              {/* Number circle - 32px, afa-accent */}
              <div
                className={clsx('flex', 'items-center', 'justify-center', 'rounded-full', 'shrink-0')}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#28AFB0',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {index + 1}
              </div>

              {/* Question text */}
              <p
                className={clsx('text-base', 'leading-relaxed')}
                style={{ color: '#0F2E2C', fontWeight: 500 }}
              >
                {question.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[class*="px-"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
