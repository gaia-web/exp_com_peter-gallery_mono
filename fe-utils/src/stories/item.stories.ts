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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {
    overriddenDefaultSlotItemSize: "100px",
    startSlotContent: "start",
    defaultSlotContent: "<b>Default</b>",
    endSlotContent: "End",
  },
};
