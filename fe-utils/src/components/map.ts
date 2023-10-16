import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import L from "leaflet";
import { GeoJsonObject } from "geojson";

import leafletCSS from "leaflet/dist/leaflet.css?inline";
import continentsGeoJSON from "../assets/continents.geo.json";
import countriesGeoJSON from "../assets/countries.geo.json";

const SPECIAL_BOUNDS: Record<string, L.LatLngBounds> = {
  Asia: L.polygon([
    ...([
      [179.46274569119493, 82.2110709480568],
      [25.493925205828447, 82.2110709480568],
      [25.493925205828447, -12.087325005120078],
      [179.46274569119493, -12.087325005120078],
      [179.46274569119493, 82.2110709480568],
    ].map((item) => item.reverse()) as [][]),
  ]).getBounds(),
  Oceania: L.polygon([
    ...([
      [206.24720078906353, 20.467703267962534],
      [165.1729148980914, 20.467703267962534],
      [165.1729148980914, -47.0426837919749],
      [206.24720078906353, -47.0426837919749],
      [206.24720078906353, 20.467703267962534],
    ].map((item) => item.reverse()) as [][]),
  ]).getBounds(),
};

const HIGHLIGHT_COLOR = "hsl(0, 0%, 100%)";
const DIM_COLOR = "hsl(0, 0%, 50%)";

@customElement("util-map")
export class UtilMapElement extends LitElement {
  /**
   * @internal
   */
  #mapInstance?: L.Map;
  /**
   * @internal
   */
  #continentsGeoJSONLayer?: L.GeoJSON;
  /**
   * @internal
   */
  #countriesGeoJSONLayer?: L.GeoJSON;
  /**
   * @internal
   */
  #mapContainerRef: Ref<HTMLDivElement> = createRef();

  /**
   * Determine the detail level of the map content. 
   * Available values are `"continents"` and `"countries"`. 
   * Default to `"continents"`.
   */
  @property({ attribute: "detail-level", reflect: true })
  detailLevel: "continents" | "countries" = "continents";

  firstUpdated() {
    this.#mapInstance = this.generateMapInstance();
    this.#continentsGeoJSONLayer = this.generateCoutinentsGeoJSONLayer();
    this.#countriesGeoJSONLayer = this.generateCountriesGeoJSONLayer();
    this.#updateDetailLevel(this.detailLevel);
  }

  render() {
    return html` <div id="map" ${ref(this.#mapContainerRef)}></div> `;
  }

  generateMapInstance() {
    const mapContainer = this.#mapContainerRef.value;
    if (!mapContainer) return;

    const mapBounds = new L.LatLngBounds(
      new L.LatLng(-90, -180),
      new L.LatLng(90, 180)
    );
    return L.map(mapContainer, {
      maxBounds: mapBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 2,
    }).setView([0, 0], 2);
  }

  generateCoutinentsGeoJSONLayer() {
    return L.geoJSON(continentsGeoJSON as GeoJsonObject, {
      style: () => ({
        color: HIGHLIGHT_COLOR,
        fillColor: DIM_COLOR,
        fillOpacity: 0.9,
        weight: 2,
      }),
      onEachFeature: (feature, layer) => {
        if (!this.#mapInstance) return;
        const divIcon = L.divIcon({
          html: feature.properties.CONTINENT,
          className: "location-label continent",
        });

        const divIconInvert = L.divIcon({
          html: feature.properties.CONTINENT,
          className: "location-label continent invert",
        });

        // TODO in case the layer is not a polygon
        const bounds =
          SPECIAL_BOUNDS[feature.properties.CONTINENT] ??
          (layer as L.Polygon).getBounds();
        const center = bounds?.getCenter();
        const marker = L.marker(center, {
          icon: divIcon,
        });
        marker.addTo(this.#mapInstance);

        layer
          .on("mouseover", (event) => {
            event.target.setStyle({ fillColor: HIGHLIGHT_COLOR });
            marker.setIcon(divIconInvert);
          })
          .on("mouseout", (event) => {
            event.target.setStyle({ fillColor: DIM_COLOR });
            marker.setIcon(divIcon);
          })
          .on("click", () => {
            // TODO in case the layer is not a polygon
            const bounds =
              SPECIAL_BOUNDS[feature.properties.CONTINENT] ??
              (layer as L.Polygon).getBounds();
            if (!bounds) return;
            this.#mapInstance?.fitBounds(bounds);
            this.#updateDetailLevel("countries");
          });
      },
    });
  }

  // TODO refator
  generateCountriesGeoJSONLayer() {
    return L.geoJSON(countriesGeoJSON as GeoJsonObject, {
      style: () => ({
        color: HIGHLIGHT_COLOR,
        fillColor: DIM_COLOR,
        fillOpacity: 0.9,
        weight: 2,
      }),
      onEachFeature: (feature, layer) => {
        if (!this.#mapInstance) return;
        const divIcon = L.divIcon({
          html: feature.properties.ADMIN,
          className: "location-label country",
        });

        const divIconInvert = L.divIcon({
          html: feature.properties.ADMIN,
          className: "location-label country invert",
        });

        // TODO in case the layer is not a polygon
        const bounds =
          SPECIAL_BOUNDS[feature.properties.ADMIN] ??
          (layer as L.Polygon).getBounds();
        const center = bounds?.getCenter();
        const marker = L.marker(center, {
          icon: divIcon,
        });
        marker.addTo(this.#mapInstance);

        layer
          .on("mouseover", (event) => {
            event.target.setStyle({ fillColor: HIGHLIGHT_COLOR });
            marker.setIcon(divIconInvert);
          })
          .on("mouseout", (event) => {
            event.target.setStyle({ fillColor: DIM_COLOR });
            marker.setIcon(divIcon);
          })
          .on("click", () => {
            // TODO in case the layer is not a polygon
            const bounds =
              SPECIAL_BOUNDS[feature.properties.CONTINENT] ??
              (layer as L.Polygon).getBounds();
            if (!bounds) return;
            this.#mapInstance?.setZoom(2);
            this.#updateDetailLevel("continents");
          });
      },
    }).bindTooltip(
      '<img src="https://avatars.githubusercontent.com/u/26160377?v=4" height="100" width="100"/>',
      {
        direction: "top",
        sticky: true,
        offset: [0, -10],
      }
    );
  }

  #updateDetailLevel(detailLevel: "continents" | "countries") {
    this.detailLevel = detailLevel;
    if (!this.#mapInstance) return;
    switch (detailLevel) {
      case "continents":
        this.#countriesGeoJSONLayer?.remove();
        this.#continentsGeoJSONLayer?.addTo(this.#mapInstance);
        break;
      case "countries":
        this.#continentsGeoJSONLayer?.remove();
        this.#countriesGeoJSONLayer?.addTo(this.#mapInstance);
        break;
    }
  }

  static styles = [
    unsafeCSS(leafletCSS),
    css`
      :host {
        display: block;
      }

      #map {
        background: hsl(0, 0%, 0%);
        height: 100%;
        width: 100%;

        & :focus {
          outline: initial;
        }
      }

      .location-label {
        color: white;
        pointer-events: none !important;

        &.invert {
          filter: invert(1);
        }

        :host([detail-level="countries"]) &.continent {
          display: none;
        }

        :host([detail-level="continents"]) &.country {
          display: none;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "util-map": UtilMapElement;
  }
}
