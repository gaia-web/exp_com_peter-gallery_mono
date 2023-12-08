import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { PageProps } from "../utils/page-wrapper";
import { SearchHeaderView } from "../views/search-header";
import { route } from "preact-router";
import { If } from "../utils/garage";

export function SearchArticleList({ routerInfo }: PageProps) {
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
      <SearchHeaderView />
      <div class="pl-10vw pr-10vw">
        <div
          contentEditable
          class="ml-10rem mr-10rem mt-5rem mb-5rem border-solid p-2rem rounded-lg focus:outline-none"
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              route(
                `/${languageLabel}/article?search=${
                  (e.target as any).innerText
                }`,
                true
              );

              e.preventDefault();
            }
          }}
        >
          {" "}
          {routerInfo.search}
        </div>
        {cards.value.map(({ id, content, date }, index) => {
          return (
            <SearchCard
              id={id}
              pic={`//picsum.photos/seed/${routerInfo.search}${index}/1200/800`}
              date={date}
              languageLabel={languageLabel}
              content={content}
            />
          );
        })}
      </div>
    </>
  );
}

function SearchCard(props: {
  id: string;
  pic: string;
  date: string;
  languageLabel: string;
  content: { en: string; zh: string };
}) {
  const { id, pic, date, languageLabel, content } = props;

  return (
    <div class="grid grid-cols-8 w-100% gap-1 mb-4rem">
      <img
        class="col-span-3 w-100% hover:cursor-pointer"
        src={pic}
        onClick={() => route(`/${languageLabel}/article/${id}`)}
      />
      <div class="col-span-3 w-100% text-center">
        <If condition={languageLabel}>
          <div slot="EN">{content.en}</div>
          <div slot="ZH">{content.zh}</div>
        </If>
      </div>
      <div class="col-span-2 w-100% text-center">{date}</div>
    </div>
  );
}
