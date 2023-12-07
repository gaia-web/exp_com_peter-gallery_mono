import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { route } from "preact-router";
import { WorldHeaderView } from "../views/world-header.view";
import { If } from "../utils/garage";
import { Item } from "../utils/fe-utils";

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
    <Item
      class="cursor-pointer gap-3 m-3"
      orientation="vertical"
      onClick={() => route(`/${languageLabel}/article/${locationId}/${id}`)}
    >
      <img slot="start" class="w-full aspect-ratio-[3/2]" src={pic} />
      <If condition={languageLabel}>
        <div slot="EN">
          {area.en}, {country.en}
        </div>
        <div slot="ZH">
          {area.zh}, {country.zh}
        </div>
      </If>
      <div slot="end">{date}</div>
    </Item>
  );
}
