import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { Link } from "preact-router";
import { WorldHeaderView } from "../views/world-header.view";

export function GeneralArticleList({ routerInfo }: PageProps) {
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
      <WorldHeaderView routerInfo={routerInfo} />
      {console.log(routerInfo)}
      {console.log(routerInfo?.locationId)}
      <div>Ariticle list page</div>
      <br />
      <Link href={`/en/article/${routerInfo?.locationId}/1`}>
        <div>this is the article 1</div>
      </Link>
    </>
  );
}
