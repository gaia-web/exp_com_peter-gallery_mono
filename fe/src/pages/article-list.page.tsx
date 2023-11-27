import { useEffect } from "preact/hooks";
import { LanguageOptions, activeLanguage } from "../utils/language";
import { useSignal } from "@preact/signals";
import { If } from "../utils/garage";
import { route } from "preact-router";

function ArticleCard(props: {
  id: string;
  pic: string;
  area: { en: string; zh: string };
  country: { en: string; zh: string };
  date: string;
}) {
  const { id, pic, area, country, date } = props;

  return (
    <div>
      <img class="w-100% h-42rem p-1rem hover:cursor-pointer" src={pic} onClick={() => route(`/people/${id}`, true)}/>
      <If condition={LanguageOptions[activeLanguage.value]}>
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

export function ArticleListPage() {
  const cards = useSignal([]);
  const loading = useSignal(true);

  useEffect(() => {
    async function fetchArticle() {
      const data = await fetch("/mock/articles.json").then((response) =>
        response.json()
      );

      cards.value = data.cards;
      loading.value = false;
    }

    fetchArticle();
  }, [activeLanguage.value]);

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
          />
        ))}
      </div>
    </>
  );
}
