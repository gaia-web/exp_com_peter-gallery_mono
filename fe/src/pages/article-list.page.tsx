import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { If } from "../utils/garage";
import { route } from "preact-router";
import { PageProps } from "../utils/page-wrapper";
import { ArticleListHeaderView } from "../views/article-list-header.view";
import { GeoArticleList } from "./geo.article-list.page";
import { PeopleArticleList } from "./people.article-list.page";
import { SearchArticleList } from "./search.article-list.page";

export function ArticleListPage({ routerInfo }: PageProps) {
  if (routerInfo.location != null) {
    return <GeoArticleList routerInfo={routerInfo}></GeoArticleList>;
  }

  if (routerInfo.search) {
    return <SearchArticleList routerInfo={routerInfo} />;
  }

  return <PeopleArticleList routerInfo={routerInfo} />;
}

export function GeoCard(props: {
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
        onClick={() => route(`/${languageLabel}/article/${id}`, true)}
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

export function PeopleCard(props: {
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
        <div class="absolute p-1rem">
          <If condition={languageLabel}>
            <div class="pl-1rem" slot="EN">
              {content.en}
            </div>
            <div class="pl-1rem" slot="ZH">
              {content.zh}
            </div>
          </If>
        </div>
        <div class="absolute p-1rem bottom-0 text-center">
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
