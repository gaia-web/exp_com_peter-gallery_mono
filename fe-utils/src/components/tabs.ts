import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UtilTabElement } from "./tab";

/**
 * Tabs. It should use with `util-tab` elements.
 *
 * @csspart base - the main part of the element.
 *
 * @cssprop --border-radius - Controls the border radius
 * @cssprop --base-background - Controls the background of the base part
 * @cssprop --item-highlight-background - Controls the background of the selected item
 * @cssprop --item-color - Controls the items' text color
 *
 * @fires tabChange - Occurs when the tab selection is changed. The event `detail` prop gives the new `value` that is selected.
 *
 */
@customElement("util-tabs")
export class UtilTabsElement extends LitElement {
  static styles = css`
    :host {
      --border-radius: 10px;
      --base-background: hsl(0, 0%, 0%, 0.3);
      --item-highlight-background: hsl(240, 100%, 50%);
      --item-color: hsl(0, 0%, 100%);

      display: block;
      position: relative;
    }

    [part~="base"] {
      display: grid;
      grid-auto-columns: 1fr;
      border-radius: var(--border-radius);
      background: var(--base-background);
    }
  `;

  /**
   * @internal
   */
  readonly #CHILD_TAB_TAG_NAME = "util-tab";

  /**
   * @internal
   */
  #childTabs: UtilTabElement[] = [];
  /**
   * @internal
   */
  get childTabs() {
    return this.#childTabs;
  }
  /**
   * @internal
   */
  set childTabs(value: UtilTabElement[]) {
    this.#childTabs = value;
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
    const oldValue = this.value;
    this.#value = value;
    this.#updateSelection();
    this.requestUpdate("value", oldValue);
    this.dispatchEvent(new CustomEvent("tabChange", { detail: value }));
  }

  /**
   * @internal
   */
  updateChildTabs() {
    this.childTabs = [...this.children].filter(
      (child) => child.tagName === this.#CHILD_TAB_TAG_NAME.toLocaleUpperCase()
    ) as UtilTabElement[];
  }

  render() {
    return html` <slot part="base"></slot> `;
  }

  #updateSelection() {
    let selectedIndex = this.childTabs.findIndex(
      (tab) => tab.actualValue === this.value
    );
    selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
    this.childTabs.forEach((tab, i) => {
      tab.selected = i === selectedIndex ? true : false;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-tabs": UtilTabsElement;
  }
}
