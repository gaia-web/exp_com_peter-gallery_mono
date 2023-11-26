function ArticleCard(props: {
  pic: string;
  area: string;
  country: string;
  date: string;
}) {
  const { pic, area, country, date } = props;

  return (
    <div >
      <img class="w-100% h-42rem p-1rem" src={pic}  />
      <div class="pl-1rem">
        {area},{country}
      </div>
      <div class="pl-1rem">{date}</div>
    </div>
  );
}

export function ArticleListPage() {
  return (
    <>
      <div class="grid grid-cols-2 gap-1 pl-10vw pr-10vw">
        <ArticleCard
          pic="//picsum.photos/seed/picsum/1200/800"
          area="area"
          country="country"
          date="2022.12.12"
        />
        <ArticleCard
          pic="//picsum.photos/seed/picsum-2/1200/800"
          area="area"
          country="country"
          date="2022.12.12"
        />
        <ArticleCard
          pic="//picsum.photos/seed/picsum/1200/800"
          area="area"
          country="country"
          date="2022.12.12"
        />
        <ArticleCard
          pic="//picsum.photos/seed/picsum/1200/800"
          area="area"
          country="country"
          date="2022.12.12"
        />
      </div>
    </>
  );
}
