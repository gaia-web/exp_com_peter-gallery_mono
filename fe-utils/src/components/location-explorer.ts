import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@hey-web-components/leaflet";
import { until } from "lit/directives/until.js";
import { GeoJSONOptions } from "leaflet";

const HIGHLIGHT_COLOR = "hsl(0, 0%, 100%)";
const DIM_COLOR = "hsl(0, 0%, 50%)";

/**
 * Foo bar.
 */
@customElement("util-location-explorer")
export class UtilLocationExplorerElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  /**
   * The source of continents geojson.
   */
  @property({ reflect: true })
  continents: string = "";

  /**
   * The source of countries geojson.
   */
  @property({ reflect: true })
  countries: string = "";

  /**
   * Determine the detail level of the map content.
   * Available values are `"continents"` and `"countries"`.
   * Default to `"continents"`.
   */
  @property({ attribute: "detail-level", reflect: true })
  detailLevel: "continents" | "countries" = "continents";

  render() {
    return html`
      <hey-leaflet-map>
        <hey-leaflet-geojson
          name="Continents"
          type="overlay"
          .geojson=${until(
            fetch(this.continents).then((response) => response.json())
          )}
          .initialOptions=${{
            style: () => {
              return {
                color: HIGHLIGHT_COLOR,
                fillColor: DIM_COLOR,
                fillOpacity: 0.9,
                weight: 2,
              };
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as GeoJSONOptions as any}
        ></hey-leaflet-geojson>
        <hey-leaflet-geojson
          name="Countries"
          type="overlay"
          inactive
          .geojson=${until(
            fetch(this.countries).then((response) => response.json())
          )}
        ></hey-leaflet-geojson>
      </hey-leaflet-map>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "util-location-explorer": UtilLocationExplorerElement;
  }
}
