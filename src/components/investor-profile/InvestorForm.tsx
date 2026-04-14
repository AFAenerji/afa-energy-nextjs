'use client';

import { useState } from 'react';

interface FormField {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  required?: boolean;
}

interface InvestorFormProps {
  step1Fields: FormField[];
  step2Fields: FormField[];
  consentText: string;
  legalDisclaimer: string;
  submitText: string;
}

export default function InvestorForm({
  step1Fields,
  step2Fields,
  consentText,
  legalDisclaimer,
  submitText,
}: InvestorFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  const goStep2 = () => {
    // Basit validation - tüm step 1 alanları dolu mu?
    const step1Complete = step1Fields.every((field) => formData[field.name]?.trim());
    if (step1Complete) {
      setCurrentStep(2);
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic - API endpoint'e gönderilecek
    console.log('Form submitted:', formData, consent);
    alert('Form gönderildi! (Gerçek implementasyonda API çağrısı yapılacak)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="investor-form"
      aria-labelledby="y7-title"
      className="bg-afa-deep"
      style={{ padding: '80px 0' }}
    >
      <div className="max-w-[1180px] mx-auto px-[52px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="y7-title"
            className="text-3xl font-bold mb-4"
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Ön Değerlendirme Başvurusu
          </h2>
          <p
            className="text-base"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Projeniz hakkında bilgi verin, size geri dönelim.
          </p>
        </div>

        {/* Form Container */}
        <div
          className="max-w-[740px] mx-auto rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '40px',
          }}
        >
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8 gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentStep >= 1 ? '#FFCB00' : 'rgba(255,255,255,0.25)' }}
            />
            <div
              className="h-px w-16"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentStep >= 2 ? '#FFCB00' : 'rgba(255,255,255,0.25)' }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <div>
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ color: 'rgba(255,255,255,0.90)' }}
                >
                  Adım 1: İletişim Bilgileri
                </h3>
                <div className="space-y-4">
                  {step1Fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'rgba(255,255,255,0.70)' }}
                      >
                        {field.label} {field.required && '*'}
                      </label>
                      <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-md px-4 py-3 text-sm"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.90)',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goStep2}
                  className="w-full mt-6 bg-afa-gold rounded-lg font-bold"
                  style={{
                    color: '#0F2E2C',
                    fontSize: '15px',
                    fontWeight: 700,
                    padding: '14px 32px',
                  }}
                >
                  Sonraki Adım →
                </button>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div>
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ color: 'rgba(255,255,255,0.90)' }}
                >
                  Adım 2: Proje Bilgileri
                </h3>
                <div className="space-y-4">
                  {step2Fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'rgba(255,255,255,0.70)' }}
                      >
                        {field.label} {field.required && '*'}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full rounded-md px-4 py-3 text-sm"
                          style={{
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.90)',
                          }}
                        />
                      ) : (
                        <input
                          type={field.type || 'text'}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full rounded-md px-4 py-3 text-sm"
                          style={{
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.90)',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Consent checkbox */}
                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1"
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.70)' }}
                    >
                      {consentText}
                    </span>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 rounded-lg font-semibold"
                    style={{
                      border: '1px solid rgba(255,255,255,0.25)',
                      color: 'rgba(255,255,255,0.80)',
                      padding: '14px 32px',
                      background: 'transparent',
                    }}
                  >
                    ← Geri
                  </button>
                  <button
                    type="submit"
                    disabled={!consent}
                    className="flex-1 bg-afa-gold rounded-lg font-bold disabled:opacity-50"
                    style={{
                      color: '#0F2E2C',
                      fontSize: '15px',
                      fontWeight: 700,
                      padding: '14px 32px',
                    }}
                  >
                    {submitText}
                  </button>
                </div>

                {/* Legal disclaimer */}
                <p
                  className="text-xs mt-6 leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                >
                  {legalDisclaimer}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[class*="px-"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          form > div > div {
            padding: 32px 24px !important;
          }
        }

        /* Placeholder styling */
        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.42);
        }

        /* Focus states */
        input:focus,
        textarea:focus {
          outline: none;
          border-color: #FFCB00 !important;
        }
      `}</style>
    </section>
  );
}
