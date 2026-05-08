import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // 🔥 IMPORTANT
        },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
    },

    rules: {
      "no-unused-vars": "warn", // 👈 unused consts
      "no-console": "off",

      "react/jsx-uses-vars": "warn", // 🔥 FIX

      // React rules
      "react/react-in-jsx-scope": "off", // for Vite/React 17+
      "react/jsx-uses-react": "off",

      // Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
