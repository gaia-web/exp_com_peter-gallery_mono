import { LitElement, css, html } from "lit";
import { consume } from "@lit/context";
import { customElement, property } from "lit/decorators.js";
import { UtilTabsElement, tabsContext } from "./tabs";

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

  /**
   * @internal
   */
  @consume({ context: tabsContext })
  private tabsElement?: UtilTabsElement;

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
      () => this.tabsElement && (this.tabsElement.value = this.actualValue)
    );
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.tabsElement) {
      return;
    }
    this.tabsElement.childTabSet.add(this);
    this.tabsElement.childTabSet = this.tabsElement.childTabSet;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.tabsElement) {
      return;
    }
    this.tabsElement.childTabSet.delete(this);
    this.tabsElement.childTabSet = this.tabsElement.childTabSet;
  }

  render() {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-tab": UtilTabElement;
  }
}
