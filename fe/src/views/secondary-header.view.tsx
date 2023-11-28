import { Header, If } from "../utils/garage";
import { LanguageToggleView } from "./language-toggle.view";
import { route } from "preact-router";
import { Tab, Tabs } from "../utils/fe-utils";
import { PageProps } from "../utils/page-wrapper";
import { useState } from "preact/hooks";
import ReturnButtonView from './return-button.view'

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
  if (input === "people") return "article?people=1";
  if (input === "selves") return "selves";

  return input;
};

export function SecondaryHeaderView({ routerInfo }: PageProps) {

  const [inputResearchValue, setInputResearchValue] = useState<string>('');
  const [rightSideNavbarValue, setRightSideNavbarValue] = useState<boolean>(false);

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
    if (e.key === 'Enter') {
      route(`/${routerInfo.lang}/article?search=${encodeURIComponent(inputResearchValue)}`);
    }
  };

  const checkHeaderInputVisibility = () => {
    console.log(routerInfo)
    if (routerInfo.path === '/:lang/world') {
      return true;
    } else if (routerInfo.path === '/:lang/selves') {
      return true;
    }

    if (routerInfo?.matches != undefined) {
      if (Object.keys(routerInfo.matches as {}).includes('people')) {
        return true;
      }
      else if (Object.keys(routerInfo.matches as {}).includes('locationId')) {
        return true;
      }
      else if (Object.keys(routerInfo.matches as {}).includes('search')) {
        setRightSideNavbarValue(true)
      }
    }

    else if (routerInfo.path === '/:lang/world/:area') {
      return false;
    }


  }


  return (
    <div>
      <Header sticky>
        <span>PETER'S PORTFOLIO</span>
        <div slot="extra">
          <LanguageToggleView />
        </div>
      </Header>

      <Header sticky >
        <input
          placeholder="search"
          style={{ display: checkHeaderInputVisibility() ? 'block' : 'none' }}
          type="text"
          value={inputResearchValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        ></input>


        {/* TODO breadcrumb doesn't work */}
        {/* <div
          style={{ display: checkHeaderInputVisibility() ? 'none' : 'block' }}
          slot="collapsible">
          <Breadcrumb path="[1,2,3,4]"></Breadcrumb>
        </div> */}

        <ReturnButtonView/>

        <div slot="extra" style={{ display: rightSideNavbarValue ? 'none' : 'block' }}>
          <Tabs
            class="bg-#3F434C rounded-xl "
            onTabChange={(e) => {
              const newRoute = `/${languageLabel?.toLocaleLowerCase()}/${getRoute(
                e.detail.toLowerCase()
              )}`;
              route(newRoute);
            }}
          >
            <Options en="world" zh="世界" />
            <Options en="people" zh="众生" />
            <Options en="selves" zh="我们" />
          </Tabs>
        </div>
      </Header>
    </div >
  );
}
