import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { route } from "preact-router";
import { WorldHeaderView } from "../views/world-header.view";
import { If } from "../utils/garage";

export function GeoArticleList({ routerInfo }: PageProps) {
  const cards = useSignal([]);
  const loading = useSignal(true);
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";
  const locationId = (routerInfo.locationId as string) ?? "";

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
      <div class="grid grid-cols-2 gap-1 pl-10vw pr-10vw">
        {cards.value.map(({ id, pic, area, country, date }) => (
          <GeoCard
            id={id}
            pic={pic}
            area={area}
            country={country}
            date={date}
            languageLabel={languageLabel}
            locationId={locationId}
          />
        ))}
      </div>
    </>
  );
}

export function GeoCard(props: {
  id: string;
  pic: string;
  area: { en: string; zh: string };
  country: { en: string; zh: string };
  date: string;
  languageLabel: string;
  locationId: string;
}) {
  const { id, pic, area, country, date, languageLabel, locationId } = props;

  return (
    <div>
      <img
        class="w-100% h-42rem p-1rem hover:cursor-pointer"
        src={pic}
        onClick={() =>
          route(`/${languageLabel}/article/${locationId}/${id}`)
        }
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
