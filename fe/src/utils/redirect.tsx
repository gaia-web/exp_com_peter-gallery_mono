import { route } from "preact-router";
import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

interface RedirectProps {
  path: string;
  to: string;
}

const Redirect: FunctionComponent<RedirectProps> = ({ path, to }) => {
  useEffect(() => {
    route(to, true);
  }, [path, to]);

  return null;
};

export default Redirect;
