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
    value: {
      options: ["zh", "en"],
      control: { type: "radio" },
    },
    onTabChange: { action: "tabChange" },
  },
  render: (args) => html`
    <util-tabs value=${args.value} @tabChange=${args.onTabChange} style="">
      <util-tab value="zh">中文</util-tab>
      <util-tab value="en">English</util-tab>
    </util-tabs>
  `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {
    value: "zh",
  },
};

export const Styled: StoryObj<MyArgs> = {
  argTypes: {
    value: {
      options: ["one", "two", "three"],
      control: { type: "radio" },
    },
  },
  args: {
    value: "one",
  },
  render: (args) => html`
    <util-tabs
      value=${args.value}
      @tabChange=${args.onTabChange}
      style="background: hsl(0, 0%, 96%); border-radius: 10px;"
    >
      <style>
        @scope {
          util-tab {
            &[selected] {
              background: hsl(180, 50%, 50%, 0.5);
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }
      </style>
      <util-tab value="one" style="border-radius: 10px;">One</util-tab>
      <util-tab value="two" style="border-radius: 10px;">Two</util-tab>
      <util-tab value="three" style="border-radius: 10px;">Three</util-tab>
    </util-tabs>
  `,
};
