import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UtilTabsElement } from "./tabs";

@customElement("util-tab")
export class UtilTabElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      grid-row: 1;
      text-align: center;
      padding: 10px;
      user-select: none;
      cursor: pointer;
    }

    :host([selected]) {
      font-weight: bold;
    }
  `;

  readonly #PARENT_TABS_ELEMENT_TAG_NAME = "util-tabs";

  #parentTabsElement?: UtilTabsElement;

  /**
   * Value of the tab.
   */
  @property({ reflect: true })
  accessor value: string | undefined;

  /**
   * @internal
   */
  @property({ type: Boolean, reflect: true })
  accessor selected: boolean | undefined;

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
        return walker as UtilTabsElement;
      }
      walker = walker.parentElement;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-tab": UtilTabElement;
  }
}
