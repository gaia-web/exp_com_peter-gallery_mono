import { AwesomeMarkdownElement } from "@awesome-elements/markdown";
import { createComponent } from "@lit/react";
import React from "react";

export const Markdown = createComponent({
  tagName: "awesome-markdown",
  elementClass: AwesomeMarkdownElement,
  react: React,
  events: {
    onMarkdownParsed: "markdownParsed",
  },
});
