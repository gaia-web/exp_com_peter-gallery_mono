import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { PeopleHeaderView } from "../views/people-header.view";
import { PeopleCard } from "./article-list.page";

export function PeopleArticleList({ routerInfo }: PageProps) {
  const cards = useSignal([]);
  const loading = useSignal(true);
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";

  useEffect(() => {
    async function fetchArticle() {
      const data = await fetch("/mock/articles-people.json").then((response) =>
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
      <PeopleHeaderView routerInfo={routerInfo} />
      <div class="grid grid-cols-2 gap-1 pl-10vw pr-10vw">
        {cards.value.map(({ id, pic, area, country, city, content, date }) => (
          <PeopleCard
            id={id}
            pic={pic}
            area={area}
            country={country}
            date={date}
            languageLabel={languageLabel}
            city={city}
            content={content}
          />
        ))}
      </div>
    </>
  );
}
