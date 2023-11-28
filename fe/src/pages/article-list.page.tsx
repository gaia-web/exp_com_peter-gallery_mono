import { PeoplePage } from "./people.page";
import { SearchPage } from "./search.page";
import { PageProps } from "../utils/page-wrapper";
import { WorldHeaderView } from "../views/world-header.view";
import { Link } from 'preact-router/match';

export function ArticleListPage({ routerInfo }: PageProps) {
  if (routerInfo.locationId != null) {
    return (
      <>
        {/* general article list  */}
        <WorldHeaderView routerInfo={routerInfo} />

        {console.log(routerInfo)}
        {console.log(routerInfo?.locationId)}
        <div>Ariticle list page</div>
        <br />
        <Link href={`/en/article/${routerInfo?.locationId}/1`}>
          <div>this is the article 1</div>
        </Link>
      </>)
  }
  if (routerInfo.people) {
    // people article list 
    return <PeoplePage routerInfo={routerInfo} />;
  }
  if (routerInfo.search != null) {
    return <SearchPage routerInfo={routerInfo} />;
  }

  return <div>Something went worong.</div>;
}
