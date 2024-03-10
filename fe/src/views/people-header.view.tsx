import { Header, If } from "../utils/garage";
import { LanguageToggleView } from "./language-toggle.view";
import { route } from "preact-router";
import { Tab, Tabs } from "../utils/fe-utils";
import { PageProps } from "../utils/page-wrapper";
import { useState } from "preact/hooks";
import { startViewTransition } from "../utils/start-view-transition";

const selectClass = (input: string): { class: string; selected: boolean } => {
  const baseClass = `rounded-xl p-1rem`;
  if (window.location.pathname.includes(input)) {
    return { class: `bg-#0046FF font-normal ${baseClass}`, selected: true };
  } else {
    return { class: baseClass, selected: false };
  }
};
const getRoute = (input: string) => {
  if (input === "world") return "world";
  if (input === "people") return "article";
  if (input === "selves") return "selves";
  return input;
};

export function PeopleHeaderView({ routerInfo }: PageProps) {
  const [inputResearchValue, setInputResearchValue] = useState<string>("");
  const languageLabel = routerInfo.lang?.toUpperCase();
  const Options = (props: { en: string; zh: string }) => {
    const { en, zh } = props;
    return (
      <Tab
        value={en}
        class={selectClass(en).class}
        selected={selectClass(en).selected}
      >
        <If condition={languageLabel}>
          <div slot="EN">{en.toUpperCase()}</div>
          <div slot="ZH">{zh}</div>
        </If>
      </Tab>
    );
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setInputResearchValue(target.value);
  };

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      route(
        `/${routerInfo.lang}/article?search=${encodeURIComponent(
          inputResearchValue
        )}`
      );
    }
  };

  return (
    <div class="pl-2 pr-2 lg:pl-24 lg:pr-24">
      <Header sticky>
        <span>PETER'S PORTFOLIO</span>
        <div slot="extra">
          <LanguageToggleView />
        </div>
      </Header>
      <div class="hidden md:block">
        <Header sticky >
          <div>
            <span class="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </span>
            <input
              placeholder="search"
              type="text"
              value={inputResearchValue}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              style={{
                border: 0,
                backgroundColor: "#000",
                fontSize: "1.2rem",
                width: "50%",
                color: "#fff",
              }}
            ></input>
          </div>
          <div slot="extra">
            <Tabs
              class="bg-#3F434C rounded-xl"
              onTabChange={(e) => {
                const newRoute = `/${languageLabel?.toLocaleLowerCase()}/${getRoute(
                  e.detail.toLowerCase()
                )}`;
                startViewTransition(() => {
                  route(newRoute);
                });
              }}
            >
              <Options en="world" zh="世界" />
              <Options en="people" zh="众生" />
              <Options en="selves" zh="我们" />
            </Tabs>
          </div>
        </Header>
      </div>
    </div>
  );
}
