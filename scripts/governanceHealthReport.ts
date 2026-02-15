import fs from "fs";
import path from "path";

/**
 * AFA ENERGY ROMANIA — GOVERNANCE HEALTH REPORT v5.2.1
 *
 * Dictionary Format doğrulama betiği.
 * Kontroller:
 *   1. meta.version varlığı
 *   2. sections[] yapısal bütünlüğü (id, order, component, dataKey, enabled)
 *   3. Enabled bölümlerin data{} içinde karşılığı olması
 *   4. Registry'deki component isimlerinin geçerliliği
 *   5. hero zorunlu alanları (motto, subhead, primaryCta, secondaryCta)
 *   6. atrMatrix.framework dizisi kontrolü
 *   7. Dil tutarlılığı (i18n key eşleşmesi)
 *
 * Kullanım:
 *   npm run governance:check
 */

// --- TİP TANIMLARI ---

type GovernanceError = {
  code: string;
  path: string;
  message: string;
  locale?: string;
};

type Section = {
  id: string;
  order: number;
  component: string;
  dataKey: string;
  enabled: boolean;
};

type Dictionary = {
  meta: { version: string };
  sections: Section[];
  data: Record<string, unknown>;
  locale?: string;
};

// --- KONFİGÜRASYON ---

const LOCALES = ["tr", "en", "ro"] as const;
const DICT_PATH = (locale: string) =>
  path.join(process.cwd(), "src", "content", locale, "homepage.json");

const VALID_COMPONENTS = [
  "HeroSection",
  "IntroductoryStatement",
  "PositioningChain",
  "ExperienceMetrics",
  "RoleClarity",
  "DecisionInterface",
  "ClosingStatement",
];

// --- YARDIMCI FONKSİYONLAR ---

function loadDict(locale: string): Dictionary {
  const filePath = DICT_PATH(locale);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Sözlük dosyası bulunamadı: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Dictionary;
}

function collectKeys(obj: unknown, prefix = ""): string[] {
  if (obj === null || obj === undefined) return [];

  if (Array.isArray(obj)) {
    const merged = new Set<string>();
    obj.forEach((item) => {
      collectKeys(item, prefix + "[]").forEach((k) => merged.add(k));
    });
    return Array.from(merged);
  }

  if (typeof obj === "object") {
    let keys: string[] = [];
    for (const key of Object.keys(obj as Record<string, unknown>)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      keys = keys.concat(collectKeys((obj as Record<string, unknown>)[key], newPrefix));
    }
    return keys;
  }

  return [prefix];
}

// --- DOĞRULAMA KURALLARI ---

function validateDictionary(dict: Dictionary, locale: string): GovernanceError[] {
  const errors: GovernanceError[] = [];

  // 1. meta.version
  if (!dict.meta?.version) {
    errors.push({
      code: "MISSING_META_VERSION",
      path: "meta.version",
      message: "meta.version zorunludur.",
      locale,
    });
  }

  // 2. sections dizisi
  if (!Array.isArray(dict.sections) || dict.sections.length === 0) {
    errors.push({
      code: "MISSING_SECTIONS",
      path: "sections",
      message: "sections dizisi boş veya eksik.",
      locale,
    });
    return errors; // Devam etmenin anlamı yok
  }

  // 3. Her section'ın yapısal bütünlüğü
  const seenIds = new Set<string>();
  const seenOrders = new Set<number>();

  for (const section of dict.sections) {
    const sid = section.id || "(unnamed)";

    if (!section.id) {
      errors.push({ code: "SECTION_NO_ID", path: `sections`, message: `Bölümde id eksik.`, locale });
    } else if (seenIds.has(section.id)) {
      errors.push({ code: "DUPLICATE_ID", path: `sections.${sid}`, message: `Tekrarlanan bölüm id: "${sid}".`, locale });
    }
    seenIds.add(section.id);

    if (section.order === undefined) {
      errors.push({ code: "SECTION_NO_ORDER", path: `sections.${sid}`, message: `order eksik.`, locale });
    } else if (seenOrders.has(section.order)) {
      errors.push({ code: "DUPLICATE_ORDER", path: `sections.${sid}`, message: `Tekrarlanan order: ${section.order}.`, locale });
    }
    seenOrders.add(section.order);

    if (!section.component) {
      errors.push({ code: "SECTION_NO_COMPONENT", path: `sections.${sid}`, message: `component eksik.`, locale });
    } else if (!VALID_COMPONENTS.includes(section.component)) {
      errors.push({
        code: "INVALID_COMPONENT",
        path: `sections.${sid}`,
        message: `Geçersiz component: "${section.component}". Geçerli: ${VALID_COMPONENTS.join(", ")}`,
        locale,
      });
    }

    if (!section.dataKey) {
      errors.push({ code: "SECTION_NO_DATAKEY", path: `sections.${sid}`, message: `dataKey eksik.`, locale });
    }

    if (section.enabled === undefined) {
      errors.push({ code: "SECTION_NO_ENABLED", path: `sections.${sid}`, message: `enabled alanı eksik.`, locale });
    }

    // 4. Enabled bölümlerin data{} karşılığı
    if (section.enabled && section.dataKey) {
      const sectionData = dict.data?.[section.dataKey];
      if (sectionData === undefined) {
        errors.push({
          code: "MISSING_DATA_KEY",
          path: `data.${section.dataKey}`,
          message: `Aktif bölüm "${sid}" için data.${section.dataKey} bulunamadı.`,
          locale,
        });
      }
    }
  }

  // 5. data{} kontrolü
  if (!dict.data || typeof dict.data !== "object") {
    errors.push({ code: "MISSING_DATA", path: "data", message: "data nesnesi eksik.", locale });
    return errors;
  }

  // 6. hero zorunlu alanları
  const hero = dict.data.hero as Record<string, unknown> | undefined;
  if (hero) {
    for (const field of ["motto", "subhead", "primaryCta", "secondaryCta"]) {
      if (!hero[field]) {
        errors.push({
          code: "HERO_MISSING_FIELD",
          path: `data.hero.${field}`,
          message: `hero.${field} zorunludur.`,
          locale,
        });
      }
    }
  }

  // 7. atrMatrix.framework dizisi
  const atrMatrix = dict.data.atrMatrix as Record<string, unknown> | undefined;
  if (atrMatrix) {
    if (!Array.isArray(atrMatrix.framework)) {
      errors.push({
        code: "ATR_INVALID_FRAMEWORK",
        path: "data.atrMatrix.framework",
        message: "atrMatrix.framework bir dizi olmalıdır.",
        locale,
      });
    } else if (atrMatrix.framework.length === 0) {
      errors.push({
        code: "ATR_EMPTY_FRAMEWORK",
        path: "data.atrMatrix.framework",
        message: "atrMatrix.framework boş olamaz.",
        locale,
      });
    }
  }

  // 8. valueProposition zorunlu alanları
  const vp = dict.data.valueProposition as Record<string, unknown> | undefined;
  if (vp) {
    if (!vp.title) {
      errors.push({ code: "VP_MISSING_TITLE", path: "data.valueProposition.title", message: "valueProposition.title zorunludur.", locale });
    }
    if (!vp.body) {
      errors.push({ code: "VP_MISSING_BODY", path: "data.valueProposition.body", message: "valueProposition.body zorunludur.", locale });
    }
  }

  return errors;
}

