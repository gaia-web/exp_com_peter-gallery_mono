import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/tab";
import "../components/tabs";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {
  value: string;
  onTabChange: (event: CustomEvent<string>) => void;
};

export default {
  title: "Components/Tabs",
  component: "my-tabs",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onTabChange: { action: "tabChange" },
  },
  render: (args) => html`
    <my-tabs value=${args.value} @tabChange=${args.onTabChange}>
      <my-tab value="one">One</my-tab>
      <my-tab value="two">Two</my-tab>
      <my-tab value="three">Three</my-tab>
    </my-tabs>
  `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {
    value: "one",
  },
};
