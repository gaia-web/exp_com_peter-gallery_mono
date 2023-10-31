import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";

import "../components/item";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {
  orientation: "horizontal" | "vertical";
  overriddenStartSlotItemSize: string;
  startSlotContent: string;
  overriddenDefaultSlotItemSize: string;
  defaultSlotContent: string;
  overriddenEndSlotItemSize: string;
  endSlotContent: string;
};

export default {
  title: "Components/Item",
  component: "util-item",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
    overriddenStartSlotItemSize: {
      control: { type: "text" },
    },
    startSlotContent: {
      control: { type: "text" },
    },
    overriddenDefaultSlotItemSize: {
      control: { type: "text" },
    },
    defaultSlotContent: {
      control: { type: "text" },
    },
    overriddenEndSlotItemSize: {
      control: { type: "text" },
    },
    endSlotContent: {
      control: { type: "text" },
    },
  },
  args: {
    overriddenDefaultSlotItemSize: "100px",
    startSlotContent: "start",
    defaultSlotContent: "<b>Default</b>",
    endSlotContent: "End",
  },
  render: (args) => html`
    <util-item
      orientation=${ifDefined(args.orientation)}
      style="border: 1px solid black;"
    >
      <div
        slot="start"
        style=${styleMap({
          [args.orientation === "vertical" ? "height" : "width"]:
            args.overriddenStartSlotItemSize,
        })}
      >
        ${unsafeHTML(args.startSlotContent)}
      </div>
      <div
        style=${styleMap({
          [args.orientation === "vertical" ? "height" : "width"]:
            args.overriddenDefaultSlotItemSize,
        })}
      >
        ${unsafeHTML(args.defaultSlotContent)}
      </div>
      <div
        slot="end"
        style=${styleMap({
          [args.orientation === "vertical" ? "height" : "width"]:
            args.overriddenStartSlotItemSize,
        })}
      >
        ${unsafeHTML(args.endSlotContent)}
      </div>
    </util-item>
  `,
};

export const Example1: StoryObj<MyArgs> = {
  args: {},
  render: () => html`
    <util-item style="border: 1px solid black; gap: 10px; height: 200px;">
      <img
        slot="start"
        src="https://picsum.photos/200"
        style="display: block; height: 100%; aspect-ratio: 1;"
      />
      <div>
        <h1>Blah</h1>
        <p>
          Blah blah blah blah blah blah blah blah blah blah blah blah blah blah
          blah blah blah blah blah blah blah blah blah blah blah
        </p>
      </div>
      <h2 slot="end">Blah</h2>
    </util-item>
  `,
};

export const Example2: StoryObj<MyArgs> = {
  args: {},
  render: () => html`
    <util-item
      orientation="vertical"
      style="border: 1px solid black; gap: 10px; width: 200px;"
    >
      <img
        slot="start"
        src="https://picsum.photos/200"
        style="display: block; width: 100%; aspect-ratio: 16 / 9;"
      />
      <div>
        <b>Blah blah</b>
      </div>
      <i>Blah blah</i>
    </util-item>
  `,
};
