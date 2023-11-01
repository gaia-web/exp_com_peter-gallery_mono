import { Header, If, Nav, NavItem } from "../utils/garage";
import { LanguageOptions, activeLanguage } from "../utils/language";
import { LanguageToggleView } from "./language-toggle.view";
import { route } from "preact-router";
import { startViewTransition } from "../utils/start-view-transition";

export function HeaderView() {
  return (
    <Header sticky>
      <span>
        <If condition={LanguageOptions[activeLanguage.value]}>
          <h3 slot="EN">Peter's Gallery</h3>
          <h3 slot="ZH">皮特的美术馆</h3>
        </If>
      </span>
      <Nav slot="collapsible" data-native>
        <NavItem onClick={() => startViewTransition(() => route("/"))}>
          <If condition={LanguageOptions[activeLanguage.value]}>
            <div slot="EN">Home</div>
            <div slot="ZH">主页</div>
          </If>
        </NavItem>
        <NavItem onClick={() => startViewTransition(() => route("/world"))}>
          <If condition={LanguageOptions[activeLanguage.value]}>
            <div slot="EN">World</div>
            <div slot="ZH">世界</div>
          </If>
        </NavItem>
        <NavItem onClick={() => startViewTransition(() => route("/people"))}>
          <If condition={LanguageOptions[activeLanguage.value]}>
            <div slot="EN">People</div>
            <div slot="ZH">众生</div>
          </If>
        </NavItem>
        <NavItem onClick={() => startViewTransition(() => route("/selves"))}>
          <If condition={LanguageOptions[activeLanguage.value]}>
            <div slot="EN">Selves</div>
            <div slot="ZH">我们</div>
          </If>
        </NavItem>
        <NavItem onClick={() => startViewTransition(() => route("/other"))}>
          <If condition={LanguageOptions[activeLanguage.value]}>
            <div slot="EN">Other</div>
            <div slot="ZH">其它</div>
          </If>
        </NavItem>
      </Nav>
      <div slot="extra">
        <LanguageToggleView />
      </div>
    </Header>
  );
}
