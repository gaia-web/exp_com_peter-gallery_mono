import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MyTabs } from "./tabs";

@customElement("my-tab")
export class MyTab extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 10px;
      user-select: none;
      cursor: pointer;
      border-radius: var(--border-radius);
      color: var(--item-color);
    }

    :host([selected]) {
      background: var(--item-highlight-background);
    }
  `;

  readonly #PARENT_TABS_ELEMENT_TAG_NAME = "my-tabs";

  #parentTabsElement?: MyTabs;

  /**
   * Value of the tab.
   */
  @property({ reflect: true }) value?: string;

  /**
   * @internal
   */
  @property({ type: Boolean, reflect: true }) selected?: boolean;

  get actualValue() {
    return this.value ?? this.innerText;
  }

  constructor() {
    super();
    this.addEventListener(
      "click",
      () =>
        this.#parentTabsElement &&
        (this.#parentTabsElement.value = this.actualValue)
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.#parentTabsElement = this.#findParentTabsElement();
    this.#parentTabsElement?.updateChildTabs();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#parentTabsElement?.updateChildTabs();
  }

  render() {
    return html` <slot></slot> `;
  }

  #findParentTabsElement() {
    let walker = this.parentElement;
    while (walker) {
      if (
        walker?.tagName === this.#PARENT_TABS_ELEMENT_TAG_NAME.toUpperCase()
      ) {
        return walker as MyTabs;
      }
      walker = walker.parentElement;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-tab": MyTab;
  }
}
