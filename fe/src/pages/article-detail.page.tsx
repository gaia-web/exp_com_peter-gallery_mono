import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";
import { Carousel, If } from "../utils/garage";
import { route } from "preact-router";
import { PageProps } from "../utils/page-wrapper";
import { ArticleDetailHeaderView } from "../views/article-detail-header.view";

export function ArticleDetailPage({ routerInfo }: PageProps) {
  const toPage = (nextPage: string) => {
    return route(`/people/${nextPage}`, true);
  };

  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";
  const markdown = useSignal("");
  const imgs = useSignal([]);

  useEffect(() => {
    async function fetchArticle() {
      const articleDefinition = await fetch("/mock/article.json").then(
        (response) => response.json()
      );
      markdown.value = await fetch(
        articleDefinition.content[languageLabel.toLowerCase()]
      ).then((response) => response.text());

      imgs.value = articleDefinition.imgLinks;
    }

    fetchArticle();
  }, [languageLabel]);

  if (!markdown.value) {
    return <></>;
  }

  return (
    <>
      <div class="m-x-10%">
        {/* TODO: change this use data instead of router info */}
        <ArticleDetailHeaderView routerInfo={routerInfo} />
        <Carousel>
          {imgs.value.map((img, index) => (
            <img
              src={`${img}{index}/1200/800`}
              alt={`${index}`}
              style="object-fit: contain"
            />
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
            {/* // TODO: replace with left arrow SVG */}
            <div>{"<-"}</div>
            <If condition={languageLabel}>
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
              <If condition={languageLabel}>
                <div slot="EN">NEXT</div>
                <div slot="ZH">下一篇</div>
              </If>
              {/* // TODO: replace with right arrow SVG */}
              <div>{"->"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
