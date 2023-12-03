import { Header } from "../utils/garage";
import { LanguageToggleView } from "./language-toggle.view";
import { PageProps } from "../utils/page-wrapper";
import ReturnButtonView from "./return-button.view";
import { route } from "preact-router";
import { Breadcrumb } from "../utils/fe-utils";

export function ArticleDetailHeaderView({ routerInfo }: PageProps) {
  return (
    <div>
      <Header sticky>
        <span>PETER'S PORTFOLIO</span>
        <div slot="extra">
          <LanguageToggleView />
        </div>
      </Header>
      <Header sticky>
        <ReturnButtonView en="BACK" zh="返回" />
        <Breadcrumb
          path={
            [routerInfo.locationId, routerInfo.articleId] as unknown as (
              | string
              | number
            )[] &
              string
          }
          onItemSelect={({ detail }) => {
            route(`/${routerInfo.lang}/world/${detail.at(-1)}`);
          }}
          delimiter=">"
          class="w-fit mx-auto"
          slot="collapsible"
        ></Breadcrumb>
      </Header>
    </div>
  );
}
