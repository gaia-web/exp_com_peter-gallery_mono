import { PropsWithChildren } from "preact/compat";
import { Map } from "../utils/fe-utils";

export function WorldPage(props: PropsWithChildren) {
  return (
    <>
      <h1>Map Page</h1>
      URL: {props.children}
      <div class="h-xl">
      <Map id="map" className="mt-6 h-[600px] w-full"></Map>
      </div>
    </>
  );
}
