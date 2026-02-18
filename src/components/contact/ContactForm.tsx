'use client';

import { useState } from 'react';

interface ContactFormProps {
  role: 'investor' | 'developer' | 'default';
  placeholder: string;
  locale: string;
}

const roleLabels: Record<string, string> = {
  investor: 'Yatırımcı',
  developer: 'Geliştirici',
  default: 'Genel',
};

export default function ContactForm({ role, placeholder, locale }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#18625F]/20 bg-[#18625F]/5 p-8 text-center">
        <svg aria-hidden="true" className="w-12 h-12 text-[#18625F] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-[#0B1F1E] mb-2">Talebiniz Alındı</h3>
        <p className="text-sm text-[#5A5A5A] leading-relaxed">
          Ekibimiz en kısa sürede sizinle iletişime geçecektir.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-6"
    >
      {/* Hidden role field */}
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="locale" value={locale} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#0B1F1E] mb-2">
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0B1F1E] placeholder:text-gray-400 focus:border-[#18625F] focus:ring-2 focus:ring-[#18625F]/20 focus:outline-none transition-colors"
            placeholder="Adınız Soyadınız"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#0B1F1E] mb-2">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0B1F1E] placeholder:text-gray-400 focus:border-[#18625F] focus:ring-2 focus:ring-[#18625F]/20 focus:outline-none transition-colors"
            placeholder="ornek@sirket.com"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-[#0B1F1E] mb-2">
          Kurum / Şirket
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0B1F1E] placeholder:text-gray-400 focus:border-[#18625F] focus:ring-2 focus:ring-[#18625F]/20 focus:outline-none transition-colors"
          placeholder="Şirket adı"
        />
      </div>

      {/* Role indicator */}
      <div className="flex items-center gap-2 text-xs text-[#5A5A5A]">
        <span className="w-2 h-2 rounded-full bg-[#FFCB00]" />
        Profil: <span className="font-semibold text-[#0B1F1E]">{roleLabels[role]}</span>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#0B1F1E] mb-2">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-[#0B1F1E] placeholder:text-gray-400 focus:border-[#18625F] focus:ring-2 focus:ring-[#18625F]/20 focus:outline-none transition-colors resize-none"
          placeholder={placeholder}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center bg-[#18625F] text-white font-semibold text-[15px] px-8 py-4 rounded-lg hover:bg-[#0F5654] transition-colors"
      >
        Değerlendirme Talebi Gönder
      </button>
    </form>
  );
}
