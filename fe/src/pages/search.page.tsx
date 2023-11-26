import { PageProps } from "../utils/page-wrapper";
import { HeaderView } from "../views/header.view";

export function SearchPage({routerInfo}: PageProps) {
  return (
    <>
      <HeaderView routerInfo={routerInfo} />
      <div>
        <p>Search page</p>
      </div>
    </>
  );
}
