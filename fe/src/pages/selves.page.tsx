import { PageProps } from "../utils/page-wrapper";
import { SelvesHeaderView } from "../views/selves-header.view";

export function SelvesPage({routerInfo}: PageProps) {
  return (
    <>
      <SelvesHeaderView routerInfo={routerInfo} />
      <div>
        <p>Selves page</p>
      </div>
    </>
  );
}
