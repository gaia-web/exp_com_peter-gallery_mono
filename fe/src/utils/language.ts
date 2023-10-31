import { signal } from "@preact/signals";

export enum LanguageOptions {
  EN,
  ZH,
}

export const activeLanguage = signal<LanguageOptions>(LanguageOptions.EN);
