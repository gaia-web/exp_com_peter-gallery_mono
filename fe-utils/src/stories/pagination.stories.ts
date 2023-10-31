import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "../components/pagination";

type MyArgs = {
  pageIndex: number;
  pageCount: number;
  maxNumberButtonCount: number;
  pageNumberToLabel?: (pageNumber: number) => string;
  onPageChange: (event: CustomEvent<number>) => void;
};

export default {
  title: "Components/Pagination",
  component: "util-pagination",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onPageChange: { action: "pageChange" },
  },
  render: (args) =>
    html`
      <util-pagination
        page-index=${args.pageIndex}
        page-count=${args.pageCount}
        max-number-button-count=${args.maxNumberButtonCount}
        @pageChange=${args.onPageChange}
      ></util-pagination>
    `,
} satisfies Meta<MyArgs>;

export const Default: StoryObj<MyArgs> = {
  args: {
    pageIndex: 1,
    pageCount: 10,
    maxNumberButtonCount: 5,
  },
};

export const Styled: StoryObj<MyArgs> = {
  args: {
    pageIndex: 1,
    pageCount: 10,
    maxNumberButtonCount: 5,
  },
  render: (args) =>
    html`
      <util-pagination
        page-index=${args.pageIndex}
        page-count=${args.pageCount}
        max-number-button-count=${args.maxNumberButtonCount}
        @pageChange=${args.onPageChange}
        style="--button-border: 1px solid bisque; --button-border-radius: 10px; --button-background: azure; --button-color: orange;"
      ></util-pagination>
    `,
};

export const CustomTexts: StoryObj<MyArgs> = {
  args: {
    pageIndex: 1,
    pageCount: 10,
    maxNumberButtonCount: 5,
    pageNumberToLabel: (x) => new Array(x + 1).join("/"),
  },
  render: (args) =>
    html`
      <util-pagination
        page-index=${args.pageIndex}
        page-count=${args.pageCount}
        max-number-button-count=${args.maxNumberButtonCount}
        @pageChange=${args.onPageChange}
        .pageNumberToLabel=${args.pageNumberToLabel}
      >
        <div slot="first">First</div>
        <div slot="previous">Previous</div>
        <div slot="next">Next</div>
        <div slot="last">Last</div>
        <div slot="5">Five</div>
        <div slot="any">Any</div>
      </util-pagination>
    `,
};

export const HideSpecificButton: StoryObj<MyArgs> = {
  args: {
    pageIndex: 1,
    pageCount: 10,
    maxNumberButtonCount: 5,
  },
  render: (args) =>
    html`
      <style>
        #pagination::part(any) {
          display: none;
        }
      </style>
      <util-pagination
        id="pagination"
        page-index=${args.pageIndex}
        page-count=${args.pageCount}
        max-number-button-count=${args.maxNumberButtonCount}
        @pageChange=${args.onPageChange}
      >
      </util-pagination>
    `,
};
