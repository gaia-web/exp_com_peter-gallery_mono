import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/geo-explorer";
import { UtilGeoExplorerElement } from "../components/geo-explorer";

const areaNameDict = (await fetch(
  "https://gaia-web.github.io/lib_world-map-utils/continents/continents-name-dict.en.json"
).then((response) => response.json())) as Record<string, string>;
const countryNameDict = (await fetch(
  "https://gaia-web.github.io/lib_world-map-utils/countries/country-name-dict.en.json"
).then((response) => response.json())) as Record<string, string>;
const validAreas = ["AS", "EU", "AF", "OC"];
const validCountries = ["CHN", "JPN", "KOR", "FRA", "ESP", "AUS", "TZA"];

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {
  onAreaSelect: (event: CustomEvent<GeoJSON.Feature>) => void;
  onCountrySelect: (event: CustomEvent<GeoJSON.Feature>) => void;
};

export default {
  title: "Components/Geo Explorer",
  component: "util-geo-explorer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onAreaSelect: { action: "areaSelect" },
    onCountrySelect: { action: "countrySelect" },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <style>
      #map {
        height: 100vh;
        width: 100%;
        max-height: 500px;

        --polygon-highlight-fill-color: blue;
        --contrast-color: pink;
      }
    </style>
    <util-geo-explorer
      id="map"
      areas="https://gaia-web.github.io/lib_world-map-utils/continents/continents.simplified.geojson"
      countries="https://gaia-web.github.io/lib_world-map-utils/countries/countries.simplified.geojson"
      timezone-overlay-image-src="/timezone-overlay.svg"
      .obtainAreaIdCallback=${(feature: GeoJSON.Feature) =>
        feature.properties?.name}
      .obtainCountryIdCallback=${(feature: GeoJSON.Feature) =>
        feature.properties?.ISO_A3}
      .obtainAreaZoomInBoundsCallback=${(feature: GeoJSON.Feature) =>
        feature.properties?.zoomInBounds}
      .obtainCountryZoomInBoundsCallback=${(feature: GeoJSON.Feature) =>
        feature.properties?.zoomInBounds}
      .obtainAreaLabelPositionCallback=${(feature: GeoJSON.Feature) =>
        feature.properties?.labelPosition}
      .obtainCountryLabelPositionCallback=${(feature: GeoJSON.Feature) =>
        feature.properties?.labelPosition}
      .obtainAreaDisplayedLabelCallback=${(feature: GeoJSON.Feature) =>
        areaNameDict[feature.properties?.name]}
      .obtainCountryDisplayedLabelCallback=${(feature: GeoJSON.Feature) =>
        validCountries.includes(feature.properties?.ISO_A3)
          ? countryNameDict[feature.properties?.ISO_A3]
          : ""}
      .validateAreaCallback=${(feature: GeoJSON.Feature) =>
        validAreas.includes(feature.properties?.name)}
      .validateCountryCallback=${(feature: GeoJSON.Feature) =>
        validCountries.includes(feature.properties?.ISO_A3)}
      @areaSelect=${args.onAreaSelect}
      @countrySelect=${args.onCountrySelect}
    ></util-geo-explorer>
    <button
      @click=${() =>
        ((document.querySelector("#map") as UtilGeoExplorerElement).area =
          undefined)}
      style="position: absolute; top: 10px; left: 10px; cursor: pointer; z-index: 999;"
    >
      Reset view
    </button>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {},
};
