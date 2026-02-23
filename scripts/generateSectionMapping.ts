import fs from "fs";
import path from "path";

/**
 * AFA ENERGY ROMANIA - YÖNETİŞİM VE DOĞRULAMA BETİĞİ v5.2.2
 * * AMAÇ:
 * 1. Proje bölümlerini ve içeriklerini doğrulamak (Fail-Fast).
 * 2. Eksik veya hatalı yapılandırmaları dağıtım öncesi yakalamak.
 * 3. Sistem dokümantasyonunu otomatik üretmek.
 * * KULLANIM:
 * npx ts-node scripts/generateSectionMapping.ts --locale tr
 * npx ts-node scripts/generateSectionMapping.ts --all
 */

// --- TİP TANIMLARI ---

type GovernanceError = {
  code: string;
  path: string;
  message: string;
  locale?: string;
};

type SectionSpec = {
  id: string;
  jsonPath: string; // İçerik verisinin yolu
  labelPath?: string; // Dokümantasyon için başlık yolu (Opsiyonel)
  rules?: (data: any) => string[] | null; // Çoklu hata döndüren kural seti
};

// --- KONFİGÜRASYON ---

const LOCALES = ["tr", "en", "ro"] as const;
const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = path.join(PROJECT_ROOT, "docs", "governance");

/**
 * Validates that a resolved path stays within the project root.
 * Prevents path traversal attacks via malicious locale or path segments.
 */
function safePath(resolvedPath: string): string {
  const normalized = path.resolve(resolvedPath);
  if (!normalized.startsWith(PROJECT_ROOT + path.sep) && normalized !== PROJECT_ROOT) {
    throw new Error(`[SECURITY] Path traversal detected: "${resolvedPath}" resolves outside project root.`);
  }
  return normalized;
}

/**
 * Validates locale against the allowlist.
 * Rejects any value not in LOCALES to prevent directory traversal via locale parameter.
 */
function validateLocale(locale: string): asserts locale is (typeof LOCALES)[number] {
  if (!(LOCALES as readonly string[]).includes(locale)) {
    throw new Error(`[SECURITY] Invalid locale "${locale}". Allowed: ${LOCALES.join(', ')}`);
  }
}

// SÖZLÜK DOSYA YOLU ŞABLONU (Proje yapınıza göre burayı düzenleyin)
const DICT_PATH_TEMPLATE = (locale: string) => {
  validateLocale(locale);
  return safePath(path.join(PROJECT_ROOT, "src", "content", locale, "homepage.json"));
};

// v5.0 Homepage Sözlük Yapısına Uygun Bölüm Tanımları
const SECTIONS: SectionSpec[] = [
  { 
    id: "hero", 
    jsonPath: "hero",
    labelPath: "hero.motto",
    rules: (data) => {
      const errs: string[] = [];
      if (!data?.primaryCta) errs.push("hero.primaryCta zorunludur.");
      if (!data?.secondaryCta) errs.push("hero.secondaryCta zorunludur.");
      return errs.length > 0 ? errs : null;
    }
  },
  { 
    id: "decision-interface", 
    jsonPath: "decisionCards",
    labelPath: "decisionCards.investor.title"
  },
  { 
    id: "intro-statement", 
    jsonPath: "introStatement",
    labelPath: "introStatement.text"
  },
  { 
    id: "investment-chain", 
    jsonPath: "investmentChain",
    labelPath: "investmentChain.title",
    rules: (data) => {
      const errs: string[] = [];
      if (!Array.isArray(data?.stages)) {
        errs.push("investmentChain.stages bir dizi (array) olmalıdır.");
      } else if (data.stages.length !== 3) {
        errs.push(`Yatırım hazırlık zinciri 3 aşama içermelidir. (Bulunan: ${data.stages.length})`);
      }
      return errs.length > 0 ? errs : null;
    }
  },
  { 
    id: "metrics", 
    jsonPath: "metrics",
    labelPath: "metrics.groups.0.title", // İlk grubun başlığı referans alınır
    rules: (data) => {
      const errs: string[] = [];
      if (!Array.isArray(data?.groups)) {
        errs.push("metrics.groups bir dizi (array) olmalıdır.");
      } else if (data.groups.length < 2) {
        errs.push("Metrikler en az 2 grupta (Türkiye/Romanya) yönetilmelidir.");
      }
      return errs.length > 0 ? errs : null;
    }
  },
  { 
    id: "role-clarity", 
    jsonPath: "roleClarity",
    labelPath: "roleClarity.roleTitle",
    rules: (data) => {
      const errs: string[] = [];
      if (!data?.boundaryNote) errs.push("roleClarity.boundaryNote (Sınır Notu) zorunludur.");
      return errs.length > 0 ? errs : null;
    }
  },
  { 
    id: "form-success", 
    jsonPath: "formSuccess",
    labelPath: "formSuccess.message"
  },
  { 
    id: "scope-disclaimer", 
    jsonPath: "scopeDisclaimer",
    labelPath: "scopeDisclaimer.text",
    rules: (data) => {
      const errs: string[] = [];
      if (!data?.text) errs.push("Yasal kapsam metni (scopeDisclaimer.text) zorunludur.");
      return errs.length > 0 ? errs : null;
    }
  },
  { 
    id: "footer", 
    jsonPath: "footer",
    labelPath: "footer.formsOnly" // Footer başlığı olmadığı için temsili bir alan
  }
];

// --- YARDIMCI FONKSİYONLAR ---

