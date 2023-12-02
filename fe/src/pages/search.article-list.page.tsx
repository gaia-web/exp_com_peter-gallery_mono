import { PageProps } from "../utils/page-wrapper";
import { SearchHeaderView } from "../views/search-header";

export function SearchArticleList({ routerInfo }: PageProps) {
  return (
    <>
      <SearchHeaderView />
      <div>
        <text> keyword:{routerInfo.search}</text>
        <p>Search page</p>
      </div>
    </>
  );
}
