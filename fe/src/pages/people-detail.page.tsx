import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import { LanguageOptions, activeLanguage } from "../utils/language";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";
import { If } from "../utils/garage";

export function PeopleDetailPage() {
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
      <div class="m-auto max-w-80%">
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
        <ImageDisplayer imageQueue={imgs.value} />
        <Markdown
          markdown={markdown.value}
          styleSheets={[markdownStyleSheet]}
        />
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

function ImageDisplayer(props: { imageQueue: string[]; height?: number }) {
  const { imageQueue, height } = props;
  const selectedIndex = useSignal(0);

  const maxHeight = height ?? "30vw";

  return (
    <div class={`grid grid-cols-5 gap-5`} style={{ height: maxHeight }}>
      <div class="m-auto  col-span-4">
        <img
          class={`max-w-100% max-h-${maxHeight}`}
          style={{ maxHeight: maxHeight }}
          src={imageQueue[selectedIndex.value]}
        ></img>
      </div>
      <div class=" col-span-1 overflow-y-auto">
        {imageQueue.map((image, index) => (
          <img
            class="mb-5% max-w-100%"
            src={image}
            onClick={() => (selectedIndex.value = index)}
          ></img>
        ))}
      </div>
    </div>
  );
}
