import Router from "preact-router";
import Redirect from "./utils/redirect";
import "fe-utils";
import { PageWrapper, PageProps } from "./utils/page-wrapper";

export function App() {
  return (
    <>
      <div style={{ viewTransitionName: "page" }}>
        <Router>
          <Redirect path="/" to="/en" />
          <PageWrapper path="/:lang">
            {({ routerInfo }: PageProps) => <>Home - {routerInfo.lang}</>}
          </PageWrapper>
          <PageWrapper path="/:lang/world">
            {({ routerInfo }: PageProps) => <>World - {routerInfo.lang}</>}
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
          <PageWrapper default>
            {({ routerInfo }: PageProps) => <>404 - {routerInfo.url}</>}
          </PageWrapper>
        </Router>
      </div>
    </>
  );
}
