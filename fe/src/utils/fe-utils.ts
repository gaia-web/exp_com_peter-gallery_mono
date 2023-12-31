import { EventName, createComponent } from "@lit/react";
import {
  UtilGeoExplorerElement,
  UtilPaginationElement,
  UtilTabElement,
  UtilTabsElement,
  UtilBreadcrumbElement,
  UtilItemElement
} from "fe-utils";
import React from "react";

export const GeoExplorer = createComponent({
  tagName: "util-geo-explorer",
  elementClass: UtilGeoExplorerElement,
  react: React,
  events: {
    onAreaSelect: "areaSelect" as EventName<CustomEvent<GeoJSON.Feature>>,
    onCountrySelect: "countrySelect" as EventName<CustomEvent<GeoJSON.Feature>>,
  },
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

export const Breadcrumb = createComponent({
  tagName: "util-breadcrumb",
  elementClass: UtilBreadcrumbElement,
  react: React,
  events: {
    onItemSelect: "itemSelect" as EventName<CustomEvent<string[]>>,
  },
});

export const Item = createComponent({
  tagName: "util-item",
  elementClass: UtilItemElement,
  react: React,
});