import { PageProps } from "../utils/page-wrapper";
import { HeaderView } from "../views/header.view";

export function SearchPage(_props: PageProps) {
  return (
    <>
      <HeaderView routerInfo={_props} />
      <div>
        <p>Search page</p>
      </div>
    </>
  );
}
