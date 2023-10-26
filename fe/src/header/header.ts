import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "fe-utils";

@customElement("fe-header")
export class Header extends LitElement {
  #tabs_value: string = "one";

  get tabs_value() {
    return this.#tabs_value;
  }

  @property()
  set tabs_value(input: string) {
    const oldValue = this.#tabs_value;
    this.#tabs_value = input;
    this.requestUpdate("tabs_value", oldValue);
  }

  render() {
    return html` <div class="flex m-auto pt-6 max-w justify-between">
      <div
        class="ml-12 px-12 border border-solid border-white rounded-md flex items-center justify-center text-white"
      >
        Search bar space holder
      </div>
      <util-tabs
        class="mr-12"
        value=${this.tabs_value}
        @tabChange=${({ detail }: CustomEvent<string>) =>
          (this.tabs_value = detail)}
      >
        <util-tab class="hover:text-yellow" value="one">One</util-tab>
        <util-tab value="two">Two</util-tab>
        <util-tab value="three">Three</util-tab>
      </util-tabs>
    </div>`;
  }

  static styles = css`
    @unocss-placeholder;
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "fe-header": Header;
  }
}
