'use client';

import { useState } from 'react';
import { getLocalizedSlug } from '@/lib/slugs';
import type { Locale } from '@/lib/i18n';
import clsx from 'clsx';

type FormData = {
  name: string;
  company: string;
  email: string;
  atrStatus: string;
  capacity: string;
  projectPhase: string;
  dataReady: string;
};

type LocaleContent = {
  stepLabels: readonly string[];
  step1: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
  };
  step2: {
    title: string;
    atrLabel: string;
    atrOptions: readonly { value: string; label: string }[];
    capacityLabel: string;
    capacityPlaceholder: string;
    phaseLabel: string;
    phaseOptions: readonly { value: string; label: string }[];
  };
  step3: {
    title: string;
    dataLabel: string;
    dataOptions: readonly { value: string; label: string }[];
  };
  next: string;
  prev: string;
  submit: string;
  submitting: string;
  thankYou: {
    title: string;
    message: string;
    steps: readonly string[];
    backLabel: string;
  };
  validation: {
    required: string;
    emailInvalid: string;
  };
};

type Props = {
  locale: string;
  content: LocaleContent;
};

const INITIAL: FormData = {
  name: '',
  company: '',
  email: '',
  atrStatus: '',
  capacity: '',
  projectPhase: '',
  dataReady: '',
};