// --- i18n TUTARLILIK KONTROLÜ ---

function checkI18nConsistency(): GovernanceError[] {
  const errors: GovernanceError[] = [];
  const baseDict = loadDict("tr");
  const baseDataKeys = new Set(collectKeys(baseDict.data));

  for (const locale of LOCALES) {
    if (locale === "tr") continue;
    const dict = loadDict(locale);
    const dataKeys = new Set(collectKeys(dict.data));

    // Eksik anahtarlar
    baseDataKeys.forEach((key) => {
      if (!dataKeys.has(key)) {
        errors.push({
          code: "I18N_MISSING_KEY",
          path: `data.${key}`,
          message: `Anahtar '${locale}' sözlüğünde eksik (TR referansında var).`,
          locale,
        });
      }
    });

    // Fazla anahtarlar
    dataKeys.forEach((key) => {
      if (!baseDataKeys.has(key)) {
        errors.push({
          code: "I18N_EXTRA_KEY",
          path: `data.${key}`,
          message: `Anahtar '${locale}' sözlüğünde fazla (TR referansında yok).`,
          locale,
        });
      }
    });

    // Sections yapısı eşleşmesi
    const baseSectionIds = baseDict.sections.map((s) => s.id).sort().join(",");
    const localeSectionIds = dict.sections.map((s) => s.id).sort().join(",");
    if (baseSectionIds !== localeSectionIds) {
      errors.push({
        code: "I18N_SECTION_MISMATCH",
        path: "sections",
        message: `Bölüm ID'leri TR ile eşleşmiyor. TR: [${baseSectionIds}] vs ${locale.toUpperCase()}: [${localeSectionIds}]`,
        locale,
      });
    }
  }

  return errors;
}

// --- ANA AKIŞ ---

async function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  AFA Energy — Governance Health Report v5.2.1          ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  let allErrors: GovernanceError[] = [];

  // 1. Her locale için dictionary doğrulaması
  for (const locale of LOCALES) {
    console.log(`[CHECK] ${locale.toUpperCase()} sözlüğü doğrulanıyor...`);
    try {
      const dict = loadDict(locale);
      const errors = validateDictionary(dict, locale);
      allErrors = allErrors.concat(errors);

      if (errors.length === 0) {
        const enabledCount = dict.sections.filter((s) => s.enabled).length;
        const totalCount = dict.sections.length;
        console.log(`  ✓ PASS — ${dict.meta.version} | ${enabledCount}/${totalCount} bölüm aktif`);
      } else {
        console.log(`  ✗ ${errors.length} hata bulundu`);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`  ✗ CRITICAL: ${msg}`);
      process.exit(1);
    }
  }

  // 2. i18n tutarlılık kontrolü
  console.log(`\n[CHECK] Dil tutarlılığı (i18n) kontrol ediliyor...`);
  try {
    const i18nErrors = checkI18nConsistency();
    allErrors = allErrors.concat(i18nErrors);
    if (i18nErrors.length === 0) {
      console.log(`  ✓ PASS — Tüm diller tutarlı`);
    } else {
      console.log(`  ✗ ${i18nErrors.length} tutarsızlık bulundu`);
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`  ✗ CRITICAL: ${msg}`);
    process.exit(1);
  }

  // SONUÇ
  console.log("\n" + "─".repeat(58));
  if (allErrors.length > 0) {
    console.error(`\n[FAIL] ${allErrors.length} GOVERNANCE HATASI TESPİT EDİLDİ:\n`);
    allErrors.forEach((err) => {
      console.error(`  [${err.locale || "GENEL"}] [${err.code}] ${err.path}: ${err.message}`);
    });
    console.error("\nDağıtım durduruldu.");
    process.exit(1);
  } else {
    console.log("\n[SUCCESS] TÜM KONTROLLER BAŞARILI. SİSTEM DAĞITIMA HAZIR.\n");
    process.exit(0);
  }
}

main();
