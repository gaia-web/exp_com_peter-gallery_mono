import { If } from "../utils/garage";
import { LanguageOptions, activeLanguage } from "../utils/language";
import { LanguageToggleView } from "../views/language-toggle.view";

import "./home.css";

interface HomePageProps {
  path: string
}

export function HomePage({ path }: HomePageProps) {
  return (
    <>
      {console.log(path)}
      <div>
        <div class="leading-3rem p-10px text-2xl text-center">PETER’S PORTFOLIO.</div>
        <div class="absolute leading-3rem top-0 right-0">
          <LanguageToggleView />
        </div>
        <div
          class="threePics bottom-10 right-10 later"
          style="--animation-delay: 6s;"
        >
          <div class="parent text-5xl">
            <img src="//picsum.photos/1200/800"></img>
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">WORLD</div>
              <div slot="ZH">WORLD 世界</div>
            </If>
          </div>
          <div class="parent text-5xl">
            <img src="//picsum.photos/1200/800"></img>
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">PEOPLE</div>
              <div slot="ZH">PEOPLE 众生</div>
            </If>
          </div>
          <div class="parent text-5xl">
            <img src="//picsum.photos/1200/800"></img>
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">SELVES</div>
              <div slot="ZH">SELVES 我们</div>
            </If>
          </div>
        </div>

        <div
          class="fixed bottom-0 left-0 text-center translate-x-[var(--initial-translate-x)] translate-y-[var(--initial-translate-y)] scale-[var(--initial-scale)] slogan"
          style="--animation-delay: 6s; --initial-translate-x: calc(50vw - 50%); --initial-translate-y: calc(50% - 50vh); --initial-scale: 1.5; --left-offset: 50px; --bottom-offset: 50px;"
        >
          <div
            class="opacity-0 my-2 slogan-text animate-delay-1000 font-size-[2em]"
            style="--inital-animation-delay: 1s; --index: 0;"
          >
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">Human of</div>
              <div slot="ZH">那颗我们所钟爱的</div>
            </If>
          </div>
          <div
            class="opacity-0 my-2 slogan-text animate-delay-2000 font-size-[2em]"
            style="--inital-animation-delay: 1s; --index: 1;"
          >
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">Planet Earth</div>
              <div slot="ZH">蔚蓝星球</div>
            </If>
          </div>
          <div
            class="opacity-0 my-2 bg-#0042ED h-[2px] slogan-text animate-delay-3000"
            style="--inital-animation-delay: 1s; --index: 2;"
          />
          <div
            class="opacity-0 my-2 slogan-text animate-delay-4000 font-size-[1em]"
            style="--inital-animation-delay: 1s; --index: 3;"
          >
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">
                A life-time project of exploring, documenting and understanding
              </div>
              <div slot="ZH">以及，在她之上生生不息的我们</div>
            </If>
          </div>
        </div>
      </div>
    </>
  );
}
