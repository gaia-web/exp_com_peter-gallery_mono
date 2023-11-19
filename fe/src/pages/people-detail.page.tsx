import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import { LanguageOptions, activeLanguage } from "../utils/language";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";
import { Carousel, If } from "../utils/garage";
import { route } from "preact-router";

export function PeopleDetailPage() {
  const toPage = (nextPage: string) => {
    return route(`/people/${nextPage}`, true);
  };

  const markdown = useSignal("");
  const imgs = useSignal([]);

  useEffect(() => {
    async function fetchArticle() {
      const articleDefinition = await fetch("/mock/article.json").then(
        (response) => response.json()
      );
      markdown.value = await fetch(
        articleDefinition.content[
          LanguageOptions[activeLanguage.value].toLowerCase()
        ]
      ).then((response) => response.text());
      imgs.value = articleDefinition.imgLinks;
    }

    fetchArticle();
  }, [activeLanguage.value]);

  if (!markdown.value) {
    return <></>;
  }

  const path = window.location.pathname.split("/").filter((p) => !!p);

  return (
    <>
      <div class="m-x-10%">
        <div class="flex h-3rem leading-3rem mb-2rem">
          <div class="absolute">
            <BackButton en="BACK" zh="返回" />
          </div>
          <div class="w-100% text-center">
            {path.map((p, index) => (
              <span>
                {p} {!index ? "/ " : ""}
              </span>
            ))}
          </div>
        </div>
        <Carousel>
          {imgs.value.map((img, index) => (
            <img src={img} alt={`${index}`} style="object-fit: contain" />
          ))}
        </Carousel>
        <Markdown
          class="p-y-0"
          markdown={markdown.value}
          styleSheets={[markdownStyleSheet]}
        />
        <div class="m-1rem h-1px bg-#FFFFFF" />
        <div class="flex m-1rem">
          <div
            class="flex hover:bg-#FFFFFF hover:cursor-pointer"
            onClick={() => {
              // TODO: change it to last index
              toPage("last");
            }}
          >
            <div>{"<-"}</div>
            <If condition={LanguageOptions[activeLanguage.value]}>
              <div slot="EN">LAST</div>
              <div slot="ZH">上一篇</div>
            </If>
          </div>
          <div class="flex-1">
            <div
              class="float-right flex hover:bg-#FFFFFF hover:cursor-pointer"
              onClick={() => {
                // TODO: change it to next index
                toPage("next");
              }}
            >
              <If condition={LanguageOptions[activeLanguage.value]}>
                <div slot="EN">NEXT</div>
                <div slot="ZH">下一篇</div>
              </If>
              <div>{"->"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BackButton(props: { en: string; zh: string }) {
  const { en, zh } = props;

  const styleClass = "w-6rem text-center bg-#3F434D rounded-lg";

  return (
    <If condition={LanguageOptions[activeLanguage.value]}>
      <div slot="EN" class={styleClass}>
        {en}
      </div>
      <div slot="ZH" class={styleClass}>
        {zh}
      </div>
    </If>
  );
}
