'use client';

import { useState, useEffect, useRef, useId, useCallback } from 'react';
import styles from './GelistiriciForm.module.css';

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface FormContent {
  cta: { kicker: string; heading: string; subtitle: string; button: string };
  back: string;
  tab1Label: string;
  tab2Label: string;
  phoneSearch: string;
  phoneQuickPicks: string;
  phoneAllCountries: string;
  tab1Submit: string;
  tab2Submit: string;
  privacy: string;
  selectPlaceholder: string;
  success: { title: string; message: string; reset: string };
  errors: { required: string; email: string; checkbox: string };
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  assessmentTypeOptions: string[];
  technologyOptionsTab1: string[];
  targetCapacityOptions: string[];
  projectStageOptions: string[];
  applicationPurposeOptions: string[];
  technologyOptionsTab2: string[];
  installedCapacityOptions: string[];
  codYearOptions: string[];
  scadaOptions: string[];
  performanceOptions: string[];
  revenueModelOptions: string[];
  ppaMaturityOptions: string[];
  priceStructureOptions: string[];
  actionTimelineOptions: string[];
}

interface GelistiriciFormProps {
  content: FormContent;
  locale: string;
}

interface Country {
  flag: string;
  name: string;
  code: string;
}

/* ================================================================== */
/*  Country data — ISO 3166 full list                                  */
/* ================================================================== */

const QUICK_PICKS: Country[] = [
  { flag: '\u{1F1F7}\u{1F1F4}', name: 'Romanya', code: '+40' },
  { flag: '\u{1F1F9}\u{1F1F7}', name: 'T\u00FCrkiye', code: '+90' },
];

