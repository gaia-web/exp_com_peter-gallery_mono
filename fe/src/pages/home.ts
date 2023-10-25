import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "fe-utils";

@customElement("page-home")
export class HomePage extends LitElement {
  render() {
    return html`
      <div>
        <a
          href="/other"
          class="font-medium no-underline text-[#646cff] hover:text-[#535bf2] dark:hover:text-[#747bff]"
          >Other page</a
        >
        <util-map id="map" class="mt-24 h-[600px] w-full"></util-map>
      </div>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    @unocss-placeholder;
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "page-home": HomePage;
  }
}
