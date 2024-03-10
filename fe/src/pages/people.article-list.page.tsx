import { useEffect } from "preact/compat";
import { useSignal } from "@preact/signals";
import { PageProps } from "../utils/page-wrapper";
import { PeopleHeaderView } from "../views/people-header.view";
import { route } from "preact-router";
import { If } from "../utils/garage";

import "./people.article-list.page.css";
import rightArrow from "../assets/right-arrow.svg";

export function PeopleArticleList({ routerInfo }: PageProps) {
  const toparticleList = useSignal([]);
  const regulararticleList = useSignal([]);
  const slogan = useSignal("");
  const city = useSignal("");
  const country = useSignal("");
  const date = useSignal("");
  const loading = useSignal(true);
  const languageLabel = routerInfo.lang?.toUpperCase() ?? "";

  useEffect(() => {
    async function fetchArticle() {
      const sloganData = await fetch(
        `http://127.0.0.1:1337/api/article-list-page-slogans?locale=${languageLabel.toLowerCase()}`
      ).then((response) => {
        return response.json();
      });

      const data = await fetch(
        `http://127.0.0.1:1337/api/articles?locale=${languageLabel.toLowerCase()}&filters[article_type][name][$eq]=people&populate[imageList][cover]=*&populate[country]=* `
      ).then(
        // const data = await fetch("/mock/articles-people.json").then(
        (response) => {
          return response.json();
        }
      );

      //  这里获取的数据需要进行处理，将其分为顶置文章和一般文章
      // cards.value = data.data;

      // const toparticleList = data.data.filter(
      //   (item: any) => item.attributes.top === true
      // );

      toparticleList.value = data.data.filter(
        (item: any) => item.attributes.top === true
      );

      // TODO

      regulararticleList.value = data.data.filter(
        (item: any) => item.attributes.top !== true
      );

      // slogan value
      slogan.value = sloganData.data[0].attributes.slogan;
      city.value = sloganData.data[0].attributes.city;
      country.value = sloganData.data[0].attributes.country;
      date.value = sloganData.data[0].attributes.date;
      loading.value = false;
    }

    fetchArticle();
  }, [languageLabel]);

  if (loading.value) {
    return <></>;
  }

  // console.log({ slogan });
  // console.log(cards.value);

  return (
    <>
      <PeopleHeaderView routerInfo={routerInfo} />
      <div class="mt-5rem"></div>

      {/* slogan  */}
      <div
        class="flex "
        style={{ alignItems: "center", width: "80%", margin: "0 auto" }}
      >
        <div>
          <svg
            width="13"
            height="178"
            viewBox="0 0 13 178"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1V1C6.37258 1 1 6.37258 1 13V165C1 171.627 6.37258 177 13 177V177"
              stroke="#ccc"
              fill="none"
              stroke-width="2"
            />
          </svg>
        </div>

        <div
          class="w-100% text-center text-5xl pl-15vw pr-15vw text-left mt-0rem md:mt-2rem mb-2rem "
          style={{ lineHeight: "4rem" }}
        >
          {slogan}
        </div>

        <div class="svg-flip">
          <svg
            width="13"
            height="178"
            viewBox="0 0 13 178"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1V1C6.37258 1 1 6.37258 1 13V165C1 171.627 6.37258 177 13 177V177"
              stroke="#ccc"
              fill="none"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>

      {/* date  */}
      <div
        class="w-100% text-center mt-1rem mb-5rem "
        style={{ color: "#ccc" }}
      >
        {date} ｜ {city} {country}
      </div>

      {/* top article  */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-[5rem] pl-15vw pr-15vw items-center ">
        {toparticleList.value.map((card: any) => {
          const { id, attributes } = card;
          // console.log({ attributes });
          // console.log({area})
          return (
            <PeopleTopCard
              id={id}
              pic={`http://127.0.0.1:1337${attributes.imageList.data[0].attributes.url}`}
              title={attributes.title}
              countryId={attributes.country.data.id}
              languageLabel={languageLabel}
              content={attributes.content}
              // location={}
            />
          );
        })}
      </div>

      {/* divider  */}
      <div class="divider ml-15vw mr-15vw "></div>

      {/* newest article  */}
      <div>
        <h2 style={{ fontSize: "60px" }} class="ml-15vw mr-15vw ">
          最新 &nbsp; LASTEST
        </h2>
        {/* regular article  */}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-[5rem] pl-15vw pr-15vw items-center ">
          {regulararticleList.value.map((card: any) => {
            const { id, attributes } = card;
            console.log({ attributes });

            return (
              <PeopleRegularCard
                id={id}
                pic={`http://127.0.0.1:1337${attributes.imageList.data[0].attributes.url}`}
                title={attributes.title}
                countryId={attributes.country.data.id}
                languageLabel={languageLabel}
                content={attributes.content}
                date={attributes.date}
              />
            );
          })}
        </div>
      </div>

      {/* divider  */}
      <div class="divider ml-15vw mr-15vw "></div>

      {/* 分页  TODO */}
      <div class="flex justify-center">
        <text
          style={{
            display: "flex",
            cursor:"pointer",
            color: "#000",
            backgroundColor: "#fff",
            paddingTop:".15rem",
            paddingBottom:".15rem",
            paddingLeft: ".4rem",
            paddingRight: ".4rem",
            borderRadius: "100%",
          }}
        >
          1
        </text>
        <text
          style={{
            display: "flex",
            marginLeft:".6rem",
            cursor:"pointer",
            border:"1px solid #fff",
            paddingTop:".15rem",
            paddingBottom:".15rem",
            paddingLeft: ".4rem",
            paddingRight: ".4rem",
            borderRadius: "100%",
          }}
        >
          2
        </text>
      </div>
      <div style={{ marginTop: "10rem" }}>123</div>
    </>
  );
}

function PeopleTopCard(props: any) {
  const { pic, title, content, id, languageLabel, countryId } = props;

  return (
    <div
      className="articleTopContainer "
      style={{ backgroundImage: `url(${pic})`, position: "relative" }}
      onClick={() =>
        route(
          `/${languageLabel}/article/${countryId}/${id}?fromPeople=true`,
          true
        )
      }
    >
      <div
        style={{ position: "relative", zIndex: 2, height: "100%" }}
        class="flex flex-col justify-between"
      >
        <p class="content">{contentLimiter(content, 100)}</p>
        <div>
          {/* arrow  */}
          <div class="arrowContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </div>
          {/* title  */}
          <h2 class="content-title">{title}</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
}

function PeopleRegularCard(props: any) {
  const {
    pic,
    title,
    date,
    id,
    languageLabel,
    countryId,
    // location,
  } = props;
  console.log(props);
  return (
    <div
      class="peopleRegularContainer"
      onClick={() =>
        route(
          `/${languageLabel}/article/${countryId}/${id}?fromPeople=true`,
          true
        )
      }
    >
      <img src={pic} class="peopleRegularImg" alt="" />
      <h3 class="peopleRegularHeader">{title}</h3>
      <p class="peopleRegularDate">{date}</p>
    </div>
  );
}

function contentLimiter(content: string, limit: number) {
  return `${content.substring(0, limit)}...`;
}
