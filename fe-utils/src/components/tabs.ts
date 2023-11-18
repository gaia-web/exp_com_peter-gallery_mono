import { LitElement, css, html } from "lit";
import { createContext, provide } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { UtilTabElement } from "./tab";

export const tabsContext = createContext<UtilTabsElement>(
  Symbol("tabs-context")
);

/**
 * Tabs. It should use with `util-tab` elements.
 *
 * @csspart base - the main part of the element.
 *
 * @fires tabChange - Occurs when the tab selection is changed. The event `detail` prop gives the new `value` that is selected.
 *
 */
@customElement("util-tabs")
export class UtilTabsElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    [part~="base"] {
      display: grid;
      grid-auto-columns: 1fr;
    }
  `;

  /**
   * @internal
   */
  @provide({ context: tabsContext })
  self = this;

  /**
   * @internal
   */
  #childTabSet = new Set<UtilTabElement>();
  /**
   * @internal
   */
  get childTabSet() {
    return this.#childTabSet;
  }
  /**
   * @internal
   */
  set childTabSet(value: Set<UtilTabElement>) {
    this.#childTabSet = value;
    this.#updateSelection();
  }

  /**
   * @internal
   */
  #value?: string;
  /**
   * Determine which child would be selected.
   * If the child tab has `value` attribute set, it matches the `value` attrubute.
   * Otherwise, it matches the child's `innerText`.
   */
  get value() {
    return this.#value;
  }
  @property({ reflect: true }) set value(value: string | undefined) {
    this.#value = value;
    this.#updateSelection();
    this.dispatchEvent(new CustomEvent("tabChange", { detail: value }));
  }

  render() {
    return html` <slot part="base"></slot> `;
  }

  #updateSelection() {
    let selectedTab = [...this.childTabSet].find(
      (tab) => tab.actualValue === this.value
    );
    this.childTabSet.forEach((tab) => {
      tab.selected = tab === selectedTab ? true : false;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-tabs": UtilTabsElement;
  }
}
