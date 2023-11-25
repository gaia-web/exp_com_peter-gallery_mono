import { useSignal } from "@preact/signals";
import { GeoExplorer } from "../utils/fe-utils";
import { PageProps } from "../utils/page-wrapper";
import { UtilGeoExplorerElement } from "fe-utils";
import { createRef } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import { HeaderView } from "../views/header.view";

export function WorldPage({ routerInfo }: PageProps) {
  const geoExplorerRef = createRef<UtilGeoExplorerElement>();

  const areaNameDict = useSignal<Record<string, string>>({});
  const countryNameDict = useSignal<Record<string, string>>({});
  const validAreas = useSignal<string[]>(["AS", "EU", "AF", "OC"]);
  const validCountries = useSignal<string[]>([
    "CHN",
    "JPN",
    "KOR",
    "FRA",
    "ESP",
    "AUS",
    "TZA",
  ]);

  const languageLabel = routerInfo.lang?.toUpperCase();
  const area = routerInfo.area as string | undefined;

  useEffect(() => {
    (async () => {
      areaNameDict.value = (await fetch(
        `https://gaia-web.github.io/lib_world-map-utils/continents/continents-name-dict.${languageLabel?.toLowerCase()}.json`
      ).then((response) => response.json())) as Record<string, string>;
      countryNameDict.value = (await fetch(
        `https://gaia-web.github.io/lib_world-map-utils/countries/country-name-dict.${languageLabel?.toLowerCase()}.json`
      ).then((response) => response.json())) as Record<string, string>;
    })();
  }, [languageLabel]);

  return (
    <>
      <HeaderView routerInfo={routerInfo} />
      {areaNameDict.value && countryNameDict.value && (
        <GeoExplorer
          ref={geoExplorerRef}
          className="mt-6 h-[100vh] w-full fixed top-0 left-0"
          style="--base-background: hsl(0, 0%, 0%); --polygon-highlight-fill-color: hsl(240, 100%, 50%); --contrast-color: hsl(-10, 100%, 50%);"
          area={area}
          areas="https://gaia-web.github.io/lib_world-map-utils/continents/continents.simplified.geojson"
          countries="https://gaia-web.github.io/lib_world-map-utils/countries/countries.simplified.geojson"
          defaultZoom={document.documentElement.clientWidth / 750}
          obtainAreaIdCallback={(feature) => feature?.properties?.name}
          obtainCountryIdCallback={(feature) => feature?.properties?.ISO_A3}
          obtainAreaZoomInBoundsCallback={(feature) =>
            feature?.properties?.zoomInBounds
          }
          obtainCountryZoomInBoundsCallback={(feature) =>
            feature?.properties?.zoomInBounds
          }
          obtainAreaLabelPositionCallback={(feature) =>
            feature?.properties?.labelPosition
          }
          obtainCountryLabelPositionCallback={(feature) =>
            feature?.properties?.labelPosition
          }
          obtainAreaDisplayedLabelCallback={(feature) =>
            areaNameDict.value[feature?.properties?.name]
          }
          obtainCountryDisplayedLabelCallback={(feature) =>
            validCountries.value.includes(feature?.properties?.ISO_A3)
              ? countryNameDict.value[feature?.properties?.ISO_A3]
              : ""
          }
          validateAreaCallback={(feature) =>
            validAreas.value.includes(feature?.properties?.name)
          }
          validateCountryCallback={(feature) =>
            validCountries.value.includes(feature?.properties?.ISO_A3)
          }
          obtainCountryImageCallback={() => "https://picsum.photos/500"}
          onAreaSelect={({ detail: feature }) => {
            const areaId = feature?.properties?.name;
            setTimeout(() => {
              route(
                `/${languageLabel?.toLowerCase()}/world/${encodeURIComponent(
                  areaId
                )}`
              );
            });
          }}
          onCountrySelect={({ detail: feature }) => {
            const countryId = feature?.properties?.ISO_A3;
            route(
              `/${languageLabel?.toLowerCase()}/article?locationId=${encodeURIComponent(
                countryId
              )}`
            );
          }}
        ></GeoExplorer>
      )}
      <button
        onClick={() => {
          geoExplorerRef.current && (geoExplorerRef.current.area = undefined);
          setTimeout(() => {
            route(`/${languageLabel?.toLowerCase()}/world`);
          });
        }}
        class="absolute bottom-[10px] right-[10px] cursor-pointer z-[999] font-size-[2em]"
      >
        Reset view
      </button>
    </>
  );
}