const COUNTRIES: Country[] = [
  { flag: '🇺🇸', name: 'ABD', code: '+1' },
  { flag: '🇦🇫', name: 'Afganistan', code: '+93' },
  { flag: '🇩🇪', name: 'Almanya', code: '+49' },
  { flag: '🇦🇩', name: 'Andorra', code: '+376' },
  { flag: '🇦🇴', name: 'Angola', code: '+244' },
  { flag: '🇦🇬', name: 'Antigua ve Barbuda', code: '+1-268' },
  { flag: '🇦🇷', name: 'Arjantin', code: '+54' },
  { flag: '🇦🇱', name: 'Arnavutluk', code: '+355' },
  { flag: '🇦🇺', name: 'Avustralya', code: '+61' },
  { flag: '🇦🇹', name: 'Avusturya', code: '+43' },
  { flag: '🇦🇿', name: 'Azerbaycan', code: '+994' },
  { flag: '🇧🇸', name: 'Bahamalar', code: '+1-242' },
  { flag: '🇧🇭', name: 'Bahreyn', code: '+973' },
  { flag: '🇧🇩', name: 'Bangladeş', code: '+880' },
  { flag: '🇧🇧', name: 'Barbados', code: '+1-246' },
  { flag: '🇧🇾', name: 'Belarus', code: '+375' },
  { flag: '🇧🇪', name: 'Belçika', code: '+32' },
  { flag: '🇧🇿', name: 'Belize', code: '+501' },
  { flag: '🇧🇯', name: 'Benin', code: '+229' },
  { flag: '🇧🇹', name: 'Bhutan', code: '+975' },
  { flag: '🇦🇪', name: 'Birleşik Arap Emirlikleri', code: '+971' },
  { flag: '🇧🇴', name: 'Bolivya', code: '+591' },
  { flag: '🇧🇦', name: 'Bosna-Hersek', code: '+387' },
  { flag: '🇧🇼', name: 'Botsvana', code: '+267' },
  { flag: '🇧🇷', name: 'Brezilya', code: '+55' },
  { flag: '🇧🇳', name: 'Brunei', code: '+673' },
  { flag: '🇧🇬', name: 'Bulgaristan', code: '+359' },
  { flag: '🇧🇫', name: 'Burkina Faso', code: '+226' },
  { flag: '🇧🇮', name: 'Burundi', code: '+257' },
  { flag: '🇨🇻', name: 'Cabo Verde', code: '+238' },
  { flag: '🇩🇿', name: 'Cezayir', code: '+213' },
  { flag: '🇩🇯', name: 'Cibuti', code: '+253' },
  { flag: '🇹🇩', name: 'Çad', code: '+235' },
  { flag: '🇨🇿', name: 'Çekya', code: '+420' },
  { flag: '🇨🇳', name: 'Çin', code: '+86' },
  { flag: '🇩🇰', name: 'Danimarka', code: '+45' },
  { flag: '🇹🇱', name: 'Doğu Timor', code: '+670' },
  { flag: '🇩🇲', name: 'Dominika', code: '+1-767' },
  { flag: '🇩🇴', name: 'Dominik Cumhuriyeti', code: '+1-809' },
  { flag: '🇪🇨', name: 'Ekvador', code: '+593' },
  { flag: '🇬🇶', name: 'Ekvator Ginesi', code: '+240' },
  { flag: '🇸🇻', name: 'El Salvador', code: '+503' },
  { flag: '🇮🇩', name: 'Endonezya', code: '+62' },
  { flag: '🇪🇷', name: 'Eritre', code: '+291' },
  { flag: '🇦🇲', name: 'Ermenistan', code: '+374' },
  { flag: '🇪🇪', name: 'Estonya', code: '+372' },
  { flag: '🇸🇿', name: 'Esvatini', code: '+268' },
  { flag: '🇪🇹', name: 'Etiyopya', code: '+251' },
  { flag: '🇲🇦', name: 'Fas', code: '+212' },
  { flag: '🇫🇯', name: 'Fiji', code: '+679' },
  { flag: '🇵🇭', name: 'Filipinler', code: '+63' },
  { flag: '🇫🇮', name: 'Finlandiya', code: '+358' },
  { flag: '🇵🇸', name: 'Filistin', code: '+970' },
  { flag: '🇫🇷', name: 'Fransa', code: '+33' },
  { flag: '🇬🇦', name: 'Gabon', code: '+241' },
  { flag: '🇬🇲', name: 'Gambiya', code: '+220' },
  { flag: '🇬🇭', name: 'Gana', code: '+233' },
  { flag: '🇬🇳', name: 'Gine', code: '+224' },
  { flag: '🇬🇼', name: 'Gine-Bissau', code: '+245' },
  { flag: '🇬🇩', name: 'Grenada', code: '+1-473' },
  { flag: '🇬🇹', name: 'Guatemala', code: '+502' },
  { flag: '🇿🇦', name: 'Güney Afrika', code: '+27' },
  { flag: '🇰🇷', name: 'Güney Kore', code: '+82' },
  { flag: '🇸🇸', name: 'Güney Sudan', code: '+211' },
  { flag: '🇬🇪', name: 'Gürcistan', code: '+995' },
  { flag: '🇬🇾', name: 'Guyana', code: '+592' },
  { flag: '🇭🇹', name: 'Haiti', code: '+509' },
  { flag: '🇮🇳', name: 'Hindistan', code: '+91' },
  { flag: '🇭🇷', name: 'Hırvatistan', code: '+385' },
  { flag: '🇳🇱', name: 'Hollanda', code: '+31' },
  { flag: '🇭🇳', name: 'Honduras', code: '+504' },
  { flag: '🇮🇶', name: 'Irak', code: '+964' },
  { flag: '🇬🇧', name: 'İngiltere', code: '+44' },
  { flag: '🇮🇷', name: 'İran', code: '+98' },
  { flag: '🇮🇪', name: 'İrlanda', code: '+353' },
  { flag: '🇪🇸', name: 'İspanya', code: '+34' },
  { flag: '🇮🇱', name: 'İsrail', code: '+972' },
  { flag: '🇸🇪', name: 'İsveç', code: '+46' },
  { flag: '🇨🇭', name: 'İsviçre', code: '+41' },
  { flag: '🇮🇹', name: 'İtalya', code: '+39' },
  { flag: '🇮🇸', name: 'İzlanda', code: '+354' },
  { flag: '🇯🇲', name: 'Jamaika', code: '+1-876' },
  { flag: '🇯🇵', name: 'Japonya', code: '+81' },
  { flag: '🇰🇭', name: 'Kamboçya', code: '+855' },
  { flag: '🇨🇲', name: 'Kamerun', code: '+237' },
  { flag: '🇨🇦', name: 'Kanada', code: '+1' },
  { flag: '🇲🇪', name: 'Karadağ', code: '+382' },
  { flag: '🇶🇦', name: 'Katar', code: '+974' },
  { flag: '🇰🇿', name: 'Kazakistan', code: '+7' },
  { flag: '🇰🇪', name: 'Kenya', code: '+254' },
  { flag: '🇨🇾', name: 'Kıbrıs', code: '+357' },
  { flag: '🇰🇬', name: 'Kırgızistan', code: '+996' },
  { flag: '🇰🇮', name: 'Kiribati', code: '+686' },
  { flag: '🇨🇴', name: 'Kolombiya', code: '+57' },
  { flag: '🇰🇲', name: 'Komorlar', code: '+269' },
  { flag: '🇨🇬', name: 'Kongo', code: '+242' },
  { flag: '🇨🇩', name: 'Kongo (DRC)', code: '+243' },
  { flag: '🇽🇰', name: 'Kosova', code: '+383' },
  { flag: '🇨🇷', name: 'Kosta Rika', code: '+506' },
  { flag: '🇰🇼', name: 'Kuveyt', code: '+965' },
  { flag: '🇰🇵', name: 'Kuzey Kore', code: '+850' },
  { flag: '🇲🇰', name: 'Kuzey Makedonya', code: '+389' },
  { flag: '🇨🇺', name: 'Küba', code: '+53' },
  { flag: '🇱🇦', name: 'Laos', code: '+856' },
  { flag: '🇱🇸', name: 'Lesoto', code: '+266' },
  { flag: '🇱🇻', name: 'Letonya', code: '+371' },
  { flag: '🇱🇷', name: 'Liberya', code: '+231' },
  { flag: '🇱🇾', name: 'Libya', code: '+218' },
  { flag: '🇱🇮', name: 'Lihtenştayn', code: '+423' },
  { flag: '🇱🇹', name: 'Litvanya', code: '+370' },
  { flag: '🇱🇧', name: 'Lübnan', code: '+961' },
  { flag: '🇱🇺', name: 'Lüksemburg', code: '+352' },
  { flag: '🇭🇺', name: 'Macaristan', code: '+36' },
  { flag: '🇲🇬', name: 'Madagaskar', code: '+261' },
  { flag: '🇲🇼', name: 'Malavi', code: '+265' },
  { flag: '🇲🇻', name: 'Maldivler', code: '+960' },
  { flag: '🇲🇾', name: 'Malezya', code: '+60' },
  { flag: '🇲🇱', name: 'Mali', code: '+223' },
  { flag: '🇲🇹', name: 'Malta', code: '+356' },
  { flag: '🇲🇭', name: 'Marshall Adaları', code: '+692' },
  { flag: '🇲🇺', name: 'Mauritius', code: '+230' },
  { flag: '🇲🇽', name: 'Meksika', code: '+52' },
  { flag: '🇫🇲', name: 'Mikronezya', code: '+691' },
  { flag: '🇪🇬', name: 'Mısır', code: '+20' },
  { flag: '🇲🇩', name: 'Moldova', code: '+373' },
  { flag: '🇲🇳', name: 'Moğolistan', code: '+976' },
  { flag: '🇲🇨', name: 'Monako', code: '+377' },
  { flag: '🇲🇷', name: 'Moritanya', code: '+222' },
  { flag: '🇲🇿', name: 'Mozambik', code: '+258' },
  { flag: '🇲🇲', name: 'Myanmar', code: '+95' },
  { flag: '🇳🇦', name: 'Namibya', code: '+264' },
  { flag: '🇳🇷', name: 'Nauru', code: '+674' },
  { flag: '🇳🇵', name: 'Nepal', code: '+977' },
  { flag: '🇳🇪', name: 'Nijer', code: '+227' },
  { flag: '🇳🇬', name: 'Nijerya', code: '+234' },
  { flag: '🇳🇮', name: 'Nikaragua', code: '+505' },
  { flag: '🇳🇴', name: 'Norveç', code: '+47' },
  { flag: '🇨🇫', name: 'Orta Afrika Cumhuriyeti', code: '+236' },
  { flag: '🇺🇿', name: 'Özbekistan', code: '+998' },
  { flag: '🇵🇰', name: 'Pakistan', code: '+92' },
  { flag: '🇵🇼', name: 'Palau', code: '+680' },
  { flag: '🇵🇦', name: 'Panama', code: '+507' },
  { flag: '🇵🇬', name: 'Papua Yeni Gine', code: '+675' },
  { flag: '🇵🇾', name: 'Paraguay', code: '+595' },
  { flag: '🇵🇪', name: 'Peru', code: '+51' },
  { flag: '🇵🇱', name: 'Polonya', code: '+48' },
  { flag: '🇵🇹', name: 'Portekiz', code: '+351' },
  { flag: '🇷🇴', name: 'Romanya', code: '+40' },
  { flag: '🇷🇼', name: 'Ruanda', code: '+250' },
  { flag: '🇷🇺', name: 'Rusya', code: '+7' },
  { flag: '🇰🇳', name: 'Saint Kitts ve Nevis', code: '+1-869' },
  { flag: '🇱🇨', name: 'Saint Lucia', code: '+1-758' },
  { flag: '🇻🇨', name: 'Saint Vincent', code: '+1-784' },
  { flag: '🇼🇸', name: 'Samoa', code: '+685' },
  { flag: '🇸🇲', name: 'San Marino', code: '+378' },
  { flag: '🇸🇹', name: 'São Tomé ve Príncipe', code: '+239' },
  { flag: '🇸🇳', name: 'Senegal', code: '+221' },
  { flag: '🇸🇨', name: 'Seyşeller', code: '+248' },
  { flag: '🇸🇱', name: 'Sierra Leone', code: '+232' },
  { flag: '🇸🇬', name: 'Singapur', code: '+65' },
  { flag: '🇷🇸', name: 'Sırbistan', code: '+381' },
  { flag: '🇸🇰', name: 'Slovakya', code: '+421' },
  { flag: '🇸🇮', name: 'Slovenya', code: '+386' },
  { flag: '🇸🇧', name: 'Solomon Adaları', code: '+677' },
  { flag: '🇸🇴', name: 'Somali', code: '+252' },
  { flag: '🇱🇰', name: 'Sri Lanka', code: '+94' },
  { flag: '🇸🇩', name: 'Sudan', code: '+249' },
  { flag: '🇸🇷', name: 'Surinam', code: '+597' },
  { flag: '🇸🇾', name: 'Suriye', code: '+963' },
  { flag: '🇸🇦', name: 'Suudi Arabistan', code: '+966' },
  { flag: '🇨🇱', name: 'Şili', code: '+56' },
  { flag: '🇹🇯', name: 'Tacikistan', code: '+992' },
  { flag: '🇹🇿', name: 'Tanzanya', code: '+255' },
  { flag: '🇹🇭', name: 'Tayland', code: '+66' },
  { flag: '🇹🇼', name: 'Tayvan', code: '+886' },
  { flag: '🇹🇬', name: 'Togo', code: '+228' },
  { flag: '🇹🇴', name: 'Tonga', code: '+676' },
  { flag: '🇹🇹', name: 'Trinidad ve Tobago', code: '+1-868' },
  { flag: '🇹🇳', name: 'Tunus', code: '+216' },
  { flag: '🇹🇲', name: 'Türkmenistan', code: '+993' },
  { flag: '🇹🇻', name: 'Tuvalu', code: '+688' },
  { flag: '🇺🇬', name: 'Uganda', code: '+256' },
  { flag: '🇺🇦', name: 'Ukrayna', code: '+380' },
  { flag: '🇴🇲', name: 'Umman', code: '+968' },
  { flag: '🇺🇾', name: 'Uruguay', code: '+598' },
  { flag: '🇯🇴', name: 'Ürdün', code: '+962' },
  { flag: '🇻🇺', name: 'Vanuatu', code: '+678' },
  { flag: '🇻🇦', name: 'Vatikan', code: '+39-06' },
  { flag: '🇻🇪', name: 'Venezuela', code: '+58' },
  { flag: '🇻🇳', name: 'Vietnam', code: '+84' },
  { flag: '🇾🇪', name: 'Yemen', code: '+967' },
  { flag: '🇳🇿', name: 'Yeni Zelanda', code: '+64' },
  { flag: '🇬🇷', name: 'Yunanistan', code: '+30' },
  { flag: '🇿🇲', name: 'Zambia', code: '+260' },
  { flag: '🇿🇼', name: 'Zimbabve', code: '+263' },
].sort((a, b) => a.name.localeCompare(b.name, 'tr'));

