import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * A set of buttons to jump through pages.
 *
 * @slot first - the content of button pointing to the first page.
 * @slot previous - the content of button pointing to the previous page.
 * @slot next - the content of button pointing to the next page.
 * @slot last - the content of button pointing to the last page.
 * @slot any - the content of button pointing to any page.
 * @slot page-(page_number) - the content of button pointing to the indexed page.
 *
 * @csspart base - the main part of the element.
 * @csspart first - the button pointing to the first page.
 * @csspart previous - the button pointing to the previous page.
 * @csspart next - the button pointing to the next page.
 * @csspart last - the button pointing to the last page.
 * @csspart any - the button pointing to any page.
 * @csspart page-(page_number) - the button pointing to the indexed page.
 * @csspart button - the button.
 * @csspart number-button - the number button.
 * @csspart jump-buttom - the button that is not a number button.
 *
 * @cssprop --background - background for the buttons.
 * @cssprop --border - border for the buttons.
 * @cssprop --border-radius - border radius for the buttons.
 *
 * @fires pageChange - Occurs when the page number is changed. The event `detail` prop gives the new page number.
 */
@customElement("util-pagination")
export class UtilPaginationElement extends LitElement {
  static styles = css`
    :host {
      --background: hsl(0, 0%, 90%);
      --border: none;
      --border-radius: 10px;

      display: block;
      height: fit-content;
      width: fit-content;
    }

    [part~="base"] {
      display: grid;
      grid-auto-columns: 1fr;
      height: fit-content;
      width: fit-content;
      gap: 5px;
    }

    button {
      grid-row: 1;
      display: block;
      padding: 0.5rem;
      cursor: pointer;
      user-select: none;
      background: var(--background);
      border: var(--border);
      border-radius: var(--border-radius);

      &[disabled] {
        cursor: not-allowed;

        &[part~="number-button"] {
          filter: brightness(1.08);
        }
      }

      &:not([disabled]) {
        &:hover {
          filter: invert(0.9);
        }

        &:active {
          filter: brightness(0.75);
        }
      }
    }
  `;

  /**
   * @internal
   */
  #pageNumber = 1;
  /**
   * The current page number. Start from `1` and default to `1`;
   */
  get pageNumber() {
    return this.#pageNumber;
  }
  @property({ attribute: "page-index", type: Number, reflect: true })
  set pageNumber(value: number) {
    this.#pageNumber = value;
    this.dispatchEvent(new CustomEvent("pageChange", { detail: value }));
  }

  /**
   * @internal
   */
  #pageCount = 1;
  /**
   * The page count.
   */
  get pageCount() {
    return this.#pageCount;
  }
  @property({ attribute: "page-count", type: Number, reflect: true })
  set pageCount(value: number) {
    this.#pageCount = value;
  }

  /**
   * @internal
   */
  #maxNumberButtonCount = 5;
  /**
   * The maximum number button count. Default to 5.
   */
  get maxNumberButtonCount() {
    return this.#maxNumberButtonCount;
  }
  @property({
    attribute: "max-number-button-count",
    type: Number,
    reflect: true,
  })
  set maxNumberButtonCount(value: number) {
    this.#maxNumberButtonCount = value;
  }

  /**
   * @internal
   */
  #pageNumberToLabel?: (pageNumber: number) => string;
  /**
   * A callback function to convert a page number to the displayed label.
   * If not specify, the page number itself is used as the label.
   */
  get pageNumberToLabel() {
    return this.#pageNumberToLabel;
  }
  @property({ attribute: false, reflect: true }) set pageNumberToLabel(
    value: ((pageNumber: number) => string) | undefined
  ) {
    this.#pageNumberToLabel = value;
  }

  render() {
    const renderedPageNumbers = this.#calculateRenderedPageNumbers();

    return html`
      <div part="base">
        <button
          part="button jump-button first"
          @click=${() => (this.pageNumber = 1)}
          ?disabled=${this.pageNumber <= 1}
        >
          <slot name="first">${"<<"}</slot>
        </button>
        <button
          part="button jump-button previous"
          @click=${() => (this.pageNumber -= 1)}
          .disabled=${this.pageNumber <= 1}
        >
          <slot name="previous">${"<"}</slot>
        </button>
        ${renderedPageNumbers.map(
          (pageNumber) =>
            html`<button
              part=${`button number-button ${pageNumber}`}
              @click=${() => (this.pageNumber = pageNumber)}
              ?disabled=${this.pageNumber === pageNumber}
            >
              <slot name=${`page-${pageNumber}`}
                >${this.#pageNumberToLabel?.(pageNumber) ?? pageNumber}</slot
              >
            </button>`
        )}
        <button
          part="button jump-button next"
          @click=${() => (this.pageNumber += 1)}
          ?disabled=${this.pageNumber >= this.pageCount}
        >
          <slot name="next jump-button">${">"}</slot>
        </button>
        <button
          part="button jump-button last"
          @click=${() => (this.pageNumber = this.pageCount)}
          ?disabled=${this.pageNumber >= this.pageCount}
        >
          <slot name="last jump-button">${">>"}</slot>
        </button>
        <button
          part="button jump-button any"
          @click=${() => this.#selectPageNumberAndJumpToThatPage()}
        >
          <slot name="any">...</slot>
        </button>
      </div>
    `;
  }

  #calculateRenderedPageNumbers() {
    const pageNumbers = new Array(this.pageCount)
      .fill(true)
      .map((_, i) => i + 1);
    const startPageNumber = Math.max(
      this.pageNumber - Math.floor(this.maxNumberButtonCount / 2),
      1
    );
    let startIndex = startPageNumber - 1;
    if (this.pageCount - startIndex < this.maxNumberButtonCount) {
      startIndex = Math.max(this.pageCount - this.maxNumberButtonCount, 0);
    }
    const renderedPageNumbers = pageNumbers.slice(
      startIndex,
      startIndex + this.maxNumberButtonCount
    );
    return renderedPageNumbers;
  }

  #selectPageNumberAndJumpToThatPage() {
    const input = prompt("Enter a page number:", this.pageNumber.toString());
    if (input == null) {
      return;
    }
    const pageNumber = +(input ?? "") ?? this.pageNumber;
    if (pageNumber < 1 || pageNumber > this.pageCount) {
      alert("Invalid page number entered.");
      return;
    }
    this.pageNumber = pageNumber;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-pagination": UtilPaginationElement;
  }
}
