import { useEffect, useState } from "preact/compat";
import { Markdown } from "../utils/markdown";
import { LanguageOptions, activeLanguage } from "../utils/language";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";

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

  return (
    <>
      <div class="m-auto max-w-80%">
        <ImageDisplayer imageQueue={imgs.value} />
        <Markdown
          markdown={markdown.value}
          styleSheets={[markdownStyleSheet]}
        />
      </div>
    </>
  );
}

function ImageDisplayer(props: { imageQueue: string[]; height?: number }) {
  const { imageQueue, height } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const maxHeight = height ?? "30vw";

  return (
    <div class={`grid grid-cols-5 gap-5`} style={{ height: maxHeight }}>
      <div class="m-auto  col-span-4">
        <img
          class={`max-w-100% max-h-${maxHeight}`}
          style={{ maxHeight: maxHeight }}
          src={imageQueue[selectedIndex]}
        ></img>
      </div>
      <div class=" col-span-1 overflow-y-auto">
        {imageQueue.map((image, index) => (
          <img
            class="mb-5% max-w-100%"
            src={image}
            onClick={() => setSelectedIndex(index)}
          ></img>
        ))}
      </div>
    </div>
  );
}
