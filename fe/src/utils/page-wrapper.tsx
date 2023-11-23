import { FunctionComponent } from "preact";
import { RoutableProps } from "preact-router";

export type PageWrapperProps = RoutableProps &
  Record<string, unknown> & { lang?: string };

export type PageProps = { routerInfo: PageWrapperProps };

export const PageWrapper: FunctionComponent<PageWrapperProps> = (props) => {
  return (props.children as any)?.({ routerInfo: props }) ?? props.children;
};
