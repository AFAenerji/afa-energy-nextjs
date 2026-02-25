'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FormContent, ServiceFlow } from './pageContract';

interface FinalFormSectionProps {
  locale: string;
  content: FormContent;
  flows: ServiceFlow[];
  trustSignal: string;

  /**
   * Kilit kural: Akış seçimi kullanıcıya açılmaz.
   * Akış, akış kartından otomatik gelir.
   *
   * Beklenen değer: flow.id (ör. "A" veya "akis-a" mevcut sisteminize göre)
   */
  selectedFlow?: string;
}

type FormData = {
  name: string;
  company: string;
  email: string;
  atrStatus: string;
  capacity: string;
  projectPhase: string;
  dataReady: string;
  selectedFlow: string;
};

const INITIAL: FormData = {
  name: '',
  company: '',
  email: '',
  atrStatus: '',
  capacity: '',
  projectPhase: '',
  dataReady: '',
  selectedFlow: '',
};

type SubmitError =
  | null
  | 'Zorunlu alanları kontrol ediniz.'
  | 'Başvuru gönderilemedi. Lütfen tekrar deneyiniz.'
  | 'Ağ hatası oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.';

export default function FinalFormSection({
  locale,
  content,
  flows,
  trustSignal,
  selectedFlow,
}: FinalFormSectionProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitError>(null);
  const [hp, setHp] = useState('');

  const totalSteps = 3;

  // Akış dışarıdan geldiyse forma kilitle
  useEffect(() => {
    if (selectedFlow && selectedFlow !== form.selectedFlow) {
      setForm((prev) => ({ ...prev, selectedFlow }));
      // Akış hatası varsa temizle
      if (errors.selectedFlow) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.selectedFlow;
          return next;
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlow]);

  const selectedFlowTitle = useMemo(() => {
    const v = form.selectedFlow?.trim();
    if (!v) return null;
    const found =
      flows.find((f) => String(f.id) === v) ||
      flows.find((f) => String((f as any).code) === v) ||
      flows.find((f) => String((f as any).kod) === v);
    return found ? (found as any).title || (found as any).baslik || String(found.id) : v;
  }, [flows, form.selectedFlow]);

  function set(field: keyof FormData, value: string) {
    // selectedFlow kullanıcı tarafından değiştirilemez
    if (field === 'selectedFlow') return;

    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateStep(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};

    // Kilit kural: akış seçimi kullanıcıya açılmıyor; ancak gönderimde boş kalmamalı.
    if (!form.selectedFlow.trim()) {
      errs.selectedFlow = 'Lütfen bir akış seçiniz.';
    }

    if (step === 0) {
      if (!form.name.trim()) errs.name = content.validation.required;
      if (!form.email.trim()) {
        errs.email = content.validation.required;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errs.email = content.validation.emailInvalid;
      }
    }

    if (step === 1) {
      if (!form.atrStatus) errs.atrStatus = content.validation.required;
      if (!form.capacity.trim()) errs.capacity = content.validation.required;
      if (!form.projectPhase) errs.projectPhase = content.validation.required;
    }

    if (step === 2) {
      if (!form.dataReady) errs.dataReady = content.validation.required;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep()) setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function handlePrev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep()) {
      setSubmitError('Zorunlu alanları kontrol ediniz.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          atrStatus: form.atrStatus,
          capacity: form.capacity,
          projectPhase: form.projectPhase,
          dataReady: form.dataReady,
          selectedFlow: form.selectedFlow,
          locale,
          _hp: hp,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      const data = await res.json().catch(() => ({} as any));
      const serverMsg = typeof data?.error === 'string' ? data.error : null;

      setSubmitError(serverMsg || 'Başvuru gönderilemedi. Lütfen tekrar deneyiniz.');
    } catch {
      setSubmitError('Ağ hatası oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.');
    } finally {
      setSubmitting(false);
    }
  }

  // Teşekkür ekranı
  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-[var(--afa-deep)]" aria-hidden="true" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-4">
          {content.thankYou.title}
        </h2>
        <p className="text-base text-white/70 max-w-xl mx-auto mb-8">
          {content.thankYou.message}
        </p>

        <div className="max-w-xl mx-auto text-left">
          <div className="text-sm font-bold text-white/80 mb-2">Süreç adımları</div>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-white/80 leading-relaxed">
            {content.thankYou.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <a
          href={`/${locale}/hizmetler`}
          className="inline-flex px-6 py-3 text-sm font-bold rounded-[var(--radius)] border border-white/20 text-white hover:border-[var(--afa-yellow)] hover:text-[var(--afa-yellow)] transition-colors mt-10"
        >
          {content.thankYou.backLabel}
        </a>
      </div>
    );
  }

  const progressPercent = ((step + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Akış kilidi bilgi satırı */}
      <div className="mb-6 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <div className="text-xs font-bold text-white/60 mb-1">Seçilen akış</div>
        <div className="text-sm font-bold text-white">
          {selectedFlowTitle || 'Akış seçilmedi. Lütfen üstteki akış kartlarından birini seçerek başvuruyu başlatınız.'}
        </div>
        {errors.selectedFlow && (
          <div className="mt-2 text-xs text-[var(--afa-risk)]">{errors.selectedFlow}</div>
        )}
      </div>

      {/* İlerleme */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-white/50 mb-2">
          {content.stepLabels.map((label, i) => (
            <span key={i} className={i <= step ? 'text-[var(--afa-yellow)]' : ''}>
              {label}
            </span>
          ))}
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 rounded-full bg-[var(--afa-yellow)]" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Adım içerikleri */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 md:p-8">
        {/* Adım 1 */}
        {step === 0 && (
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-white mb-2">{content.step1.title}</legend>

            {/* Honeypot */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="_hp_form">Boş bırakınız</label>
              <input
                id="_hp_form"
                type="text"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="f_name" className="block text-sm font-semibold text-white/80 mb-1.5">
                {content.step1.nameLabel} <span className="text-[var(--afa-risk)]">*</span>
              </label>
              <input
                id="f_name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder={content.step1.namePlaceholder}
                className="afa-input"
              />
              {errors.name && <p className="mt-1 text-xs text-[var(--afa-risk)]">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="f_company" className="block text-sm font-semibold text-white/80 mb-1.5">
                {content.step1.companyLabel}
              </label>
              <input
                id="f_company"
                type="text"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                placeholder={content.step1.companyPlaceholder}
                className="afa-input"
              />
            </div>

            <div>
              <label htmlFor="f_email" className="block text-sm font-semibold text-white/80 mb-1.5">
                {content.step1.emailLabel} <span className="text-[var(--afa-risk)]">*</span>
              </label>
              <input
                id="f_email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder={content.step1.emailPlaceholder}
                className="afa-input"
              />
              <p className="mt-1 text-xs text-white/40">{content.step1.emailHint}</p>
              {errors.email && <p className="mt-1 text-xs text-[var(--afa-risk)]">{errors.email}</p>}
            </div>
          </fieldset>
        )}

        {/* Adım 2 */}
        {step === 1 && (
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-white mb-2">{content.step2.title}</legend>

            <div>
              <p className="text-sm font-semibold text-white/80 mb-2">
                {content.step2.atrLabel} <span className="text-[var(--afa-risk)]">*</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {content.step2.atrOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-[6px] border cursor-pointer transition-colors text-sm ${
                      form.atrStatus === opt.value
                        ? 'border-[var(--afa-yellow)] bg-[var(--afa-yellow)]/10 text-[var(--afa-yellow)] font-bold'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="atrStatus"
                      value={opt.value}
                      checked={form.atrStatus === opt.value}
                      onChange={(e) => set('atrStatus', e.target.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {errors.atrStatus && <p className="mt-1 text-xs text-[var(--afa-risk)]">{errors.atrStatus}</p>}
            </div>

            <div>
              <label htmlFor="f_capacity" className="block text-sm font-semibold text-white/80 mb-1.5">
                {content.step2.capacityLabel} <span className="text-[var(--afa-risk)]">*</span>
              </label>
              <input
                id="f_capacity"
                type="number"
                min="0"
                step="0.1"
                value={form.capacity}
                onChange={(e) => set('capacity', e.target.value)}
                placeholder={content.step2.capacityPlaceholder}
                className="afa-input"
              />
              {errors.capacity && <p className="mt-1 text-xs text-[var(--afa-risk)]">{errors.capacity}</p>}
            </div>

            <div>
              <label htmlFor="f_projectPhase" className="block text-sm font-semibold text-white/80 mb-1.5">
                {content.step2.phaseLabel} <span className="text-[var(--afa-risk)]">*</span>
              </label>
              <select
                id="f_projectPhase"
                value={form.projectPhase}
                onChange={(e) => set('projectPhase', e.target.value)}
                className="afa-input"
              >
                <option value="" disabled>
                  —
                </option>
                {content.step2.phaseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.projectPhase && <p className="mt-1 text-xs text-[var(--afa-risk)]">{errors.projectPhase}</p>}
            </div>
          </fieldset>
        )}

        {/* Adım 3 */}
        {step === 2 && (
          <fieldset className="space-y-5">
            <legend className="text-lg font-bold text-white mb-2">{content.step3.title}</legend>

            <div>
              <p className="text-sm font-semibold text-white/80 mb-2">
                {content.step3.dataLabel} <span className="text-[var(--afa-risk)]">*</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {content.step3.dataOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-[6px] border cursor-pointer transition-colors text-sm ${
                      form.dataReady === opt.value
                        ? 'border-[var(--afa-yellow)] bg-[var(--afa-yellow)]/10 text-[var(--afa-yellow)] font-bold'
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dataReady"
                      value={opt.value}
                      checked={form.dataReady === opt.value}
                      onChange={(e) => set('dataReady', e.target.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {errors.dataReady && <p className="mt-1 text-xs text-[var(--afa-risk)]">{errors.dataReady}</p>}
            </div>
          </fieldset>
        )}

        {/* Gönderim hatası */}
        {submitError && (
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[var(--afa-risk)]">
            {submitError}
          </div>
        )}

        {/* Navigasyon */}
        <div className="mt-8 flex justify-between items-center">
          {step > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              {content.prev}
            </button>
          ) : (
            <span />
          )}

          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 text-sm font-bold rounded-[6px] bg-[var(--afa-yellow)] text-[var(--text-on-yellow)] hover:brightness-95 transition-colors"
            >
              {content.next}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 text-sm font-bold rounded-[6px] bg-[var(--afa-yellow)] text-[var(--text-on-yellow)] hover:brightness-95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? content.submitting : content.submit}
            </button>
          )}
        </div>
      </div>

      {/* Trust Signal */}
      <p className="mt-6 text-center text-xs text-white/40 max-w-xl mx-auto">{trustSignal}</p>
    </div>
  );
}