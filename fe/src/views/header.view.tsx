import { Header, If } from "../utils/garage";
import { LanguageToggleView } from "./language-toggle.view";
import { route, useRouter } from "preact-router";
import { Tab, Tabs } from "../utils/fe-utils";
import { useState } from "preact/hooks";

const selectClass = (input: string): { class: string; selected: boolean } => {
  const baseClass = `rounded-xl p-1rem`;

  if (window.location.pathname.includes(input)) {
    return { class: `bg-#0046FF font-normal ${baseClass}`, selected: true };
  } else {
    return { class: baseClass, selected: false };
  }
};

const getRoute = (input: string) => {
  if (input === "世界") return "world";
  if (input === "众生") return "people";
  if (input === "我们") return "selves";

  return input;
};

export function HeaderView() {
  const [router] = useRouter();
  const languageLabel = router.matches?.lang?.toUpperCase();

  const [_, setPath] = useState(window.location.pathname);

  const Options = (props: { en: string; zh: string }) => {
    const { en, zh } = props;
    return (
      <Tab class={selectClass(en).class} selected={selectClass(en).selected}>
        <If condition={languageLabel}>
          <div slot="EN">{en.toUpperCase()}</div>
          <div slot="ZH">{zh}</div>
        </If>
      </Tab>
    );
  };

  return (
    <div>
      <Header sticky>
        <span>PETER'S PORTFOLIO</span>

        <div slot="extra">
          <LanguageToggleView />
        </div>
      </Header>

      <Header sticky>
        <span>Search Bar Place holder</span>

        <div slot="extra">
          <Tabs
            class="bg-#3F434C rounded-xl "
            onTabChange={(e) => {
              const newRoute = `/${getRoute(e.detail.toLowerCase())}`;
              route(newRoute);
              setPath(newRoute);
            }}
          >
            <Options en="world" zh="世界" />
            <Options en="people" zh="众生" />
            <Options en="selves" zh="我们" />
          </Tabs>
        </div>
      </Header>
    </div>
  );
}
