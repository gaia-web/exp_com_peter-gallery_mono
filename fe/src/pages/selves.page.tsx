import { PageProps } from "../utils/page-wrapper";
import { HeaderView } from "../views/header.view";

export function SelvesPage({routerInfo}: PageProps) {
  return (
    <>
      <HeaderView routerInfo={routerInfo} />
      <div>
        <p>Selves page</p>
      </div>
    </>
  );
}
