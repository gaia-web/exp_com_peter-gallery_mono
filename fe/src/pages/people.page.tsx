import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import { LanguageOptions, activeLanguage } from "../utils/language";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";

export function PeoplePage() {
  const markdown = useSignal("");

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
    }

    fetchArticle();
  }, [activeLanguage.value]);

  return (
    <>
      <Markdown markdown={markdown.value} styleSheets={[markdownStyleSheet]} />
    </>
  );
}
