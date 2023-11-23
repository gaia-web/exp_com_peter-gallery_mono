import { FunctionComponent } from "preact";
import { RoutableProps } from "preact-router";
import { LanguageOptions } from "./language";
import Redirect from "./redirect";

export type PageWrapperProps = RoutableProps &
  Record<string, unknown> & { lang?: string };

export type PageProps = { routerInfo: PageWrapperProps };

export const PageWrapper: FunctionComponent<PageWrapperProps> = (props) => {
  if (!(props.lang && props.lang.toUpperCase() in LanguageOptions)) {
    return <Redirect to="/404" />;
  }

  return (props.children as any)?.({ routerInfo: props }) ?? props.children;
};
