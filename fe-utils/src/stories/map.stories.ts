import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../../src/components/map";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Map",
  component: "my-map",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <style>
      #map {
        height: 100vh;
        width: 100vw;
      }
    </style>
    <my-map id="map"></my-map>
  `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
