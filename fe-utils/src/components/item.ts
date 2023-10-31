import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("util-item")
export class UtilItemElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      overflow: hidden;
    }

    :host([orientation="vertical"]) {
      flex-direction: column;
    }

    slot {
      display: block;

      &[name="start"] {
        flex: 0 0 auto;
      }

      &:not([name]) {
        flex: 1 1 auto;
      }

      &[name="end"] {
        flex: 0 0 auto;
      }
    }
  `;

  /**
   * The orientation of the item.
   * Possible values are `"horizontal"` and `"vertical"`.
   * Default to `"horizontal"`.
   */
  @property({ reflect: true })
  orientation: "horizontal" | "vertical" = "horizontal";

  render() {
    return html`
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-item": UtilItemElement;
  }
}
