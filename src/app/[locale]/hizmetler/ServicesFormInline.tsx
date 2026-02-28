"use client";

import { useState } from "react";
import styles from "./ServicesPage.module.css";

interface FormContent {
  readonly title: string;
  readonly subtitle: string;
  readonly namePlaceholder: string;
  readonly emailPlaceholder: string;
  readonly companyPlaceholder: string;
  readonly atrLabel: string;
  readonly atrOptions: readonly { readonly value: string; readonly label: string }[];
  readonly capacityPlaceholder: string;
  readonly phasesLabel: string;
  readonly phaseOptions: readonly { readonly value: string; readonly label: string }[];
  readonly dataLabel: string;
  readonly dataOptions: readonly { readonly value: string; readonly label: string }[];
  readonly notesPlaceholder: string;
  readonly submitLabel: string;
  readonly footnote: string;
  readonly successTitle: string;
  readonly successText: string;
}

interface Props {
  locale: string;
  content: FormContent;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  atrStatus: string;
  capacity: string;
  projectPhase: string;
  dataReady: string;
  notes: string;
  _hp: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  atrStatus: "",
  capacity: "",
  projectPhase: "",
  dataReady: "",
  notes: "",
  _hp: "",
};

export default function ServicesFormInline({ locale, content }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError(
        locale === "tr"
          ? "Ad ve e-posta alanları zorunludur."
          : locale === "en"
          ? "Name and email are required."
          : "Numele și e-mailul sunt obligatorii."
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          atrStatus: form.atrStatus || "none",
          capacity: form.capacity || "—",
          projectPhase: form.projectPhase || "land-development",
          dataReady: form.dataReady || "no",
          notes: form.notes,
          locale,
          _hp: form._hp,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Sunucu hatası");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : locale === "tr"
          ? "Bir hata oluştu. Lütfen tekrar deneyin."
          : "An error occurred. Please try again."
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
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        {/* Name */}
        <div>
          <label className={styles.formLabel}>
            {locale === "tr" ? "Ad Soyad" : locale === "en" ? "Full Name" : "Nume Complet"} *
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder={content.namePlaceholder}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className={styles.formLabel}>
            {locale === "tr" ? "E-posta" : "E-mail"} *
          </label>
          <input
            type="email"
            className={styles.formInput}
            placeholder={content.emailPlaceholder}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className={styles.formLabel}>
            {locale === "tr" ? "Kurum / Şirket" : locale === "en" ? "Company" : "Companie"}
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder={content.companyPlaceholder}
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>

        {/* Capacity */}
        <div>
          <label className={styles.formLabel}>
            {locale === "tr" ? "Kurulu Güç (MW)" : locale === "en" ? "Capacity (MW)" : "Capacitate (MW)"}
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder={content.capacityPlaceholder}
            value={form.capacity}
            onChange={(e) => set("capacity", e.target.value)}
          />
        </div>

        {/* ATR Status */}
        <div>
          <label htmlFor="form-atr" className={styles.formLabel}>{content.atrLabel}</label>
          <select
            id="form-atr"
            className={styles.formSelect}
            value={form.atrStatus}
            onChange={(e) => set("atrStatus", e.target.value)}
          >
            <option value="">—</option>
            {content.atrOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Project Phase */}
        <div>
          <label htmlFor="form-phase" className={styles.formLabel}>{content.phasesLabel}</label>
          <select
            id="form-phase"
            className={styles.formSelect}
            value={form.projectPhase}
            onChange={(e) => set("projectPhase", e.target.value)}
          >
            <option value="">—</option>
            {content.phaseOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Data Ready */}
        <div className={styles.formFieldFull}>
          <label htmlFor="form-data" className={styles.formLabel}>{content.dataLabel}</label>
          <select
            id="form-data"
            className={styles.formSelect}
            value={form.dataReady}
            onChange={(e) => set("dataReady", e.target.value)}
          >
            <option value="">—</option>
            {content.dataOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div className={styles.formFieldFull}>
          <label className={styles.formLabel}>
            {locale === "tr" ? "Ek Not (İsteğe Bağlı)" : locale === "en" ? "Additional Notes (Optional)" : "Note Suplimentare (Opțional)"}
          </label>
          <textarea
            className={styles.formTextarea}
            placeholder={content.notesPlaceholder}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>

        {/* Honeypot */}
        <div className={styles.formHoneypot} aria-hidden="true">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form._hp}
            onChange={(e) => set("_hp", e.target.value)}
          />
        </div>

        {/* Submit */}
        <div className={styles.formFieldFull}>
          <button type="submit" className={styles.formSubmit} disabled={submitting}>
            {submitting
              ? locale === "tr"
                ? "Gönderiliyor..."
                : "Submitting..."
              : content.submitLabel}
          </button>
          {error && <p className={styles.formError}>{error}</p>}
          <p className={styles.formNote}>{content.footnote}</p>
        </div>
      </div>
    </form>
  );
}
