import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-fallback")
export class AppFallBackPage extends LitElement {
  render() {
    return html`
      <h1>Fallback Page</h1>
      ID: <slot></slot>
      <hr />
      <a href="/">Home page</a>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "page-fallback": AppFallBackPage;
  }
}
