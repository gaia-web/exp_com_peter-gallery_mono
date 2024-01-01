import { PageProps } from "../utils/page-wrapper";
import { SelvesHeaderView } from "../views/selves-header.view";

export function SelvesPage({ routerInfo }: PageProps) {
  return (
    <>
      <SelvesHeaderView routerInfo={routerInfo} />
      <div class="grid grid-cols-8 gap-1 pl-10vw pr-10vw">
        <p class="col-span-5">Selves page</p>
        <div class="col-span-3">
          <img class="w-full rounded-3xl" src="//picsum.photos/seed/any/800/800" />
          <div class="flex justify-between m-1rem">
            <img src="/icons/Facebook.svg"/>
            <img src="/icons/Twitter.svg"/>
            <img src="/icons/Linkedin.svg"/>
            <img src="/icons/Wechat.svg"/>
            <img src="/icons/Weboo.svg"/>
          </div>
        </div>
      </div>
    </>
  );
}
