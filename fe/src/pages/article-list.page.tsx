import { SearchArticleList } from "./search.article-list.page";
import { PageProps } from "../utils/page-wrapper";
import { GeneralArticleList } from "./general.article-list.page";
import { PeopleArticleList } from "./people.article-list.page";

export function ArticleListPage({ routerInfo }: PageProps) {
  if (routerInfo.locationId != null) {
    return (
      <>
        <GeneralArticleList routerInfo={routerInfo}></GeneralArticleList>
      </>)
  }
  if (routerInfo.people) {
    return <PeopleArticleList routerInfo={routerInfo} />;
  }
  if (routerInfo.search != null) {
    return <SearchArticleList/>;
  }

  return <div>Something went worong.</div>;
}
