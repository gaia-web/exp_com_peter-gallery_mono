import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/progress-button";
import "@gaia/garage";
import { DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME } from "@gaia/garage";

// eslint-disable-next-line @typescript-eslint/ban-types
type MyArgs = {};

export default {
  title: "Components/Progress Button",
  component: "util-progress-button",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<MyArgs>;

export const Default: StoryObj<{
  progress?: number;
}> = {
  args: {
    progress: 0.5,
  },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (args) => html`
    <util-progress-button
      style="--progress: ${args.progress}; --background: hsl(0, 0%, 96%);"
      @click=${() => alert("Button clicked.")}
    >
      Progress Button
    </util-progress-button>
  `,
};

export const Scroll: StoryObj<MyArgs> = {
  parameters: {
    layout: "fullscreen",
  },
  args: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (_args) => html`
    <gaia-dynamic-scroll
      id="main-scroll"
      style="height: 100vh; width: 100%; max-height: 500px;"
    >
      <div style="height: 300%;">
        Scroll to see the effect
        <br />
        Click the progress button to jump back to the top
      </div>
      <gaia-dynamic-scroll-item
        @containerScroll=${({ currentTarget, detail }: CustomEvent) => {
          const innerContent = (
            currentTarget as HTMLElement | null
          )?.querySelector(
            "util-progress-button .inner-content"
          ) as HTMLElement | null;
          if (!innerContent) return;
          innerContent.innerHTML = `${(detail.scrollRatio * 100).toFixed(0)}%`;
          innerContent.style.color =
            detail.scrollRatio >= 1 ? "hsl(0, 50%, 50%)" : "";
        }}
      >
        <util-progress-button
          style="position: fixed; left: 50%; top: 50%; --background: hsl(0, 0%, 96%); transform: translate(-50%, -50%); --progress: var(${DYNAMIC_SCROLL_SCROLL_RATIO_CSS_VARIABLE_NAME})"
          title="Click to jump back to the top"
          @click=${() =>
            document.querySelector("#main-scroll")?.scrollTo({ top: 0 })}
        >
          <div
            class="inner-content"
            style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 2rem;"
          >
            0%
          </div>
        </util-progress-button>
      </gaia-dynamic-scroll-item>
    </gaia-dynamic-scroll>
  `,
};
