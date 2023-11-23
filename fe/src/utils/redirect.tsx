import { route } from "preact-router";
import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

interface RedirectProps {
  to: string;
}

const Redirect: FunctionComponent<RedirectProps> = ({ to }) => {
  useEffect(() => {
    route(to, true);
  }, [to]);

  return null;
};

export default Redirect;
