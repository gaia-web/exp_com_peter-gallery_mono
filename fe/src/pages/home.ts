import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import litLogo from "../assets/lit.svg";
import viteLogo from "/vite.svg";
import "fe-utils";

@customElement("page-home")
export class AppHomePage extends LitElement {
  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src=${viteLogo}
            class="h-24 p-6 text-center transition-filter duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite logo"
          />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img
            src=${litLogo}
            class="h-24 p-6 text-center transition-filter duration-300 hover:drop-shadow-[0_0_2em_#325cffaa]"
            alt="Lit logo"
          />
        </a>
        <h1 class="m-auto ">Vite + Lit</h1>
        <a
          href="/other"
          class="font-medium no-underline text-[#646cff] hover:text-[#535bf2] dark:hover:text-[#747bff]"
          >Other page</a
        >
        <my-map id="map" class="mt-24 h-[600px] w-full"></my-map>
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
    "page-home": AppHomePage;
  }
}
