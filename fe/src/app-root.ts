import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@thepassle/app-tools/router.js";

const BASE_URL: string = (import.meta as any).env.BASE_URL;

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    #page-main {
      view-transition-name: page-main;
    }
  `;

  router?: Router;

  constructor() {
    super();
    this.#initialize();
  }

  firstUpdated() {
    this.router?.addEventListener("route-changed", () => {
      if ("startViewTransition" in document) {
        (document as any).startViewTransition(() => this.requestUpdate());
        return;
      }
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <header>Header Placeholder</header>
      <main id="page-main">${this.router?.render()}</main>
      <footer>Footer Placeholder</footer>
    `;
  }

  async #initialize() {
    await this.#applyURLPatternPolyfill();
    this.#createRouter();
  }

  async #applyURLPatternPolyfill() {
    if (!(globalThis as any).URLPattern) {
      await import("urlpattern-polyfill");
    }
  }

  #createRouter() {
    this.router = new Router({
      routes: [
        {
          path: this.#resolveRouterPath(),
          title: "Home",
          render: () => html`<page-home></page-home>`,
        },
        {
          path: this.#resolveRouterPath(":id"),
          title: "About",
          render: ({ params: { id } }) =>
            html`<page-fallback>${id}</page-fallback>`,
        },
      ],
    });
  }

  #resolveRouterPath(unresolvedPath?: string) {
    var resolvedPath = BASE_URL;
    if (unresolvedPath) {
      resolvedPath = resolvedPath + unresolvedPath;
    }
    return resolvedPath;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
