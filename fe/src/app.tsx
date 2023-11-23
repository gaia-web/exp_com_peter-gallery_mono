import Router, { RouterOnChangeArgs } from "preact-router";
import Redirect from "./utils/redirect";
import "fe-utils";
import { PageWrapper, PageProps } from "./utils/page-wrapper";
import { FallbackPage } from "./pages/fallback.page";
import Match from "preact-router/match";
import { HomePage } from "./pages/home.page";
import { WorldPage } from "./pages/world.page";

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
            {({ routerInfo }: PageProps) => (
              <>
                World - {routerInfo.area} - {routerInfo.lang}
              </>
            )}
          </PageWrapper>
          <PageWrapper path="/:lang/article">
            {({ routerInfo }: PageProps) => (
              <>
                <div>Article List - {routerInfo.lang}</div>
                <div>LocationId: {routerInfo.locationId ?? "N/A"}</div>
                <div>For People: {routerInfo.people ? "true" : "false"}</div>
                <div>For Search: {routerInfo.search ? "true" : "false"}</div>
                <div>Page Index: {routerInfo.page ?? "Not specified."}</div>
              </>
            )}
          </PageWrapper>
          <PageWrapper path="/:lang/article/:locationId/:articleId">
            {({ routerInfo }: PageProps) => (
              <>
                <div>
                  Article - {routerInfo.locationId} - {routerInfo.articleId} -{" "}
                  {routerInfo.lang}
                </div>
                <div>
                  From People Page: {routerInfo.fromPeople ? "true" : "false"}
                </div>
              </>
            )}
          </PageWrapper>
          <PageWrapper path="/:lang/selves">
            {({ routerInfo }: PageProps) => <>Selves - {routerInfo.lang}</>}
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
