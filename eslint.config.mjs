import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"],
  },
  {
    rules: {
      // SVG/GIF icons are fine as plain <img> during this migration.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