function getByPath(obj: any, pathStr: string): any {
  if (!obj) return undefined;
  return pathStr.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

// Geliştirilmiş Anahtar Toplayıcı (Array Desteği ile)
function collectKeys(obj: any, prefix = ""): string[] {
  if (obj === null || obj === undefined) return [];

  let keys: string[] = [];

  if (Array.isArray(obj)) {
    // Dizi elemanlarını normalize et: "stages[].title"
    const merged = new Set<string>();
    obj.forEach(item => {
      collectKeys(item, prefix + "[]").forEach(k => merged.add(k));
    });
    return Array.from(merged);
  }

  if (typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      keys = keys.concat(collectKeys(obj[key], newPrefix));
    }
    return keys;
  }

  return [prefix]; // Leaf node
}

async function loadDict(locale: string): Promise<any> {
  const filePath = DICT_PATH_TEMPLATE(locale);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Sözlük dosyası bulunamadı: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

// --- DOĞRULAMA MOTORU ---

async function validateAndGenerate(locale: string): Promise<{ errors: GovernanceError[]; markdown: string }> {
  const dict = await loadDict(locale);
  const errors: GovernanceError[] = [];
  
  let mdContent = `# AFA Energy - Sistem Bolum Haritasi (${locale.toUpperCase()})\n\n`;
  mdContent += `**Olusturulma Tarihi:** ${new Date().toISOString()}\n\n`;
  mdContent += `| Bolum Kimligi | Veri Yolu (JSON) | Baslik / Etiket | Durum |\n`;
  mdContent += `|---|---|---|---|\n`;

  for (const section of SECTIONS) {
    const data = getByPath(dict, section.jsonPath);
    let status = "GECERLI";
    let label = "-";

    if (!data) {
      errors.push({
        code: "MISSING_SECTION",
        path: section.jsonPath,
        message: `Bölüm verisi '${locale}' sözlüğünde bulunamadı.`,
        locale
      });
      status = "EKSIK";
    } else {
      // Kuralları Kontrol Et
      if (section.rules) {
        const ruleErrors = section.rules(data);
        if (ruleErrors) {
          ruleErrors.forEach(msg => {
            errors.push({
              code: "GOVERNANCE_RULE",
              path: section.jsonPath,
              message: msg,
              locale
            });
          });
          status = "KURAL HATASI";
        }
      }

      // Etiket Okuma
      if (section.labelPath) {
        const val = getByPath(dict, section.labelPath);
        label = val ? String(val).substring(0, 50) + (String(val).length > 50 ? "..." : "") : "(BOS)";
      }
    }

    mdContent += `| \`${section.id}\` | \`${section.jsonPath}\` | ${label} | ${status} |\n`;
  }

  return { errors, markdown: mdContent };
}

async function checkI18nConsistency(): Promise<GovernanceError[]> {
  const errors: GovernanceError[] = [];
  
  // TR Referans Alınır
  const baseDict = await loadDict("tr");
  const baseKeys = new Set(collectKeys(baseDict));

  for (const locale of LOCALES) {
    if (locale === "tr") continue;
    const dict = await loadDict(locale);
    const keys = new Set(collectKeys(dict));

    // Eksik Anahtarlar
    baseKeys.forEach(key => {
      if (!keys.has(key)) {
        errors.push({
          code: "I18N_MISSING_KEY",
          path: key,
          message: `Anahtar '${locale}' sözlüğünde eksik.`,
          locale
        });
      }
    });

    // Fazla Anahtarlar
    keys.forEach(key => {
      if (!baseKeys.has(key)) {
        errors.push({
          code: "I18N_EXTRA_KEY",
          path: key,
          message: `Anahtar '${locale}' sözlüğünde fazla (TR referansında yok).`,
          locale
        });
      }
    });
  }
  return errors;
}

// --- ANA AKIŞ ---

async function main() {
  const args = process.argv.slice(2);
  const allMode = args.includes("--all");
  const localeArgIndex = args.indexOf("--locale");
  const targetLocales = allMode ? LOCALES : (localeArgIndex > -1 ? [args[localeArgIndex + 1]] : ["tr"]);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`[INFO] Yonetisim Dogrulamasi Baslatiliyor... Mod: ${allMode ? "TUM DILLER" : targetLocales[0]}`);

  let allErrors: GovernanceError[] = [];

  // 1. Bölüm Doğrulaması
  for (const locale of targetLocales) {
    try {
      const { errors, markdown } = await validateAndGenerate(locale as string);
      allErrors = allErrors.concat(errors);
      
      const outputPath = safePath(path.join(OUTPUT_DIR, `section-mapping.${locale}.md`));
      fs.writeFileSync(outputPath, markdown);
      console.log(`[OK] Rapor olusturuldu: ${outputPath}`);
    } catch (e: any) {
      console.error(`[CRITICAL] Kritik Hata (${locale}):`, e.message);
      process.exit(1);
    }
  }

  // 2. Dil Tutarlılığı (Sadece --all modunda)
  if (allMode) {
    console.log(`[INFO] Dil Tutarliligi (i18n) Kontrol Ediliyor...`);
    try {
      const i18nErrors = await checkI18nConsistency();
      allErrors = allErrors.concat(i18nErrors);
    } catch (e: any) {
      console.error(`[CRITICAL] i18n Kontrol Hatasi:`, e.message);
      process.exit(1);
    }
  }

  // SONUÇ
  if (allErrors.length > 0) {
    console.error("\n[FAIL] YONETISIM HATALARI TESPIT EDILDI (DAGITIM DURDURULDU):");
    allErrors.forEach(err => {
      console.error(`   - [${err.locale || "GENEL"}] [${err.code}] ${err.path}: ${err.message}`);
    });
    process.exit(1); // Fail-Fast
  } else {
    console.log("\n[SUCCESS] TUM KONTROLLER BASARILI. SISTEM DAGITIMA HAZIR.");
    process.exit(0);
  }
}

main();
