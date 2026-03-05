'use client';

import { useState, useEffect } from 'react';
import type { InvestorDictionary } from '@/lib/getInvestorDictionary';

interface InvestorPageClientProps {
  initialLocale: string;
  initialMessages: InvestorDictionary;
}

const COLORS = {
  primaryDark: '#18625F',
  primary: '#28AFB0',
  gold: '#FFCB00',
  deep: '#0F2E2C',
  light: '#F5F5F5',
  ice: '#F8FAFB',
  white: '#FFFFFF',
  gray600: '#4A5568',
  gray400: '#999999',
};

export default function InvestorPageClient({
  initialLocale,
  initialMessages,
}: InvestorPageClientProps) {
  const [language, setLanguage] = useState<'tr' | 'en'>(
    (initialLocale === 'en' ? 'en' : 'tr') as 'tr' | 'en'
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [messagesMap, setMessagesMap] = useState<{
    tr: InvestorDictionary | null;
    en: InvestorDictionary | null;
  }>({
    tr: initialLocale === 'tr' ? initialMessages : null,
    en: initialLocale === 'en' ? initialMessages : null,
  });

  const messages = messagesMap[language] || initialMessages;

  useEffect(() => {
    const saved = localStorage.getItem('afa_investor_lang');
    if (saved === 'tr' || saved === 'en') {
      setLanguage(saved);
    }
  }, []);

  const handleLanguageChange = async (newLang: 'tr' | 'en') => {
    if (newLang === language) return;

    setLanguage(newLang);
    localStorage.setItem('afa_investor_lang', newLang);

    if (!messagesMap[newLang]) {
      const loaded =
        newLang === 'en'
          ? await import('@/content/en/investor.json')
          : await import('@/content/tr/investor.json');
      setMessagesMap((prev) => ({ ...prev, [newLang]: loaded.default || loaded }));
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-20 px-6"
        style={{ backgroundColor: COLORS.ice }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: COLORS.deep, whiteSpace: 'pre-line' }}
          >
            {messages.heroHeading}
          </h1>
          <p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
            style={{ color: COLORS.gray600 }}
          >
            {messages.heroSubheading}
          </p>
          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {messages.trustSignals.map((signal, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: COLORS.primary }}
                >
                  {signal.value}
                </div>
                <div className="text-sm" style={{ color: COLORS.gray600 }}>
                  {signal.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            style={{ color: COLORS.primaryDark }}
          >
            {messages.approachTitle}
          </h2>
          <p
            className="text-lg mb-6 text-center max-w-3xl mx-auto"
            style={{ color: COLORS.gray600 }}
          >
            {messages.approachIntro}
          </p>
          <p
            className="text-lg text-center max-w-3xl mx-auto"
            style={{ color: COLORS.gray600 }}
          >
            {messages.approachClosing}
          </p>
        </div>
      </section>

      {/* Asset Intake Section */}
      <section className="py-16 px-6" style={{ backgroundColor: COLORS.light }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            style={{ color: COLORS.primaryDark }}
          >
            {messages.assetIntakeTitle}
          </h2>
          <p
            className="text-lg mb-12 text-center"
            style={{ color: COLORS.gray600 }}
          >
            {messages.assetIntakeIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Operational Card */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4" style={{ borderTopColor: COLORS.primary }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryDark }}>
                {messages.operationalCard.heading}
              </h3>
              <p className="text-base mb-6" style={{ color: COLORS.gray600 }}>
                {messages.operationalCard.description}
              </p>
              <div className="mb-6 inline-block px-4 py-2 rounded-md" style={{ backgroundColor: COLORS.ice, color: COLORS.primary }}>
                <span className="font-semibold">{messages.operationalCard.timeline}</span>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  className="w-full py-3 rounded-md font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: COLORS.primary }}
                  onClick={(e) => e.preventDefault()}
                >
                  {messages.operationalCard.primaryCTA}
                </button>
                <button
                  className="w-full py-3 rounded-md font-semibold transition-colors"
                  style={{ color: COLORS.primary, border: `2px solid ${COLORS.primary}` }}
                  onClick={(e) => e.preventDefault()}
                >
                  {messages.operationalCard.secondaryLink}
                </button>
              </div>
            </div>

            {/* RTB Card */}
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 relative" style={{ borderTopColor: COLORS.gold }}>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: COLORS.gold, color: COLORS.deep }}>
                {messages.rtbCard.badge}
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryDark }}>
                {messages.rtbCard.heading}
              </h3>
              <p className="text-base mb-6" style={{ color: COLORS.gray600 }}>
                {messages.rtbCard.description}
              </p>
              <div className="mb-6 inline-block px-4 py-2 rounded-md" style={{ backgroundColor: COLORS.ice, color: COLORS.gold }}>
                <span className="font-semibold">{messages.rtbCard.timeline}</span>
              </div>
              <div className="mb-4 p-4 rounded-md" style={{ backgroundColor: COLORS.ice }}>
                <div className="text-sm font-semibold mb-1" style={{ color: COLORS.primaryDark }}>
                  {messages.rtbCard.comingSoon}
                </div>
                <div className="text-xs" style={{ color: COLORS.gray600 }}>
                  {messages.rtbCard.comingSoonNote}
                </div>
              </div>
              <div className="flex flex-col gap-3 opacity-50">
                <button
                  className="w-full py-3 rounded-md font-semibold text-white"
                  style={{ backgroundColor: COLORS.gold, color: COLORS.deep }}
                  disabled
                >
                  {messages.rtbCard.primaryCTA}
                </button>
                <button
                  className="w-full py-3 rounded-md font-semibold"
                  style={{ color: COLORS.gold, border: `2px solid ${COLORS.gold}` }}
                  disabled
                >
                  {messages.rtbCard.secondaryLink}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Management Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            style={{ color: COLORS.primaryDark }}
          >
            {messages.portfolioTitle}
          </h2>
          <p
            className="text-lg mb-12 text-center"
            style={{ color: COLORS.gray600 }}
          >
            {messages.portfolioSubheading}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {messages.portfolioFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg"
                style={{ backgroundColor: COLORS.ice }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.primaryDark }}>
                  {feature.title}
                </h3>
                <p className="text-base" style={{ color: COLORS.gray600 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="px-8 py-4 rounded-md font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
              onClick={(e) => e.preventDefault()}
            >
              {messages.portfolioCTA}
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-6" style={{ backgroundColor: COLORS.light }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: COLORS.primaryDark }}
          >
            {messages.trustTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {messages.trustPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.primaryDark }}>
                  {point.title}
                </h3>
                <p className="text-base" style={{ color: COLORS.gray600 }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: COLORS.primaryDark }}
          >
            {messages.faqTitle}
          </h2>

          <div className="space-y-4">
            {messages.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border rounded-lg"
                style={{ borderColor: COLORS.gray400 }}
              >
                <button
                  id={`faq-button-${idx}`}
                  aria-expanded={expandedFaq === idx ? 'true' : 'false'}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center transition-colors hover:bg-gray-50"
                >
                  <span className="font-semibold text-lg" style={{ color: COLORS.primaryDark }}>
                    {faq.question}
                  </span>
                  <span
                    className="text-2xl transition-transform"
                    style={{
                      transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: COLORS.primary,
                    }}
                  >
                    ↓
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-button-${idx}`}
                    className="px-6 py-4 border-t"
                    style={{ borderColor: COLORS.gray400, color: COLORS.gray600 }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-16 px-6" style={{ backgroundColor: COLORS.ice }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{ color: COLORS.primaryDark }}
          >
            {messages.nextStepsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {messages.ctaCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4" style={{ color: COLORS.primaryDark }}>
                  {card.title}
                </h3>
                <p className="text-base mb-6" style={{ color: COLORS.gray600 }}>
                  {card.description}
                </p>
                <button
                  className="w-full py-3 rounded-md font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: COLORS.primary }}
                  onClick={(e) => e.preventDefault()}
                >
                  {card.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 px-6" style={{ backgroundColor: COLORS.deep, color: COLORS.white }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xl font-semibold mb-6" style={{ color: COLORS.gold }}>
            {messages.motto}
          </p>
          <p className="text-base mb-8">
            {messages.closingText}
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
            <a
              href={`mailto:${messages.contactEmail}`}
              className="hover:underline"
              style={{ color: COLORS.primary }}
            >
              {messages.contactEmail}
            </a>
            <span className="hidden md:inline" style={{ color: COLORS.gray400 }}>|</span>
            <span>{messages.contactPhone}</span>
          </div>
          <div className="text-sm" style={{ color: COLORS.gray400 }}>
            {messages.footerLine}
          </div>
        </div>
      </footer>
    </div>
  );
}
