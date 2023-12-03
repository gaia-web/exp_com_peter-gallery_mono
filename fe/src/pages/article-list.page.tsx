// import { SearchArticleList } from "./search.article-list.page";
// import { PageProps } from "../utils/page-wrapper";
// import { GeneralArticleList } from "./general.article-list.page";
// import { PeopleArticleList } from "./people.article-list.page";

// export function ArticleListPage({ routerInfo }: PageProps) {
//   if (routerInfo.locationId != null) {
//     return <GeneralArticleList routerInfo={routerInfo}></GeneralArticleList>;
//   }
//   if (routerInfo.people) {
//     return <PeopleArticleList routerInfo={routerInfo} />;
//   }
//   if (routerInfo.search) {
//     return <SearchArticleList routerInfo={routerInfo} />;
//   }
//   // TODO better to fall back to to the fallback or 404 page
//   return <div>Something went worong.</div>;
// }

import { useEffect } from "preact/hooks";
import { LanguageOptions } from "../utils/language";
import { useSignal } from "@preact/signals";
import { If } from "../utils/garage";
import { route } from "preact-router";
import { PageProps } from "../utils/page-wrapper";

function ArticleCard(props: {
  id: string;
  pic: string;
  area: { en: string; zh: string };
  country: { en: string; zh: string };
  date: string;
  languageLabel: string;
}) {
  const { id, pic, area, country, date, languageLabel } = props;

  return (
    <div>
      <img
        class="w-100% h-42rem p-1rem hover:cursor-pointer"
        src={pic}
        onClick={() => route(`/people/${id}`, true)}
      />
      <If condition={languageLabel}>
        <div class="pl-1rem" slot="EN">
          {area.en}, {country.en}
        </div>
        <div class="pl-1rem" slot="ZH">
          {area.zh}, {country.zh}
        </div>
      </If>
      <div class="pl-1rem">{date}</div>
    </div>
  );
}

export function ArticleListPage({ routerInfo }: PageProps) {
  const cards = useSignal([]);
  const loading = useSignal(true);
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";

  useEffect(() => {
    async function fetchArticle() {
      const data = await fetch("/mock/articles.json").then((response) =>
        response.json()
      );

      cards.value = data.cards;
      loading.value = false;
    }

    fetchArticle();
  }, [languageLabel]);

  if (loading.value) {
    return <></>;
  }

  return (
    <>
      <div class="grid grid-cols-2 gap-1 pl-10vw pr-10vw">
        {cards.value.map(({ id, pic, area, country, date }) => (
          <ArticleCard
            id={id}
            pic={pic}
            area={area}
            country={country}
            date={date}
            languageLabel={languageLabel}
          />
        ))}
      </div>
    </>
  );
}
