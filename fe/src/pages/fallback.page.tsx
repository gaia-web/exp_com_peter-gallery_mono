import { PropsWithChildren } from "preact/compat";

export function FallbackPage(props: PropsWithChildren) {
  return (
    <>
      <h1>Fallback Page</h1>
      URL: {props.children}
      <div class="h-xl"></div>
    </>
  );
}
