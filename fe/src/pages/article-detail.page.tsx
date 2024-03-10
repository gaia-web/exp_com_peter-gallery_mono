import { useEffect } from "preact/compat";
import { Markdown } from "../utils/markdown";
import markdownStyleSheet from "../assets/markdown.css?inline";
import { useSignal } from "@preact/signals";
import { Carousel, If } from "../utils/garage";
import { route } from "preact-router";
import { PageProps } from "../utils/page-wrapper";
import { ArticleDetailHeaderView } from "../views/article-detail-header.view";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./article-detail.page.css";
// import required modules
import { Pagination } from "swiper/modules";

export function ArticleDetailPage({ routerInfo }: PageProps) {
  const toPage = (nextPage: string) => {
    return route(`${nextPage}`);
  };

  const articleDetail = useSignal<any>({});
  const partOneArticle = useSignal("");
  const partTwoArticle = useSignal("");
  const date = useSignal("");
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";
  const articleId = routerInfo.articleId ?? "";
  const locationId = routerInfo.locationId ?? "";
  const markdown = useSignal("");
  const imgs = useSignal([]);

  useEffect(() => {
    async function fetchArticle() {
      const articleData = await fetch(
        `http://127.0.0.1:1337/api/articles/${articleId}?populate[imageList][cover]=*&populate[country]=*&populate[localizations]=*`
      ).then((response) => {
        return response.json();
      });

      articleDetail.value = articleData.data.attributes;
      markdown.value = articleData.data.attributes.content;
      date.value =  articleData.data.attributes.date;
      // 假设markdown.value是你的Markdown文本
      [partOneArticle.value, partTwoArticle.value] = splitMarkdown(
        markdown.value
      );

      imgs.value = articleDetail.value.imageList.data;
      


    }

    fetchArticle();
  }, [languageLabel, routerInfo.articleId]);

  if (!markdown.value) {
    return <></>;
  }

  return (
    <>
      <div class="m-x-10%">
        {/* TODO: change this use data instead of router info */}
        <ArticleDetailHeaderView routerInfo={routerInfo} date={date.value}/>

        {/*  TODO: 看看是不是一定要那个效果 */}
        {/* <Carousel> */}
        {/* {imgs.value.map((img, index) => (
            <img
              src={`${img}{index}/1200/800`}
              alt={`${index}`}
              style="object-fit: contain"
            />
          ))} */}
        {/* </Carousel> */}

        {/* swiper  */}
        <div class="mt-12 pl-0 pr-0 lg:pl-24 lg:pr-24">
          <MySwiper imgs={imgs.value} />
        </div>

        {/* title  */}
        <div class="mt-8 mb-8 pl-0 pr-0 lg:pl-24 lg:pr-24">
          <p class="mb-0">{articleDetail.value.date}</p>
          <h1 class="mb-0 mt-0">{articleDetail.value.title}</h1>
        </div>

        <div class="flex flex-col lg:flex-row justify-between pl-0 pr-0 lg:pl-24 lg:pr-24">
          <div class="articleContainer">
            <Markdown
              markdown={partOneArticle.value}
              styleSheets={[markdownStyleSheet]}
            />
          </div>
          <div class="articleContainer">
            <Markdown
              markdown={partTwoArticle.value}
              styleSheets={[markdownStyleSheet]}
            />
          </div>
        </div>

        {/* divider  */}
        <div
          class=" h-1px ml-0 mr-0 lg:ml-24 lg:mr-24 mt-12 mb-12"
          style={{ borderTop: "1px solid #ccc" }}
        />

        {/* 文章上下篇 */}
        <div class="flex m-1rem pl-0 pr-0 lg:pl-24 lg:pr-24 ">
          <div
            class="flex  hover:cursor-pointer items-center"
            onClick={() => {
              const newUrl = decrementLastNumberInUrl(routerInfo.url);
              toPage(newUrl);
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="48"
                  height="48"
                  rx="24"
                  fill="black"
                  stroke="white"
                  stroke-width="2"
                />
                <path
                  d="M28.1836 31.3646L21.8196 25.0007L28.1836 18.6367"
                  stroke="white"
                  stroke-width="2"
                />
              </svg>
            </div>
            <If condition={languageLabel}>
              <div slot="EN" class="text-lg ml-6">
                LAST
              </div>
              <div slot="ZH" class="text-lg ml-6">
                上一篇
              </div>
            </If>
          </div>
          <div class="flex-1">
            <div
              class="float-right flex  items-center hover:cursor-pointer"
              onClick={() => {
                const newUrl = incrementLastNumberInUrl(routerInfo.url);
                toPage(newUrl);
              }}
            >
              <If condition={languageLabel}>
                <div slot="EN" class="text-lg mr-6">
                  NEXT
                </div>
                <div slot="ZH" class="text-lg mr-6">
                  下一篇
                </div>
              </If>
              {/* // TODO: replace with right arrow SVG */}

              <div class="rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1"
                    width="48"
                    height="48"
                    rx="24"
                    fill="black"
                    stroke="white"
                    stroke-width="2"
                  />
                  <path
                    d="M28.1836 31.3646L21.8196 25.0007L28.1836 18.6367"
                    stroke="white"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MySwiper({ imgs }: any) {
  const baseUrl = "http://127.0.0.1:1337";

  // 检查是否只有一个img元素
  const singleSlideStyle = imgs.length === 1 ? { width: "100%" } : {};

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {imgs.map((img: any) => (
          <SwiperSlide key={img.id} style={singleSlideStyle}>
            <img
              src={`${baseUrl}${img.attributes.url}`}
              alt={img.attributes.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

function splitMarkdown(markdownText: any) {
  // 尝试找到段落之间的空行作为分割点
  const splitRegex = /\n\n|\n-+\n|\n\*{3,}\n/; // 匹配空行、横线或者星号分隔线
  const splitIndex = markdownText.search(splitRegex);

  let part1, part2;

  if (splitIndex !== -1) {
    // 如果找到了合适的分割点
    part1 = markdownText.substring(0, splitIndex).trim();
    part2 = markdownText.substring(splitIndex).trim();
  } else {
    // 如果没有找到合适的分割点，简单地将文本分成两部分
    const halfIndex = Math.floor(markdownText.length / 2);
    part1 = markdownText.substring(0, halfIndex).trim();
    part2 = markdownText.substring(halfIndex).trim();
  }

  return [part1, part2];
}

function incrementLastNumberInUrl(url: any) {
  // 使用正则表达式找到路径中的最后一个数字
  const regex = /(\d+)(?=[^\d]*$)/;
  // 匹配URL中的最后一个数字
  const match = url.match(regex);

  if (match) {
    // 将匹配到的数字转换为整数并加2
    const incrementedNumber = parseInt(match[0], 10) + 2;
    // 用增加后的数字替换原来的数字来构建新的URL
    return url.replace(regex, incrementedNumber);
  }

  // 如果没有匹配到数字，直接返回原URL
  return url;
}

function decrementLastNumberInUrl(url: any) {
  // 使用正则表达式找到路径中的最后一个数字
  const regex = /(\d+)(?=[^\d]*$)/;
  // 匹配URL中的最后一个数字
  const match = url.match(regex);

  if (match) {
    // 将匹配到的数字转换为整数并加2
    const incrementedNumber = parseInt(match[0], 10) - 2; 
    // 用增加后的数字替换原来的数字来构建新的URL
    return url.replace(regex, incrementedNumber);
  }

  // 如果没有匹配到数字，直接返回原URL
  return url;
}
