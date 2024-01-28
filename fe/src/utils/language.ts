import { useRouter } from "preact-router";

// TODO improve this enum
export enum LanguageOptions {
  EN,
  ZH,
}

// TODO bring back signals
export function getLocale(){
  const [router, _] = useRouter();
  const languageKey = router.matches?.lang?.toUpperCase() ?? "";

  return languageKey;
}
