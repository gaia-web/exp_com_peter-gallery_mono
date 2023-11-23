import { PeoplePage } from "./people.page";
import { SearchPage } from "./search.page";
import { PageProps } from "../utils/page-wrapper";

export function ArticleListPage({ routerInfo }: PageProps) {
  if (routerInfo.locationId != null) {
    return <div>Ariticle list page</div>;
  }
  if (routerInfo.people) {
    return <PeoplePage routerInfo={routerInfo} />;
  }
  if (routerInfo.search != null) {
    return <SearchPage routerInfo={routerInfo} />;
  }

  return <div>Something went worong.</div>;
}
