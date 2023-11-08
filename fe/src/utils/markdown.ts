import {
  AwesomeMarkdownElement,
  MarkdownParsedEventDetail,
} from "@awesome-elements/markdown";
import { EventName, createComponent } from "@lit/react";
import React from "react";

export const Markdown = createComponent({
  tagName: "awesome-markdown",
  elementClass: AwesomeMarkdownElement,
  react: React,
  events: {
    onMarkdownParsed: "markdownParsed" as EventName<
      CustomEvent<MarkdownParsedEventDetail>
    >,
  },
});
