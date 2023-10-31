import Router, { RouterOnChangeArgs } from "preact-router";
import { HomePage } from "./pages/home.page";
import { FallbackPage } from "./pages/fallback.page";
import Match from "preact-router/match";
import "fe-utils";
import { HeaderView } from "./views/header.view";
import { ArticlePage } from "./pages/article.page";

export function App() {
  return (
    <>
      <HeaderView />
      <div style={{ viewTransitionName: "page" }}>
        <Router>
          <Match path="/">{() => <HomePage />}</Match>
          <Match path="/article">{() => <ArticlePage />}</Match>
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
