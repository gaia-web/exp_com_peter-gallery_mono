import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../../src/components/location-explorer";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Map",
  component: "util-location-explorer",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (_args) => html`
    <style>
      #map {
        height: 100vh;
        width: 100%;
        max-height: 500px;
      }
    </style>
    <util-location-explorer
      id="map"
      continents="https://gaia-web.github.io/lib_world-map-utils/continents/continents.simplified.geojson"
      countries="https://gaia-web.github.io/lib_world-map-utils/countries/countries.simplified.geojson"
    ></util-location-explorer>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {},
};
