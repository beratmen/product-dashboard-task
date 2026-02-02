import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * eslintConfig: Projedeki kod denetim kurallarını belirleyen ana yapılandırma.
 */
const eslintConfig = defineConfig([
  // 1. Next.js Core Web Vitals Kuralları
  // Sitenin performansı ve SEO'su için kritik olan yazım kurallarını uygular.
  ...nextVitals,
  
  // 2. Next.js TypeScript Kuralları
  // TypeScript kodlarının Next.js ile uyumlu ve hatasız yazılmasını denetler.
  ...nextTs,

  // 3. YOK SAYILAN DOSYALAR (globalIgnores)
  // ESLint'in taramasını istemediğimiz dosya ve klasörleri burada belirtiyoruz.
  globalIgnores([
    ".next/**",      // Next.js'in derleme klasörü (otomatik oluşur)
    "out/**",        // Statik çıktı klasörü
    "build/**",      // Projenin yayına hazır hali
    "next-env.d.ts", // Next.js tarafından otomatik yönetilen tip dosyası
  ]),
]);

export default eslintConfig;