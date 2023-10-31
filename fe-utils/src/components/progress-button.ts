import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * A button with the progress ring.
 *
 * @cssprop --progress - to indicate the progress
 * @cssprop --ring-width - the width of the progress ring
 * @cssprop --ring-color - the color of the progress ring
 * @cssprop --background - the background (it should not be transparent)
 */
@customElement("util-progress-button")
export class UtilProgressButtonElement extends LitElement {
  static styles = css`
    :host {
      --progress: 0;
      --ring-width: 3px;
      --ring-color: hsl(180, 50%, 50%);
      --background: hsl(0, 0%, 100%);

      display: block;
      width: 100px;
      height: 100px;
      cursor: pointer;
    }

    [part~="base"] {
      --progress-degree: calc(var(--progress) * 360deg);

      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: conic-gradient(
        var(--ring-color) 0deg,
        var(--ring-color) var(--progress-degree),
        var(--background) var(--progress-degree)
      );
      pointer-events: none;
    }

    [part~="content"] {
      display: block;
      position: absolute;
      inset: var(--ring-width);
      border-radius: 50%;
      background: var(--background);
      pointer-events: none;
    }
  `;

  render() {
    return html`
      <div part="base">
        <slot part="content"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-progress-button": UtilProgressButtonElement;
  }
}
