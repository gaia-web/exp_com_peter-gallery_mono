import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { Link } from "preact-router";
import { WorldHeaderView } from "../views/world-header.view";
import { ArticleListHeaderView } from "../views/article-list-header.view";
import { GeoCard } from "./article-list.page";

export function GeoArticleList({ routerInfo }: PageProps) {
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
      <WorldHeaderView routerInfo={routerInfo} />
      {/* <ArticleListHeaderView routerInfo={routerInfo} /> */}
      <div class="grid grid-cols-2 gap-1 pl-10vw pr-10vw">
        {cards.value.map(({ id, pic, area, country, date }) => (
          <GeoCard
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
