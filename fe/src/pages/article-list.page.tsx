import { PeoplePage } from "./people.page";
import { SearchPage } from "./search.page";
import { PageProps } from "../utils/page-wrapper";
import { HeaderView } from "../views/header.view";

export function ArticleListPage({ routerInfo }: PageProps) {
  if (routerInfo.locationId != null) {
    return (
      <>
        <HeaderView routerInfo={routerInfo} />
        <div>Ariticle list page</div>
      </>)
  }
  if (routerInfo.people) {
    return <PeoplePage routerInfo={routerInfo} />;
  }
  if (routerInfo.search != null) {
    return <SearchPage routerInfo={routerInfo} />;
  }

  return <div>Something went worong.</div>;
}
