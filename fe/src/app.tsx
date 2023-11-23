import Router, { RoutableProps } from "preact-router";
import Redirect from "./utils/redirect";
import "fe-utils";
import { FunctionComponent } from "preact";

const TestPage: FunctionComponent<
  Record<string, unknown> &
    RoutableProps & { name: string; lang?: string; alsoShow?: string[] }
> = (props) => {
  debugger;
  return (
    <>
      <div>
        {props.name} - {props.lang} - {props.path}
      </div>
      <div>
        {props.alsoShow?.map((key) => (
          <div>
            {key}: {props[key]}
          </div>
        ))}
      </div>
    </>
  );
};

export function App() {
  return (
    <>
      <div style={{ viewTransitionName: "page" }}>
        <Router>
          <Redirect path="/" to="/en" />
          <TestPage path="/:lang" name="Home" />
          <TestPage path="/:lang/world" name="World" />
          <TestPage
            path="/:lang/world/:area"
            name="World Area"
            alsoShow={["area"]}
          />
          <TestPage
            path="/:lang/article"
            name="Article List"
            alsoShow={["location", "people", "search", "page"]}
          />
          <TestPage
            path="/:lang/article/:locationId/:articleId"
            name="Article"
            alsoShow={["locationId", "articleId", "fromPeople"]}
          />
          <TestPage path="/:lang/selves" name="Selves" />
        </Router>
      </div>
    </>
  );
}
