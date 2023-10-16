import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/tab";
import "../components/tabs";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Tabs",
  component: "my-tabs",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <my-tabs value="1" @tabChange=${({ detail }) => alert(detail)}>
      <my-tab value="1">One</my-tab>
      <my-tab value="2">Two</my-tab>
      <my-tab value="3">Three</my-tab>
    </my-tabs>
  `,
} satisfies Meta<MyArgs>;

export const Demo: StoryObj<MyArgs> = {
  name: "Default",
  args: {},
};
