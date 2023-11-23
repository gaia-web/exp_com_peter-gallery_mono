import {
  GaiaHeaderElement,
  GaiaIfElement,
  GaiaNavElement,
  GaiaNavItemElement,
  GaiaCarouselElement
} from "@gaia/garage";
import { createComponent } from "@lit/react";
import React from "react";

export const Header = createComponent({
  tagName: "gaia-header",
  elementClass: GaiaHeaderElement,
  react: React,
});

export const If = createComponent({
  tagName: "gaia-if",
  elementClass: GaiaIfElement,
  react: React,
});

export const Nav = createComponent({
  tagName: "gaia-nav",
  elementClass: GaiaNavElement,
  react: React,
});

export const NavItem = createComponent({
  tagName: "gaia-nav-item",
  elementClass: GaiaNavItemElement,
  react: React,
})
;
export const Carousel = createComponent({
  tagName: "gaia-carousel",
  elementClass: GaiaCarouselElement,
  react: React,
});