const QUICK_PICK_KEYS = new Set(QUICK_PICKS.map((c) => `${c.name}:${c.code}`));

/* ================================================================== */
/*  Style constants                                                    */
/* ================================================================== */

const C = {
  deep: '#0F2E2C',
  primary: '#28AFB0',
  primaryDark: '#1E8A8B',
  gold: '#FFCB00',
  goldLight: '#FFD740',
  card: '#18625F',
  coral: '#F25F5C',
  white95: 'rgba(255,255,255,0.95)',
  white85: 'rgba(255,255,255,0.85)',
  white70: 'rgba(255,255,255,0.70)',
  white60: 'rgba(255,255,255,0.60)',
  white50: 'rgba(255,255,255,0.50)',
  white10: 'rgba(255,255,255,0.10)',
  white08: 'rgba(255,255,255,0.08)',
  white05: 'rgba(255,255,255,0.05)',
  white03: 'rgba(255,255,255,0.03)',
  black40: 'rgba(0,0,0,0.40)',
  black25: 'rgba(0,0,0,0.25)',
  shadowGold: 'rgba(255,203,0,0.40)',
  shadowGoldHover: 'rgba(255,203,0,0.50)',
} as const;

const INPUT_SHADOW = `inset 4px 4px 10px ${C.black40}, inset -2px -2px 6px ${C.white03}, 0 1px 0 ${C.white05}`;
const INPUT_FOCUS_SHADOW = `inset 4px 4px 12px rgba(0,0,0,0.50), inset -2px -2px 6px ${C.white05}, 0 0 0 3px rgba(255,203,0,0.20)`;
const CTA_SHADOW = `0 6px 28px ${C.shadowGold}, 0 2px 8px ${C.black25}, inset 0 1px 2px rgba(255,255,255,0.40)`;
const CTA_SHADOW_HOVER = `0 10px 32px ${C.shadowGoldHover}, 0 4px 12px ${C.black25}, inset 0 1px 2px rgba(255,255,255,0.40)`;
const CARD_SHADOW = `0 24px 60px ${C.black40}, 0 8px 24px rgba(0,0,0,0.30), inset 0 1px 0 ${C.white10}`;

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: C.white60,
  marginBottom: '8px',
};

