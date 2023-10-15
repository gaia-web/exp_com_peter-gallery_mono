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
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
        <h1>Vite + Lit</h1>
        <a href="/other">Other page</a>
        <my-map id="map"></my-map>
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

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;

      &:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }

      &.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;

      &:hover {
        color: #535bf2;

        @media (prefers-color-scheme: light) {
          color: #747bff;
        }
      }
    }

    #map {
      margin-top: 100px;
      height: 600px;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "page-home": AppHomePage;
  }
}
