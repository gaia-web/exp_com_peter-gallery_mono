import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";

export function PeoplePage({ routerInfo }: PageProps) {
  const markdown = useSignal("");

  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";

  useEffect(() => {
    async function fetchArticle() {
      const articleDefinition = await fetch("/mock/article.json").then(
        (response) => response.json()
      );
      markdown.value = await fetch(
        articleDefinition.content[languageLabel.toLowerCase()]
      ).then((response) => response.text());
    }

    fetchArticle();
  }, [languageLabel]);

  return (
    <>
      <Markdown markdown={markdown.value} styleSheets={[markdownStyleSheet]} />
    </>
  );
}
