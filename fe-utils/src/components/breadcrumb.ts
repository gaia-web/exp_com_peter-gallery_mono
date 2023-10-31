import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Breadcrumbs helps to navgate within a hierarchy.
 *
 * @csspart item - the breadcrumb item.
 * @csspart delimiter - the delimiter.
 *
 * @fires itemSelect - Occurs when an breadcrumb item is selected. The event `detail` prop gives the `path` of the selected item.
 */
@customElement("util-breadcrumb")
export class UtilBreadcrumbElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }

    [part~="item"] {
      margin: 0 10px;
      cursor: pointer;

      &:last-of-type {
        font-weight: bold;
      }

      &:hover {
        transform: scale(1.1);
      }
    }

    [part~="delimiter"] {
      pointer-events: none;
      user-select: none;
    }
  `;

  /**
   * The path as an array.
   */
  @property({ type: Array, reflect: true })
  path: (string | number)[] = [];

  /**
   * The delimiter as an array.
   */
  @property({ reflect: true })
  delimiter: string = ">";

  render() {
    return html`
      ${this.path?.map(
        (item, i) =>
          html`<div
              part="item"
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent("itemSelect", {
                    detail: this.path?.slice(0, i + 1),
                  })
                )}
            >
              ${item}
            </div>
            ${i < this.path.length - 1
              ? html`<div part="delimiter">${this.delimiter}</div>`
              : ""}`
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-breadcrumb": UtilBreadcrumbElement;
  }
}
