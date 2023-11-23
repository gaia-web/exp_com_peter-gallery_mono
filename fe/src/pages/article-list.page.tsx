import { PeoplePage } from "./people.page";
import { SearchPage } from "./search.page";
import { PageProps } from "../utils/page-wrapper";

export function ArticleListPage(props: PageProps) {
  if (props.routerInfo.locationId != null) {
    return <div>Ariticle list page</div>;
  }
  if (props.routerInfo.people) {
    return <PeoplePage />;
  }
  if (props.routerInfo.search != null) {
    return <SearchPage />;
  }

  return <div>Something went worong.</div>;
}