export default function TechnicalAssessmentForm({ locale, content }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hp, setHp] = useState('');

  const totalSteps = 3;

  function set(field: keyof FormData, value: string) {
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
    if (!validateStep()) return;
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
          locale,
          _hp: hp,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || 'An unexpected error occurred. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Thank You Screen ── */
  if (submitted) {
    return (
      <div className={clsx('text-center', 'py-12')}>
        <div className={clsx('mx-auto', 'mb-6', 'flex', 'h-16', 'w-16', 'items-center', 'justify-center', 'rounded-full', 'bg-afa-deep')}>
          <svg className={clsx('h-8', 'w-8', 'text-afa-gold')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className={clsx('text-2xl', 'md:text-3xl', 'font-extrabold', 'tracking-tight', 'text-white', 'mb-4')}>
          {content.thankYou.title}
        </h2>
        <p className={clsx('text-base', 'text-white/70', 'max-w-xl', 'mx-auto', 'mb-8')}>
          {content.thankYou.message}
        </p>
        <ol className={clsx('text-left', 'max-w-md', 'mx-auto', 'space-y-3', 'mb-10')}>
          {content.thankYou.steps.map((s, i) => (
            <li key={i} className={clsx('flex', 'items-start', 'gap-3')}>
              <span className={clsx('shrink-0', 'flex', 'h-6', 'w-6', 'items-center', 'justify-center', 'rounded-full', 'bg-afa-gold', 'text-xs', 'font-bold', 'text-afa-dark')}>
                {i + 1}
              </span>
              <span className={clsx('text-sm', 'text-white/80', 'leading-relaxed')}>{s}</span>
            </li>
          ))}
        </ol>
        <a
          href={`/${locale}/${getLocalizedSlug('services', locale as Locale) ?? 'services'}`}
          className={clsx('inline-flex', 'items-center', 'px-6', 'py-3', 'text-sm', 'font-bold', 'rounded', 'border', 'border-white/20', 'text-white', 'hover:border-afa-gold', 'hover:text-afa-gold', 'transition-colors')}
        >
          {content.thankYou.backLabel}
        </a>
      </div>
    );
  }

  /* ── Progress Bar ── */
  const progressPercent = ((step + 1) / totalSteps) * 100;

  return (
    <div className={clsx('w-full', 'max-w-2xl', 'mx-auto')}>
      {/* Progress */}
      <div className="mb-8">
        <div className={clsx('flex', 'justify-between', 'text-xs', 'font-bold', 'text-white/50', 'mb-2')}>
          {content.stepLabels.map((label, i) => (
            <span key={i} className={i <= step ? 'text-afa-gold' : ''}>
              {label}
            </span>
          ))}
        </div>
        <div className={clsx('h-1.5', 'w-full', 'rounded-full', 'bg-white/10')}>
          <div
            className={clsx('h-1.5', 'rounded-full', 'bg-afa-gold', 'transition-[width]', 'duration-300', 'ease-linear')}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className={clsx('rounded-lg', 'border', 'border-white/10', 'bg-white/3', 'p-6', 'md:p-8')}>
        {/* Step 1: Project Identity */}
        {step === 0 && (
          <fieldset className="space-y-5">
            <legend className={clsx('text-lg', 'font-bold', 'text-white', 'mb-2')}>{content.step1.title}</legend>

            {/* Honeypot */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="_hp">Leave empty</label>
              <input id="_hp" type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className={clsx('block', 'text-sm', 'font-semibold', 'text-white/80', 'mb-1.5')}>
                {content.step1.nameLabel} <span className="text-afa-warning">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder={content.step1.namePlaceholder}
                className="afa-input"
              />
              {errors.name && <p className={clsx('mt-1', 'text-xs', 'text-afa-warning')}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="company" className={clsx('block', 'text-sm', 'font-semibold', 'text-white/80', 'mb-1.5')}>
                {content.step1.companyLabel}
              </label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                placeholder={content.step1.companyPlaceholder}
                className="afa-input"
              />
            </div>

            <div>
              <label htmlFor="email" className={clsx('block', 'text-sm', 'font-semibold', 'text-white/80', 'mb-1.5')}>
                {content.step1.emailLabel} <span className="text-afa-warning">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder={content.step1.emailPlaceholder}
                className="afa-input"
              />
              <p className={clsx('mt-1', 'text-xs', 'text-white/40')}>{content.step1.emailHint}</p>
              {errors.email && <p className={clsx('mt-1', 'text-xs', 'text-afa-warning')}>{errors.email}</p>}
            </div>
          </fieldset>
        )}

        {/* Step 2: Technical Filter */}
        {step === 1 && (
          <fieldset className="space-y-5">
            <legend className={clsx('text-lg', 'font-bold', 'text-white', 'mb-2')}>{content.step2.title}</legend>

            <div>
              <p className={clsx('text-sm', 'font-semibold', 'text-white/80', 'mb-2')}>
                {content.step2.atrLabel} <span className="text-afa-warning">*</span>
              </p>
              <div className={clsx('flex', 'flex-wrap', 'gap-3')}>
                {content.step2.atrOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer transition-colors text-sm ${
                      form.atrStatus === opt.value
                        ? 'border-afa-gold bg-afa-gold/10 text-afa-gold font-bold'
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
              {errors.atrStatus && <p className={clsx('mt-1', 'text-xs', 'text-afa-warning')}>{errors.atrStatus}</p>}
            </div>

            <div>
              <label htmlFor="capacity" className={clsx('block', 'text-sm', 'font-semibold', 'text-white/80', 'mb-1.5')}>
                {content.step2.capacityLabel} <span className="text-afa-warning">*</span>
              </label>
              <input
                id="capacity"
                type="number"
                min="0"
                step="0.1"
                value={form.capacity}
                onChange={(e) => set('capacity', e.target.value)}
                placeholder={content.step2.capacityPlaceholder}
                className="afa-input"
              />
              {errors.capacity && <p className={clsx('mt-1', 'text-xs', 'text-afa-warning')}>{errors.capacity}</p>}
            </div>

            <div>
              <label htmlFor="projectPhase" className={clsx('block', 'text-sm', 'font-semibold', 'text-white/80', 'mb-1.5')}>
                {content.step2.phaseLabel} <span className="text-afa-warning">*</span>
              </label>
              <select
                id="projectPhase"
                value={form.projectPhase}
                onChange={(e) => set('projectPhase', e.target.value)}
                className="afa-input"
              >
                <option value="" disabled>—</option>
                {content.step2.phaseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.projectPhase && <p className={clsx('mt-1', 'text-xs', 'text-afa-warning')}>{errors.projectPhase}</p>}
            </div>
          </fieldset>
        )}

        {/* Step 3: Data Availability */}
        {step === 2 && (
          <fieldset className="space-y-5">
            <legend className={clsx('text-lg', 'font-bold', 'text-white', 'mb-2')}>{content.step3.title}</legend>

            <div>
              <p className={clsx('text-sm', 'font-semibold', 'text-white/80', 'mb-2')}>
                {content.step3.dataLabel} <span className="text-afa-warning">*</span>
              </p>
              <div className={clsx('flex', 'flex-wrap', 'gap-3')}>
                {content.step3.dataOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded border cursor-pointer transition-colors text-sm ${
                      form.dataReady === opt.value
                        ? 'border-afa-gold bg-afa-gold/10 text-afa-gold font-bold'
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
              {errors.dataReady && <p className={clsx('mt-1', 'text-xs', 'text-afa-warning')}>{errors.dataReady}</p>}
            </div>
          </fieldset>
        )}

        {/* Submission Error */}
        {submitError && (
          <div className={clsx('mt-4', 'rounded-lg', 'border', 'border-red-400/30', 'bg-red-500/10', 'px-4', 'py-3', 'text-sm', 'text-red-300')}>
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={clsx('mt-8', 'flex', 'justify-between', 'items-center')}>
          {step > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className={clsx('text-sm', 'font-semibold', 'text-white/60', 'hover:text-white', 'transition-colors')}
            >
              ← {content.prev}
            </button>
          ) : (
            <span />
          )}

          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className={clsx('px-6', 'py-2.5', 'text-sm', 'font-bold', 'rounded', 'bg-afa-gold', 'text-afa-dark', 'hover:bg-afa-deep', 'hover:text-white', 'transition-colors', 'duration-120', 'ease-out')}
            >
              {content.next} →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className={clsx('px-6', 'py-2.5', 'text-sm', 'font-bold', 'rounded', 'bg-afa-gold', 'text-afa-dark', 'hover:bg-afa-deep', 'hover:text-white', 'transition-colors', 'duration-120', 'ease-out', 'disabled:opacity-50', 'disabled:cursor-not-allowed')}
            >
              {submitting ? content.submitting : content.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
