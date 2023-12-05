import Router, { RouterOnChangeArgs } from "preact-router";
import Redirect from "./utils/redirect";
import "fe-utils";
import { PageWrapper, PageProps } from "./utils/page-wrapper";
import { FallbackPage } from "./pages/fallback.page";
import Match from "preact-router/match";
import { HomePage } from "./pages/home.page";
import { WorldPage } from "./pages/world.page";
import { ArticleListPage } from "./pages/article-list.page";
import { ArticleDetailPage } from "./pages/article-detail.page";
import { SelvesPage } from "./pages/selves.page";

export function App() {
  return (
    <>
      <div style={{ viewTransitionName: "page" }}>
        <Router>
          <Redirect path="/" to="/en" />
          <PageWrapper path="/:lang">
            {(props: PageProps) => <HomePage {...props} />}
          </PageWrapper>
          <PageWrapper path="/:lang/world">
            {(props: PageProps) => <WorldPage {...props} />}
          </PageWrapper>
          <PageWrapper path="/:lang/world/:area">
            {(props: PageProps) => <WorldPage {...props} />}
          </PageWrapper>
          <PageWrapper path="/:lang/article">
            {(props: PageProps) => <ArticleListPage {...props} />}
          </PageWrapper>
          <PageWrapper path="/:lang/article/:articleId">
            {(props: PageProps) => <ArticleDetailPage {...props} />}
          </PageWrapper>
          <PageWrapper path="/:lang/selves">
            {(props: PageProps) => <SelvesPage {...props} />}
          </PageWrapper>
          <Match path="/404">
            {({ url }: RouterOnChangeArgs) => (
              <FallbackPage>{url}</FallbackPage>
            )}
          </Match>
          <Match default>
            {({ url }: RouterOnChangeArgs) => (
              <FallbackPage>{url}</FallbackPage>
            )}
          </Match>
        </Router>
      </div>
    </>
  );
}
