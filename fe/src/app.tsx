import Router, { RouterOnChangeArgs, route } from "preact-router";
import Redirect from './utils/redirect'
import Match from "preact-router/match";
import "fe-utils";
import { HomePage } from "./pages/home.page";
import { HeaderView } from "./views/header.view";
import { FallbackPage } from "./pages/fallback.page";
import { PeoplePage } from "./pages/people.page";
import { WorldPage } from "./pages/world.page";
import { SelvesPage } from "./pages/selves.page";
import { SearchPage } from "./pages/search.page";

export function App() {
  type RouterType = {
    matches: boolean;
    url: string;
  };

  return (
    <>

      {(window.location.pathname !== "/" && window.location.pathname !== "/world") && <HeaderView />}
      <div style={{ viewTransitionName: "page" }}>
        <Router>
          <Redirect path="/" to="/en" />
          <Match path="/:lang">
            {({ matches, url }: RouterType) =>
              matches && <HomePage path={url} />
            }
          </Match>
          <Match path="/:lang/world">
            {({ matches, url }: RouterType) => matches && <WorldPage />}
          </Match>
          <Match path="/:lang/article">
            {({ matches, url }: RouterType) => matches && <PeoplePage />}
          </Match>
          <Match path="/:lang/selves">
            {({ matches, url }: RouterType) => matches && <SelvesPage />}
          </Match>
          <Match path="/:lang/search">
            {({ matches, url }: RouterType) => matches && <SearchPage />}
          </Match>

          {/* //TODO */}
          {/* <FallbackPage default /> */}


        </Router>
      </div>
    </>
  );
}


