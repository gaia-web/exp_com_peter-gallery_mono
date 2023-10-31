import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/tab";
import "../components/tabs";

type MyArgs = {
  value: string;
  onTabChange: (event: CustomEvent<string>) => void;
};

export default {
  title: "Components/Tabs",
  component: "util-tabs",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onTabChange: { action: "tabChange" },
  },
  render: (args) => html`
    <util-tabs value=${args.value} @tabChange=${args.onTabChange}>
      <util-tab value="one">One</util-tab>
      <util-tab value="two">Two</util-tab>
      <util-tab value="three">Three</util-tab>
    </util-tabs>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {
    value: "one",
  },
};
