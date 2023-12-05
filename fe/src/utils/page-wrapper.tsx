import { FunctionComponent } from "preact";
import { RoutableProps } from "preact-router";
import { LanguageOptions } from "./language";
import Redirect from "./redirect";
import { Signal, signal } from "@preact/signals";

declare global {
  interface ProxyConstructor {
    new <TSource extends object, TTarget extends object>(
      target: TSource,
      handler: ProxyHandler<TSource>
    ): TTarget;
  }
}

export type PageWrapperProps = RoutableProps &
  Record<string, unknown> & { lang?: string };

export type RouterInfoSignalsProxy = {
  [K in keyof PageWrapperProps]: Signal<PageWrapperProps[K]>;
};

export type PageWrapperChildProps = {
  routerInfo: RouterInfoSignalsProxy;
};

export type PageProps = { routerInfo: PageWrapperProps };

const _routerInfo: PageWrapperProps = {};
const routerInfoSignalsProxy = new Proxy<
  PageWrapperProps,
  RouterInfoSignalsProxy
>(_routerInfo, {
  get(_target, propName) {
    const value = _routerInfo[propName as string];
    if (value == null) {
      _routerInfo[propName as string] = signal(undefined);
    }
    return _routerInfo[propName as string];
  },
});

export const PageWrapper: FunctionComponent<PageWrapperProps> = (props) => {
  if (!(props.lang && props.lang.toUpperCase() in LanguageOptions)) {
    return <Redirect to="/404" />;
  }
  Object.entries(props).forEach(
    ([key, value]) => (routerInfoSignalsProxy[key].value = value)
  );

  return (
    (props.children as any)?.({ routerInfo: routerInfoSignalsProxy }) ??
    props.children
  );
};
