import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/breadcrumb";

type MyArgs = {
  onItemSelect: (event: CustomEvent<(string | number)[]>) => void;
};

export default {
  title: "Components/Breadcrumb",
  component: "util-breadcrumb",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onItemSelect: { action: "itemSelect" },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <util-breadcrumb
      path='["One", "Two", "Three"]'
      @itemSelect=${args.onItemSelect}
    >
    </util-breadcrumb>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {},
};
