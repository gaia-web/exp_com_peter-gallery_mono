import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { PeopleHeaderView } from "../views/people-header.view";
import { route } from "preact-router";
import { If } from "../utils/garage";

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
      <div class="w-100% text-center text-5xl pl-15vw pr-15vw text-left mt-5rem mb-5rem">
        重要的是你能否从这个充满不确定性的世界中, 选择你想要相信, 并坚持的一切。
      </div>
      <div class="w-100% text-center mt-5rem mb-5rem">2012.12.12 ｜ 城市 国家</div>
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

function PeopleCard(props: {
  id: string;
  pic: string;
  area: { en: string; zh: string };
  country: { en: string; zh: string };
  date: string;
  languageLabel: string;
  city: { en: string; zh: string };
  content: { en: string; zh: string };
}) {
  const { id, pic, area, country, date, languageLabel, city, content } = props;

  return (
    <div>
      <div class="relative">
        <div class="absolute p-1rem text-center w-100%">
          <If condition={languageLabel}>
            <div class="pl-1rem" slot="EN">
              {content.en}
            </div>
            <div class="pl-1rem" slot="ZH">
              {content.zh}
            </div>
          </If>
        </div>
        <div class="absolute p-1rem bottom-0 text-center w-100%">
          <If condition={languageLabel}>
            <div class="pl-1rem" slot="EN">
              {country.en},{city.en}
            </div>
            <div class="pl-1rem" slot="ZH">
              {country.zh},{city.zh}
            </div>
          </If>
        </div>
        <img
          class="w-100% h-42rem p-1rem hover:cursor-pointer"
          src={pic}
          onClick={() => route(`/${languageLabel}/article/${id}`, true)}
        />
      </div>
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
