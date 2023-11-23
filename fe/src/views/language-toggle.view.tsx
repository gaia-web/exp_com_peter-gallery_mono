import { Tab, Tabs } from "../utils/fe-utils";
import { LanguageOptions, activeLanguage } from "../utils/language";

export function LanguageToggleView() {
  return (
    <Tabs
      className="w-fit"
      value={`${activeLanguage.value}`}
      onTabChange={(e) => {
        const value = +e.detail satisfies LanguageOptions;
        activeLanguage.value = value;
      }}
    >
      <Tab value={`${LanguageOptions.EN}`}>English</Tab>
      <Tab value={`${LanguageOptions.ZH}`}>中文</Tab>
    </Tabs>
  );
}
