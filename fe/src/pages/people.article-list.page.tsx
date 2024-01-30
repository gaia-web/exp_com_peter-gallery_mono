import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { PeopleHeaderView } from "../views/people-header.view";
import { route } from "preact-router";
import { If } from "../utils/garage";

export function PeopleArticleList({ routerInfo }: PageProps) {
  const cards = useSignal([]);
  const slogan = useSignal("");
  const city = useSignal("");
  const country = useSignal("");
  const date = useSignal("");
  const loading = useSignal(true);
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";

  useEffect(() => {
    async function fetchArticle() {
      const sloganData = await fetch(
        `https://gaia.web.mooo.com/api/article-list-page-slogans?locale=${languageLabel.toLowerCase()}`
      ).then((response) => {
        return response.json();
      });

      const data = await fetch(
        `https://gaia.web.mooo.com/api/articles?locale=${languageLabel.toLowerCase()}&filters[article_type][name][$eq]=people&populate[imageList][cover]=* `
      ).then(
        // const data = await fetch("/mock/articles-people.json").then(
        (response) => {
          return response.json();
        }
      );

      console.log({ data });
      console.log({ languageLabel });

      cards.value = data.data;
      slogan.value = sloganData.data[0].attributes.slogan;
      city.value = sloganData.data[0].attributes.city;
      country.value = sloganData.data[0].attributes.country;
      date.value = sloganData.data[0].attributes.date;
      loading.value = false;
    }

    fetchArticle();
  }, [languageLabel]);

  if (loading.value) {
    return <></>;
  }

  console.log({ slogan });
  console.log(cards.value);

  return (
    <>
      <PeopleHeaderView routerInfo={routerInfo} />
      <div class="w-100% text-center text-5xl pl-15vw pr-15vw text-left mt-5rem mb-5rem">
        {slogan}
      </div>
      <div class="w-100% text-center mt-5rem mb-5rem">
        {date} ｜ {city} {country}
      </div>
      <div class="grid grid-cols-2 gap-1 pl-10vw pr-10vw">
        {cards.value.map(({ attributes }: any) => {
          console.log({ attributes });
          return (
            <PeopleCard
              id={attributes.id}
              pic={`https://gaia.web.mooo.com${attributes.imageList.data[0].attributes.formats.thumbnail.url}`}
              area={attributes.title}
              languageLabel={languageLabel}
              content={attributes.content}
              // location={}
            />
          );
        })}
      </div>
    </>
  );
}

function PeopleCard(props: {
  id: string;
  pic: string;
  area: string;
  languageLabel: string;
  content: string;
  // location:string;
}) {
  const {
    id,
    pic,
    area,
    languageLabel,
    content,
    // location,
  } = props;

  return (
    <div>
      <div class="relative">
        <div class="absolute p-1rem text-center w-100%">{contentLimiter(content)}</div>
        <div class="absolute p-1rem bottom-0 text-center w-100%">
          {area}
        </div>
        <img
          class="w-100% h-42rem p-1rem hover:cursor-pointer"
          src={pic}
          onClick={() =>
            route(
              `/${languageLabel}/article/${location}/${id}?fromPeople=1`,
              true
            )
          }
        />
      </div>
    </div>
  );
}

function contentLimiter(content: string) {
  return `${content.substring(0, 60)}...`
}
