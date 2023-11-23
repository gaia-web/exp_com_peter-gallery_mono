import { useSignal, useSignalEffect } from "@preact/signals";
import { GeoExplorer } from "../utils/fe-utils";
import { PageProps } from "../utils/page-wrapper";
import { UtilGeoExplorerElement } from "fe-utils";
import { createRef } from "preact";
import { useRouter } from "preact-router";
import { useEffect } from "preact/hooks";
import { HeaderView } from "../views/header.view";

export function WorldPage(_props: PageProps) {
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

  const [router, routeTo] = useRouter();
  const languageLabel = router.matches?.lang?.toUpperCase();

  useEffect(() => {
    (async () => {
      areaNameDict.value = (await fetch(
        `https://gaia-web.github.io/lib_world-map-utils/continents/continents-name-dict.${languageLabel?.toLowerCase()}.json`
      ).then((response) => response.json())) as Record<string, string>;
      countryNameDict.value = (await fetch(
        `https://gaia-web.github.io/lib_world-map-utils/countries/country-name-dict.${languageLabel?.toLowerCase()}.json`
      ).then((response) => response.json())) as Record<string, string>;
    })();
  }, [router.url]);

  return (
    <>
      <HeaderView />
      {/* TODO investigate language refresh issue */}
      <GeoExplorer
        ref={geoExplorerRef}
        className="mt-6 h-[100vh] w-full"
        areas="https://gaia-web.github.io/lib_world-map-utils/continents/continents.simplified.geojson"
        countries="https://gaia-web.github.io/lib_world-map-utils/countries/countries.simplified.geojson"
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
        onCountrySelect={({ detail: feature }) => {
          const countryId = countryNameDict.value[feature?.properties?.ISO_A3];
          routeTo(
            `/${router.matches?.lang}/article?locationId=${encodeURIComponent(
              countryId
            )}`
          );
        }}
      ></GeoExplorer>
      <button
        onClick={() => {
          geoExplorerRef.current && (geoExplorerRef.current.area = undefined);
        }}
        class="absolute bottom-[10px] right-[10px] cursor-pointer z-[999] font-size-[2em]"
      >
        Reset view
      </button>
    </>
  );
}
