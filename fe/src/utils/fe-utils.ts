import { EventName, createComponent } from "@lit/react";
import {
  UtilGeoExplorerElement,
  UtilPaginationElement,
  UtilTabElement,
  UtilTabsElement,
} from "fe-utils";
import React from "react";

export const GeoExplorer = createComponent({
  tagName: "util-geo-explorer",
  elementClass: UtilGeoExplorerElement,
  react: React,
});

export const Pagination = createComponent({
  tagName: "util-pagination",
  elementClass: UtilPaginationElement,
  react: React,
  events: {
    onPageChange: "pageChange" as EventName<CustomEvent<number>>,
  },
});

export const Tab = createComponent({
  tagName: "util-tab",
  elementClass: UtilTabElement,
  react: React,
});

export const Tabs = createComponent({
  tagName: "util-tabs",
  elementClass: UtilTabsElement,
  react: React,
  events: {
    onTabChange: "tabChange" as EventName<CustomEvent<string>>,
  },
});
