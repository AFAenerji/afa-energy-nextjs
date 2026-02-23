'use client';

import { useState } from 'react';
import SuccessState from '@/components/sections/SuccessState';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState('');

  if (submitted) {
    return <SuccessState />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      role,
      locale,
      _hp: hp,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden fields */}
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — invisible to users, traps bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact_hp">Leave empty</label>
        <input id="contact_hp" type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

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

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center bg-[#18625F] text-white font-semibold text-[15px] px-8 py-4 rounded-lg hover:bg-[#0F5654] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Gönderiliyor...' : 'Değerlendirme Talebi Gönder'}
      </button>
    </form>
  );
}
