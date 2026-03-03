'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './ContactPage.module.css';

interface FormContent {
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly nameHint: string;
  readonly companyLabel: string;
  readonly companyPlaceholder: string;
  readonly companyHint: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly emailHint: string;
  readonly topicLabel: string;
  readonly topicDefault: string;
  readonly topicOptions: readonly { readonly value: string; readonly label: string }[];
  readonly messageLabel: string;
  readonly messagePlaceholder: string;
  readonly messageHint: string;
  readonly disclaimer: string;
  readonly submitLabel: string;
  readonly successTitle: string;
  readonly successText: string;
}

interface Props {
  locale: Locale;
  content: FormContent;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  topic: string;
  message: string;
  _hp: string;
}

const INITIAL: FormState = {
  name: '',
  company: '',
  email: '',
  topic: '',
  message: '',
  _hp: '',
};

export default function ContactFormInline({ locale, content }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: false }));
    }
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, boolean>> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.company.trim()) errs.company = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          role: form.topic || 'default',
          locale,
          _hp: form._hp,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || 'Sunucu hatası');
      }

      if (data?.referenceCode) {
        setReferenceCode(data.referenceCode);
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : locale === 'tr'
          ? 'Bir hata oluştu. Lütfen tekrar deneyin.'
          : 'An error occurred. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.formSuccess}>
        <h3 className={styles.formSuccessTitle}>{content.successTitle}</h3>
        <p className={styles.formSuccessText}>{content.successText}</p>
        {referenceCode && (
          <p className={styles.formReferenceCode}>
            {locale === 'tr' ? 'Referans Kodu' : locale === 'en' ? 'Reference Code' : 'Cod de Referință'}: {referenceCode}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={styles.formLabel}>
            {content.nameLabel} <span className={styles.formRequired}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder={content.namePlaceholder}
            className={`${styles.formInput} ${fieldErrors.name ? styles.formInputError : ''}`}
          />
          <p className={styles.formHint}>{content.nameHint}</p>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="contact-company" className={styles.formLabel}>
            {content.companyLabel} <span className={styles.formRequired}>*</span>
          </label>
          <input
            id="contact-company"
            type="text"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            placeholder={content.companyPlaceholder}
            className={`${styles.formInput} ${fieldErrors.company ? styles.formInputError : ''}`}
          />
          <p className={styles.formHint}>{content.companyHint}</p>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={styles.formLabel}>
            {content.emailLabel} <span className={styles.formRequired}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder={content.emailPlaceholder}
            className={`${styles.formInput} ${fieldErrors.email ? styles.formInputError : ''}`}
          />
          <p className={styles.formHint}>{content.emailHint}</p>
        </div>

        {/* Topic */}
        <div>
          <label htmlFor="contact-topic" className={styles.formLabel}>
            {content.topicLabel}
          </label>
          <select
            id="contact-topic"
            value={form.topic}
            onChange={(e) => set('topic', e.target.value)}
            className={styles.formSelect}
          >
            <option value="">{content.topicDefault}</option>
            {content.topicOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className={styles.formLabel}>
            {content.messageLabel} <span className={styles.formRequired}>*</span>
          </label>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder={content.messagePlaceholder}
            className={`${styles.formTextarea} ${fieldErrors.message ? styles.formInputError : ''}`}
          />
          <p className={styles.formHint}>{content.messageHint}</p>
        </div>

        {/* Honeypot */}
        <div className={styles.formHoneypot} aria-hidden="true">
          <label htmlFor="contact-hp">Do not fill</label>
          <input
            id="contact-hp"
            type="text"
            value={form._hp}
            onChange={(e) => set('_hp', e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Disclaimer */}
        <p className={styles.formDisclaimer}>{content.disclaimer}</p>

        {/* Submit */}
        <button type="submit" disabled={submitting} className={styles.formSubmit}>
          {submitting
            ? (locale === 'tr' ? 'Gönderiliyor...' : locale === 'en' ? 'Sending...' : 'Se trimite...')
            : content.submitLabel}
        </button>

        {error && <p className={styles.formError}>{error}</p>}
      </div>
    </form>
  );
}
