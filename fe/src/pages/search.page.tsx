import { PageProps } from "../utils/page-wrapper";
import { SearchHeaderView } from "../views/search-header";

export function SearchPage({routerInfo}: PageProps) {
  return (
    <>
      <SearchHeaderView/>
      <div>
        <p>Search page</p>
      </div>
    </>
  );
}
