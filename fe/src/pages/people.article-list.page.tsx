import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { PeopleHeaderView } from "../views/people-header.view";
import { Link } from "preact-router";

export function PeopleArticleList({ routerInfo }: PageProps) {
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
      <PeopleHeaderView routerInfo={routerInfo} />
      <div> this is a article list </div>
      <Link href={`/en/article/people/1`}>
        <div>this is the article 1</div>
      </Link>
    </>
  );
}