const BASE_INPUT: React.CSSProperties = {
  width: '100%',
  padding: '16px 20px',
  background: 'rgba(0,0,0,0.25)',
  border: 'none',
  borderLeft: `4px solid ${C.gold}`,
  borderRadius: '0 12px 12px 0',
  color: C.white95,
  fontSize: '15px',
  boxShadow: INPUT_SHADOW,
  transition: 'box-shadow 180ms ease-out, background-color 160ms ease-out',
  boxSizing: 'border-box' as const,
  outline: 'none',
};

const ERROR_INPUT_OVERRIDE: React.CSSProperties = {
  borderLeft: `4px solid ${C.coral}`,
};

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function FormInput({
  label,
  id,
  type = 'text',
  placeholder,
  name,
  required,
  error,
  onClearError,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  error?: string;
  onClearError?: (field: string) => void;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
        {required && ' *'}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{ ...BASE_INPUT, ...(error ? ERROR_INPUT_OVERRIDE : {}) }}
        onChange={() => error && onClearError?.(name)}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = INPUT_FOCUS_SHADOW;
          e.currentTarget.style.background = 'rgba(0,0,0,0.35)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = INPUT_SHADOW;
          e.currentTarget.style.background = 'rgba(0,0,0,0.25)';
        }}
      />
      {error && (
        <span style={{ fontSize: '12px', color: C.coral, marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

function FormSelect({
  label,
  id,
  name,
  options,
  placeholder,
  required,
  error,
  onClearError,
}: {
  label: string;
  id: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  error?: string;
  onClearError?: (field: string) => void;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
        {required && ' *'}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        style={{
          ...BASE_INPUT,
          ...(error ? ERROR_INPUT_OVERRIDE : {}),
          appearance: 'none',
          cursor: 'pointer',
        }}
        onChange={() => error && onClearError?.(name)}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = INPUT_FOCUS_SHADOW;
          e.currentTarget.style.background = 'rgba(0,0,0,0.35)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = INPUT_SHADOW;
          e.currentTarget.style.background = 'rgba(0,0,0,0.25)';
        }}
      >
        <option value="" style={{ background: C.card, color: '#ffffff' }}>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: C.card, color: '#ffffff' }}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: '12px', color: C.coral, marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

function FormTextarea({
  label,
  id,
  name,
  placeholder,
}: {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={4}
        style={{
          ...BASE_INPUT,
          minHeight: '110px',
          resize: 'vertical',
          fontFamily: 'inherit',
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = INPUT_FOCUS_SHADOW;
          e.currentTarget.style.background = 'rgba(0,0,0,0.35)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = INPUT_SHADOW;
          e.currentTarget.style.background = 'rgba(0,0,0,0.25)';
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Country Dropdown                                                    */
/* ------------------------------------------------------------------ */

function CountryDropdown({
  selected,
  onSelect,
  searchPlaceholder,
  quickPicksLabel,
  allCountriesLabel,
}: {
  selected: Country;
  onSelect: (country: Country) => void;
  searchPlaceholder: string;
  quickPicksLabel: string;
  allCountriesLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const query = search.toLowerCase();
  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(query) || c.code.includes(query),
  );
  const fullList = filtered.filter(
    (c) => !QUICK_PICK_KEYS.has(`${c.name}:${c.code}`),
  );
  const showQuickPicks = !search;

  const handleSelect = (country: Country) => {
    onSelect(country);
    setOpen(false);
    setSearch('');
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    color: C.white95,
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', minWidth: '140px', flexShrink: 0 }}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: '100%',
          height: '100%',
          padding: '16px 12px',
          background: 'rgba(0,0,0,0.25)',
          border: 'none',
          borderLeft: `4px solid ${C.gold}`,
          borderRadius: '0 12px 12px 0',
          color: C.white95,
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: INPUT_SHADOW,
          boxSizing: 'border-box',
          outline: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = INPUT_FOCUS_SHADOW;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = INPUT_SHADOW;
        }}
      >
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <span style={{ marginLeft: 'auto', fontSize: '10px', color: C.white50 }}>
          {open ? '\u25B4' : '\u25BE'}
        </span>
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 160ms ease-out, visibility 160ms ease-out',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          minWidth: '260px',
          maxHeight: '320px',
          overflowY: 'auto',
          background: C.card,
          borderRadius: '0 0 12px 12px',
          boxShadow: `0 12px 32px ${C.black40}`,
          zIndex: 50,
        }}
      >
        {/* Search */}
        <div style={{ padding: '10px 12px', borderBottom: `1px solid ${C.white10}` }}>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.20)',
              border: 'none',
              borderRadius: '8px',
              color: C.white95,
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Quick picks */}
        {showQuickPicks && (
          <div>
            <div
              style={{
                padding: '8px 16px 4px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.white50,
              }}
            >
              {quickPicksLabel}
            </div>
            {QUICK_PICKS.map((c) => (
              <button
                key={`qp-${c.code}`}
                type="button"
                role="option"
                aria-selected={selected.code === c.code && selected.name === c.name}
                onClick={() => handleSelect(c)}
                style={itemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.white08;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
                <span style={{ marginLeft: 'auto', color: C.white50, fontSize: '13px' }}>
                  {c.code}
                </span>
              </button>
            ))}
            <div style={{ borderBottom: `1px solid ${C.white10}`, margin: '4px 0' }} />
          </div>
        )}

        {/* All countries */}
        <div>
          <div
            style={{
              padding: '8px 16px 4px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: C.white50,
            }}
          >
            {allCountriesLabel}
          </div>
          {fullList.map((c, i) => (
            <button
              key={`${c.code}-${i}`}
              type="button"
              role="option"
              aria-selected={selected.code === c.code && selected.name === c.name}
              onClick={() => handleSelect(c)}
              style={itemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.white08;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
              <span style={{ marginLeft: 'auto', color: C.white50, fontSize: '13px' }}>
                {c.code}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone Field                                                         */
/* ------------------------------------------------------------------ */

function PhoneField({
  label,
  id,
  content,
  selectedCountry,
  onCountryChange,
  isMobile,
}: {
  label: string;
  id: string;
  content: FormContent;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  isMobile: boolean;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '8px' : 0,
        }}
      >
        <CountryDropdown
          selected={selectedCountry}
          onSelect={onCountryChange}
          searchPlaceholder={content.phoneSearch}
          quickPicksLabel={content.phoneQuickPicks}
          allCountriesLabel={content.phoneAllCountries}
        />
        <input
          id={id}
          type="tel"
          name="phone"
          style={{
            flex: 1,
            padding: '16px 20px',
            background: 'rgba(0,0,0,0.25)',
            border: 'none',
            borderLeft: isMobile ? `4px solid ${C.gold}` : 'none',
            borderRadius: isMobile ? '0 12px 12px 0' : '0 12px 12px 0',
            color: C.white95,
            fontSize: '15px',
            boxShadow: INPUT_SHADOW,
            transition: 'box-shadow 180ms ease-out, background-color 160ms ease-out',
            boxSizing: 'border-box' as const,
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = INPUT_FOCUS_SHADOW;
            e.currentTarget.style.background = 'rgba(0,0,0,0.35)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = INPUT_SHADOW;
            e.currentTarget.style.background = 'rgba(0,0,0,0.25)';
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkbox Group                                                      */
/* ------------------------------------------------------------------ */

function CheckboxGroup({
  label,
  name,
  options,
  checked,
  onChange,
  error,
  onClearError,
  isSmall,
}: {
  label: string;
  name: string;
  options: string[];
  checked: string[];
  onChange: (val: string[]) => void;
  error?: string;
  onClearError?: (field: string) => void;
  isSmall: boolean;
}) {
  const groupId = useId();

  const toggle = (opt: string) => {
    const next = checked.includes(opt)
      ? checked.filter((v) => v !== opt)
      : [...checked, opt];
    onChange(next);
    if (error) onClearError?.(name);
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={LABEL_STYLE}>
        {label} *
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isSmall ? '1fr' : '1fr 1fr',
          gap: '10px',
          marginTop: '4px',
        }}
      >
        {options.map((opt, i) => {
          const isChecked = checked.includes(opt);
          const cbId = `${groupId}-cb-${i}`;
          return (
            <label
              key={opt}
              htmlFor={cbId}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <input
                id={cbId}
                type="checkbox"
                name={name}
                value={opt}
                checked={isChecked}
                onChange={() => toggle(opt)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <span
                role="checkbox"
                aria-checked={isChecked}
                style={{
                  width: '18px',
                  height: '18px',
                  flexShrink: 0,
                  background: isChecked ? C.gold : C.white08,
                  border: `1.5px solid ${isChecked ? C.gold : 'rgba(255,255,255,0.25)'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 160ms ease-out, border-color 120ms linear',
                }}
              >
                {isChecked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke={C.deep}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.4 }}>
                {opt}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <span style={{ fontSize: '12px', color: C.coral, marginTop: '6px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Radio Group (pill style)                                            */
/* ------------------------------------------------------------------ */

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
  onClearError,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  error?: string;
  onClearError?: (field: string) => void;
}) {
  const groupId = useId();

  const handleChange = (opt: string) => {
    onChange(opt);
    if (error) onClearError?.(name);
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={LABEL_STYLE}>
        {label}
        {required && ' *'}
      </div>
      <div
        role="radiogroup"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}
      >
        {options.map((opt, i) => {
          const isSelected = value === opt;
          const radioId = `${groupId}-r-${i}`;
          return (
            <label
              key={opt}
              htmlFor={radioId}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                borderRadius: '24px',
                border: `1.5px solid ${isSelected ? C.gold : C.white10}`,
                background: isSelected ? 'rgba(255,203,0,0.15)' : 'transparent',
                color: isSelected ? C.gold : C.white70,
                fontSize: '14px',
                cursor: 'pointer',
                transition:
                  'background-color 160ms ease-out, border-color 120ms linear, color 120ms linear',
              }}
            >
              <input
                id={radioId}
                type="radio"
                name={name}
                value={opt}
                checked={isSelected}
                onChange={() => handleChange(opt)}
                required={required && i === 0}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              {opt}
            </label>
          );
        })}
      </div>
      {error && (
        <span style={{ fontSize: '12px', color: C.coral, marginTop: '6px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
}

function Divider() {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `1px solid ${C.white10}`,
        margin: '32px 0',
      }}
    />
  );
}

/* ================================================================== */
/*  Tab content                                                        */
/* ================================================================== */

interface TabFieldsProps {
  content: FormContent;
  errors: Record<string, string>;
  onClearError: (field: string) => void;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  isMobile: boolean;
  isSmall: boolean;
}

function Tab1Fields({
  content,
  errors,
  onClearError,
  selectedCountry,
  onCountryChange,
  isMobile,
  isSmall,
}: TabFieldsProps) {
  const [assessmentChecked, setAssessmentChecked] = useState<string[]>([]);
  const idPrefix = useId();

  return (
    <>
      {/* Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 24px' }}>
        <FormInput
          label={content.labels.name}
          id={`${idPrefix}-name`}
          name="name"
          required
          error={errors.name}
          onClearError={onClearError}
        />
        <FormInput
          label={content.labels.company}
          id={`${idPrefix}-company`}
          name="company"
          required
          error={errors.company}
          onClearError={onClearError}
        />
        <FormInput
          label={content.labels.email}
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          error={errors.email}
          onClearError={onClearError}
        />
        <PhoneField
          label={content.labels.phone}
          id={`${idPrefix}-phone`}
          content={content}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
          isMobile={isMobile}
        />
      </div>

      <Divider />

      {/* Assessment type */}
      <CheckboxGroup
        label={content.labels.assessmentType}
        name="assessmentType"
        options={content.assessmentTypeOptions}
        checked={assessmentChecked}
        onChange={setAssessmentChecked}
        error={errors.assessmentType}
        onClearError={onClearError}
        isSmall={isSmall}
      />

      <Divider />

      {/* Project info */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 24px' }}>
        <FormInput
          label={content.labels.projectLocation}
          id={`${idPrefix}-loc`}
          name="projectLocation"
          placeholder={content.placeholders.location}
          required
          error={errors.projectLocation}
          onClearError={onClearError}
        />
        <FormSelect
          label={content.labels.technology}
          id={`${idPrefix}-tech`}
          name="technology"
          options={content.technologyOptionsTab1}
          placeholder={content.selectPlaceholder}
          required
          error={errors.technology}
          onClearError={onClearError}
        />
        <FormSelect
          label={content.labels.targetCapacity}
          id={`${idPrefix}-cap`}
          name="targetCapacity"
          options={content.targetCapacityOptions}
          placeholder={content.selectPlaceholder}
          required
          error={errors.targetCapacity}
          onClearError={onClearError}
        />
        <FormSelect
          label={content.labels.projectStage}
          id={`${idPrefix}-stage`}
          name="projectStage"
          options={content.projectStageOptions}
          placeholder={content.selectPlaceholder}
          required
          error={errors.projectStage}
          onClearError={onClearError}
        />
      </div>

      <Divider />

      {/* Notes */}
      <FormTextarea
        label={content.labels.notes}
        id={`${idPrefix}-notes`}
        name="notes"
        placeholder={content.placeholders.notesTab1}
      />
    </>
  );
}

function Tab2Fields({
  content,
  errors,
  onClearError,
  selectedCountry,
  onCountryChange,
  isMobile,
  isSmall,
}: TabFieldsProps) {
  const [purposeChecked, setPurposeChecked] = useState<string[]>([]);
  const [performanceVal, setPerformanceVal] = useState('');
  const [revenueVal, setRevenueVal] = useState('');
  const [timelineVal, setTimelineVal] = useState('');
  const idPrefix = useId();

  const showPpa = revenueVal === 'Elektrik Al\u0131m Anla\u015Fmas\u0131 (PPA)';

  return (
    <>
      {/* Contact info */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 24px' }}>
        <FormInput
          label={content.labels.name}
          id={`${idPrefix}-name`}
          name="name"
          required
          error={errors.name}
          onClearError={onClearError}
        />
        <FormInput
          label={content.labels.company}
          id={`${idPrefix}-company`}
          name="company"
          required
          error={errors.company}
          onClearError={onClearError}
        />
        <FormInput
          label={content.labels.email}
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          error={errors.email}
          onClearError={onClearError}
        />
        <PhoneField
          label={content.labels.phone}
          id={`${idPrefix}-phone`}
          content={content}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
          isMobile={isMobile}
        />
      </div>

      <Divider />

      {/* Purpose */}
      <CheckboxGroup
        label={content.labels.applicationPurpose}
        name="applicationPurpose"
        options={content.applicationPurposeOptions}
        checked={purposeChecked}
        onChange={setPurposeChecked}
        error={errors.applicationPurpose}
        onClearError={onClearError}
        isSmall={isSmall}
      />

      <Divider />

      {/* Plant profile */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 24px' }}>
        <FormSelect
          label={content.labels.technology}
          id={`${idPrefix}-tech`}
          name="technology"
          options={content.technologyOptionsTab2}
          placeholder={content.selectPlaceholder}
          required
          error={errors.technology}
          onClearError={onClearError}
        />
        <FormSelect
          label={content.labels.installedCapacity}
          id={`${idPrefix}-cap`}
          name="installedCapacity"
          options={content.installedCapacityOptions}
          placeholder={content.selectPlaceholder}
          required
          error={errors.installedCapacity}
          onClearError={onClearError}
        />
        <FormInput
          label={content.labels.location}
          id={`${idPrefix}-loc`}
          name="location"
          placeholder={content.placeholders.location}
          required
          error={errors.location}
          onClearError={onClearError}
        />
        <FormSelect
          label={content.labels.codYear}
          id={`${idPrefix}-cod`}
          name="codYear"
          options={content.codYearOptions}
          placeholder={content.selectPlaceholder}
          required
          error={errors.codYear}
          onClearError={onClearError}
        />
      </div>

      <Divider />

      {/* Operational data */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 24px' }}>
        <FormInput
          label={content.labels.annualProduction}
          id={`${idPrefix}-mwh`}
          name="annualProduction"
          placeholder={content.placeholders.annualProduction}
          required
          error={errors.annualProduction}
          onClearError={onClearError}
        />
        <FormSelect
          label={content.labels.scadaSystem}
          id={`${idPrefix}-scada`}
          name="scadaSystem"
          options={content.scadaOptions}
          placeholder={content.selectPlaceholder}
          required
          error={errors.scadaSystem}
          onClearError={onClearError}
        />
      </div>
      <RadioGroup
        label={content.labels.performanceStatus}
        name="performanceStatus"
        options={content.performanceOptions}
        value={performanceVal}
        onChange={setPerformanceVal}
        required
        error={errors.performanceStatus}
        onClearError={onClearError}
      />

      <Divider />

      {/* Revenue model */}
      <RadioGroup
        label={content.labels.revenueModel}
        name="revenueModel"
        options={content.revenueModelOptions}
        value={revenueVal}
        onChange={setRevenueVal}
        required
        error={errors.revenueModel}
        onClearError={onClearError}
      />

      {/* PPA conditional block */}
      <div
        style={{
          opacity: showPpa ? 1 : 0,
          visibility: showPpa ? 'visible' : 'hidden',
          pointerEvents: showPpa ? 'auto' : 'none',
          transition: 'opacity 160ms ease-out, visibility 160ms ease-out',
          height: showPpa ? 'auto' : 0,
          overflow: 'hidden',
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            background: 'rgba(0,0,0,0.18)',
            borderRadius: '0 12px 12px 0',
            borderLeft: `3px solid ${C.shadowGold}`,
            padding: '20px 24px',
            marginTop: '16px',
            gap: '0 18px',
          }}
        >
          <FormSelect
            label={content.labels.ppaMaturity}
            id={`${idPrefix}-ppa-mat`}
            name="ppaMaturity"
            options={content.ppaMaturityOptions}
            placeholder={content.selectPlaceholder}
          />
          <FormSelect
            label={content.labels.priceStructure}
            id={`${idPrefix}-ppa-price`}
            name="priceStructure"
            options={content.priceStructureOptions}
            placeholder={content.selectPlaceholder}
          />
        </div>
      </div>

      <Divider />

      {/* Action timeline */}
      <RadioGroup
        label={content.labels.actionTimeline}
        name="actionTimeline"
        options={content.actionTimelineOptions}
        value={timelineVal}
        onChange={setTimelineVal}
        required
        error={errors.actionTimeline}
        onClearError={onClearError}
      />

      <Divider />

      {/* Notes */}
      <FormTextarea
        label={content.labels.notes}
        id={`${idPrefix}-notes`}
        name="notes"
        placeholder={content.placeholders.notesTab2}
      />
    </>
  );
}

/* ================================================================== */
/*  Main component                                                     */
/* ================================================================== */

export default function GelistiriciForm({ content, locale }: GelistiriciFormProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'development' | 'operational'>('development');
  const [selectedCountry, setSelectedCountry] = useState<Country>(QUICK_PICKS[0]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const tabPanelId = useId();

  useEffect(() => {
    const mq768 = window.matchMedia('(max-width: 768px)');
    const mq640 = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq768.matches);
    setIsSmall(mq640.matches);
    const h768 = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const h640 = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mq768.addEventListener('change', h768);
    mq640.addEventListener('change', h640);
    return () => {
      mq768.removeEventListener('change', h768);
      mq640.removeEventListener('change', h640);
    };
  }, []);

  const clearError = useCallback(
    (field: string) => {
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = new FormData(form);

      // Honeypot check
      if (data.get('_hp')) return;

      const newErrors: Record<string, string> = {};

      // Required text fields
      const requiredText = ['name', 'company', 'email'];
      for (const field of requiredText) {
        if (!data.get(field)?.toString().trim()) {
          newErrors[field] = content.errors.required;
        }
      }

      // Email format
      const email = data.get('email')?.toString().trim() ?? '';
      if (email && !isValidEmail(email)) {
        newErrors.email = content.errors.email;
      }

      // Tab-specific validation
      if (activeTab === 'development') {
        if (!data.getAll('assessmentType').length) {
          newErrors.assessmentType = content.errors.checkbox;
        }
        for (const f of ['projectLocation', 'technology', 'targetCapacity', 'projectStage']) {
          if (!data.get(f)?.toString().trim()) {
            newErrors[f] = content.errors.required;
          }
        }
      } else {
        if (!data.getAll('applicationPurpose').length) {
          newErrors.applicationPurpose = content.errors.checkbox;
        }
        for (const f of [
          'technology',
          'installedCapacity',
          'location',
          'codYear',
          'annualProduction',
          'scadaSystem',
          'performanceStatus',
          'revenueModel',
          'actionTimeline',
        ]) {
          if (!data.get(f)?.toString().trim()) {
            newErrors[f] = content.errors.required;
          }
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstField = Object.keys(newErrors)[0];
        const el =
          form.querySelector<HTMLElement>(`[name="${firstField}"]`) ??
          form.querySelector<HTMLElement>(`label[for*="${firstField}"]`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      setErrors({});
      setFormSuccess(true);
    },
    [activeTab, content.errors],
  );

  const handleReset = useCallback(() => {
    setFormSuccess(false);
    setFormOpen(false);
    setActiveTab('development');
    setSelectedCountry(QUICK_PICKS[0]);
    setErrors({});
  }, []);

  /* ---- Tab styling ---- */
  const getTabStyle = (tab: 'development' | 'operational'): React.CSSProperties => {
    const isActive = activeTab === tab;
    const base: React.CSSProperties = {
      flex: 1,
      padding: '14px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      textAlign: 'center',
      transition:
        'background-color 160ms ease-out, border-color 120ms linear, color 120ms linear',
    };
    if (tab === 'development') {
      return {
        ...base,
        background: isActive
          ? `linear-gradient(180deg, ${C.goldLight}, ${C.gold})`
          : 'rgba(255,203,0,0.10)',
        color: isActive ? C.deep : 'rgba(255,203,0,0.80)',
        border: isActive
          ? `2px solid ${C.gold}`
          : '2px solid rgba(255,203,0,0.50)',
      };
    }
    return {
      ...base,
      background: isActive
        ? `linear-gradient(180deg, ${C.primary}, ${C.primaryDark})`
        : C.white05,
      color: isActive ? '#FFFFFF' : C.white85,
      border: isActive
        ? `2px solid ${C.primary}`
        : '2px solid rgba(40,175,176,0.50)',
    };
  };

  return (
    <section
      className={styles.section}
      style={{
        background: C.deep,
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
      }}
    >
      {/* Decorative radial spots */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 80%, rgba(40,175,176,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,203,0,0.06) 0%, transparent 35%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* State container */}
        <div style={{ position: 'relative' }}>
          {/* ================= CTA PANEL ================= */}
          <div className={formOpen ? styles.panelHidden : styles.panelVisible}>
            <div
              style={{
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto',
                padding: '60px 20px',
              }}
            >
              {/* Kicker with gold lines */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '2px',
                    background: C.gold,
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: C.gold,
                  }}
                >
                  {content.cta.kicker}
                </span>
                <span
                  style={{
                    width: '24px',
                    height: '2px',
                    background: C.gold,
                    display: 'inline-block',
                  }}
                />
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                {content.cta.heading}
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '16px',
                  color: C.white70,
                  lineHeight: 1.6,
                  marginBottom: '36px',
                  maxWidth: '540px',
                  margin: '0 auto 36px',
                }}
              >
                {content.cta.subtitle}
              </p>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                style={{
                  padding: '18px 40px',
                  background: `linear-gradient(180deg, ${C.goldLight} 0%, ${C.gold} 100%)`,
                  color: C.deep,
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: CTA_SHADOW,
                  transition: 'box-shadow 200ms ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = CTA_SHADOW_HOVER;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = CTA_SHADOW;
                }}
              >
                {content.cta.button}
              </button>
            </div>
          </div>

          {/* ================= FORM CARD ================= */}
          <div className={formOpen ? styles.panelVisible : styles.panelHidden}>
            <div
              style={{
                background: C.card,
                borderRadius: '24px',
                padding: isMobile ? '32px 24px' : '48px',
                maxWidth: '900px',
                margin: '0 auto',
                border: `1px solid ${C.white10}`,
                boxShadow: CARD_SHADOW,
              }}
            >
              {formSuccess ? (
                /* ---- Success state ---- */
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  {/* Success icon */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: C.gold,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                    }}
                  >
                    <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                      <path
                        d="M2 11L10 19L26 3"
                        stroke={C.deep}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginBottom: '12px',
                    }}
                  >
                    {content.success.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '16px',
                      color: C.white70,
                      lineHeight: 1.6,
                      marginBottom: '32px',
                      maxWidth: '400px',
                      margin: '0 auto 32px',
                    }}
                  >
                    {content.success.message}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      padding: '14px 32px',
                      background: 'transparent',
                      border: `1.5px solid ${C.gold}`,
                      borderRadius: '12px',
                      color: C.gold,
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 160ms ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,203,0,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {content.success.reset}
                  </button>
                </div>
              ) : (
                /* ---- Form content ---- */
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_hp"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Hidden fields */}
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="tab" value={activeTab} />
                  <input
                    type="hidden"
                    name="countryCode"
                    value={selectedCountry.code}
                  />

                  {/* Back button */}
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 0',
                      background: 'none',
                      border: 'none',
                      color: C.white60,
                      fontSize: '13px',
                      cursor: 'pointer',
                      marginBottom: '24px',
                      transition: 'color 120ms linear',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = C.white95;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = C.white60;
                    }}
                  >
                    {content.back}
                  </button>

                  {/* Tab bar */}
                  <div
                    role="tablist"
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '36px',
                      flexDirection: isMobile ? 'column' : 'row',
                    }}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'development'}
                      aria-controls={`${tabPanelId}-panel-dev`}
                      onClick={() => {
                        setActiveTab('development');
                        setErrors({});
                      }}
                      style={getTabStyle('development')}
                    >
                      {content.tab1Label}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'operational'}
                      aria-controls={`${tabPanelId}-panel-ops`}
                      onClick={() => {
                        setActiveTab('operational');
                        setErrors({});
                      }}
                      style={getTabStyle('operational')}
                    >
                      {content.tab2Label}
                    </button>
                  </div>

                  {/* Tab panels */}
                  {activeTab === 'development' && (
                    <div id={`${tabPanelId}-panel-dev`} role="tabpanel">
                      <Tab1Fields
                        content={content}
                        errors={errors}
                        onClearError={clearError}
                        selectedCountry={selectedCountry}
                        onCountryChange={setSelectedCountry}
                        isMobile={isMobile}
                        isSmall={isSmall}
                      />
                    </div>
                  )}
                  {activeTab === 'operational' && (
                    <div id={`${tabPanelId}-panel-ops`} role="tabpanel">
                      <Tab2Fields
                        content={content}
                        errors={errors}
                        onClearError={clearError}
                        selectedCountry={selectedCountry}
                        onCountryChange={setSelectedCountry}
                        isMobile={isMobile}
                        isSmall={isSmall}
                      />
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: isMobile ? '16px 24px' : '18px 32px',
                      background: `linear-gradient(180deg, ${C.goldLight} 0%, ${C.gold} 100%)`,
                      color: C.deep,
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      marginTop: '8px',
                      boxShadow: CTA_SHADOW,
                      transition: 'box-shadow 200ms ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = CTA_SHADOW_HOVER;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = CTA_SHADOW;
                    }}
                  >
                    {activeTab === 'development'
                      ? content.tab1Submit
                      : content.tab2Submit}
                  </button>

                  {/* Privacy note */}
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '20px',
                      fontSize: '13px',
                      fontStyle: 'italic',
                      color: C.white50,
                      lineHeight: 1.6,
                    }}
                  >
                    {content.privacy}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
