import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";
import { useRouter } from "preact-router";

export function PeoplePage() {
  const markdown = useSignal("");

  const [router] = useRouter();
  const languageLabel = router.matches?.lang?.toUpperCase() ?? "";

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
  }, [router.url]);

  return (
    <>
      <Markdown markdown={markdown.value} styleSheets={[markdownStyleSheet]} />
    </>
  );
}
