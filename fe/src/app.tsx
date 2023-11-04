import Router, { RouterOnChangeArgs } from "preact-router";
import { HomePage } from "./pages/home.page";
import { FallbackPage } from "./pages/fallback.page";
import Match from "preact-router/match";
import "fe-utils";
import { HeaderView } from "./views/header.view";
import { PeoplePage } from "./pages/people.page";
import { WorldPage } from "./pages/world.page";
import { SelvesPage } from "./pages/selves.page";
import { SearchPage } from "./pages/search.page";

export function App() {
  return (
    <>
      <HeaderView />
      <div style={{ viewTransitionName: "page" }}>
        <Router>
          <Match path="/">{() => <HomePage />}</Match>
          <Match path="/people">{() => <PeoplePage />}</Match>
          <Match path="/world">{() => <WorldPage />}</Match>
          <Match path="/about-us">{() => <SelvesPage />}</Match>
          <Match path="/search">{() => <SearchPage />}</Match>
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
