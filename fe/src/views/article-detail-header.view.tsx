import { Header } from "../utils/garage";
import { LanguageToggleView } from "./language-toggle.view";
// import { PageProps } from "../utils/page-wrapper";
import ReturnButtonView from "./return-button.view";
import { route } from "preact-router";
import { Breadcrumb } from "../utils/fe-utils";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

export function ArticleDetailHeaderView({ routerInfo, date }: any) {
  const toPage = (nextPage: string) => {
    return route(`${nextPage}`);
  };

  
  const routerDetails = useSignal<any>({});
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";
  const continentName = useSignal("");
  useEffect(() => {
    async function fetchArticle() {
      const countryInfo = await fetch(
        `http://127.0.0.1:1337/api/countries/7?populate[continent]=*&populate[localizations]=*`
      ).then((response) => {
        return response.json();
      });



      routerDetails.value = countryInfo.data.attributes;
      continentName.value = routerDetails.value.continent.data.attributes.continentName;
      
      console.log( routerDetails.value)
      // console.log(routerDetails.value.continent.data.attributes.continentName)
    }

    fetchArticle();
  }, [languageLabel]);

  return (
    <div>
      <Header sticky>
        <span
          onClick={() => {
            toPage("/");
          }}
        >
          PETER'S PORTFOLIO
        </span>
        <div slot="extra">
          <LanguageToggleView />
        </div>
      </Header>
      <Header sticky>
        <ReturnButtonView en="BACK" zh="返回" />
        <Breadcrumb
          // path={
          //   [routerInfo.locationId, routerInfo.articleId] as unknown as (
          //     | string
          //     | number
          //   )[] &
          //     string
          // }

          // TODO: 这里people要适配 中英切换
          path={
            ["People",continentName.value, routerDetails.value.countryName,date.replace(/-/g, ".")] as unknown as (
              | string
              | number
            )[] &
              string
          }
          onItemSelect={({ detail }) => {
            route(`/${routerInfo.lang}/world/${detail.at(-1)}`);
          }}
          delimiter="/"
          class="w-fit mx-auto"
          slot="collapsible"
        ></Breadcrumb>
      </Header>
    </div>
  );
}
