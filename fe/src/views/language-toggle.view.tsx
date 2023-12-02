import { useRouter } from "preact-router";
import { Tab, Tabs } from "../utils/fe-utils";
import { LanguageOptions } from "../utils/language";

const tabDefinitions = {
  [LanguageOptions.ZH]: "中",
  [LanguageOptions.EN]: "EN",
};

export function LanguageToggleView() {
  const [router, routeTo] = useRouter();
  const languageKey = router.matches?.lang?.toUpperCase() ?? "";
  const value = LanguageOptions[languageKey as keyof typeof LanguageOptions];
  return (
    <Tabs
      className="w-fit"
      value={`${value}`}
      onTabChange={(e) => {
        const newValue = +e.detail satisfies LanguageOptions;
        // TODO fix in the lib
        if (value === newValue) return;
        setTimeout(() => {
          const urlParts = router.url.split("/");
          urlParts[1] = LanguageOptions[newValue]?.toLowerCase();
          const newUrl = urlParts.join("/");
          routeTo(newUrl);
        });
      }}
    >
      {Object.entries(tabDefinitions).map(([value, content]) => (
        <Tab value={`${value}`}>{content}</Tab>
      ))}
    </Tabs>
  );
}
