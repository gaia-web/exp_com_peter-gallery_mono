import { PageProps } from "../utils/page-wrapper";
import { GeoArticleList } from "./geo.article-list.page";
import { PeopleArticleList } from "./people.article-list.page";
import { SearchArticleList } from "./search.article-list.page";

export function ArticleListPage({ routerInfo }: PageProps) {
  if (routerInfo.locationId != null) {
    return <GeoArticleList routerInfo={routerInfo}></GeoArticleList>;
  }

  if (routerInfo.search || routerInfo.search === "") {
    return <SearchArticleList routerInfo={routerInfo} />;
  }

  return <PeopleArticleList routerInfo={routerInfo} />;
}
