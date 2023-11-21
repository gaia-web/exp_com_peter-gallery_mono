import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import L from "leaflet";

import leafletCSS from "leaflet/dist/leaflet.css?inline";

/**
 * The customized map.
 *
 * @cssprop --base-background - base background of the map.
 * @cssprop --polygon-highlight-fill-color - highlight fill color of polygons.
 * @cssprop --polygon-dim-fill-color - dim fill color of polygons.
 * @cssprop --polygon-fill-color - default fill color of polygons.
 * @cssprop --color - default text color.
 * @cssprop --contrast-color - contrast text color.
 *
 * @fires countrySelect - Occurs when a country is selected. The event `detail` prop gives the GeoJSON feature of the country.
 */
@customElement("util-map")
export class UtilMapElement extends LitElement {
  /**
   * @internal
   */
  #mapInstance?: L.Map;
  /**
   * @internal
   */
  #areasGeoJSON?: GeoJSON.FeatureCollection;
  /**
   * @internal
   */
  #countriesGeoJSON?: GeoJSON.FeatureCollection;
  /**
   * @internal
   */
  #areasLayer?: L.Layer;
  /**
   * @internal
   */
  #countriesLayer?: L.Layer;
  /**
   * @internal
   */
  #mapContainerRef: Ref<HTMLDivElement> = createRef();

  /**
   * The default center.
   */
  @property({ reflect: true })
  defaultCenter: [number, number] = [0, 0];

  /**
   * The default zoom.
   */
  @property({ reflect: true })
  defaultZoom: number = 2;

  /**
   * The source of areas geojson.
   */
  @property({ reflect: true })
  areas: string = "";

  /**
   * The source of countries geojson.
   */
  @property({ reflect: true })
  countries: string = "";

  /**
   * @internal
   */
  #area?: string;
  /**
   * The selected area name. If `undefined`, no area is selected.
   */
  @property({ reflect: true })
  set area(value: string | undefined) {
    this.#area = value;
    this.#updateArea();
  }
  get area() {
    return this.#area;
  }

  /**
   * Callback of getting the label position of an area.
   */
  @property()
  obtainAreaLabelPositionCallback: (
    feature?: GeoJSON.Feature
  ) => [number, number] | undefined = () => undefined;

  /**
   * Callback of getting the label position of a country.
   */
  @property()
  obtainCountryLabelPositionCallback: (
    feature?: GeoJSON.Feature
  ) => [number, number] | undefined = () => undefined;

  /**
   * Callback of getting the displayed label of an area.
   */
  @property()
  obtainAreaDisplayedLabelCallback: (feature?: GeoJSON.Feature) => string = (
    feature
  ) => feature?.id?.toString() ?? "";

  /**
   * Callback of getting the displayed label of a country.
   */
  @property()
  obtainCountryDisplayedLabelCallback: (feature?: GeoJSON.Feature) => string = (
    feature
  ) => feature?.id?.toString() ?? "";

  /**
   * Callback of getting the preview image of a country.
   */
  @property()
  obtainCountryImageCallback: (feature?: GeoJSON.Feature) => string = () =>
    "https://picsum.photos/300";

  /**
   * Callback of an area's validity.
   */
  @property()
  validateAreaCallback: (feature?: GeoJSON.Feature) => boolean = () => true;

  /**
   * Callback of a country's validity.
   */
  @property()
  validateCountryCallback: (feature?: GeoJSON.Feature) => boolean = () => true;

  async firstUpdated() {
    this.#mapInstance = this.generateMapInstance();
    this.#disableUserZoom();
    this.#areasGeoJSON = await fetch(this.areas).then((response) =>
      response.json()
    );
    this.#countriesGeoJSON = await fetch(this.countries).then((response) =>
      response.json()
    );
    this.#areasLayer = this.generateCoutinentsGeoJSONLayer();
    this.#countriesLayer = this.generateCountriesGeoJSONLayer();
    this.#updateArea();
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
      zoomControl: false,
      maxBounds: mapBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 2,
    }).setView(this.defaultCenter, this.defaultZoom);
  }

  generateCoutinentsGeoJSONLayer() {
    const layerGroup = L.layerGroup();
    L.geoJSON(this.#areasGeoJSON, {
      style: (feature) => ({
        color: "var(--color)",
        fillColor: this.validateAreaCallback(feature)
          ? "var(--polygon-fill-color)"
          : "var(--polygon-dim-fill-color)",
        fillOpacity: 0.9,
        weight: 2,
      }),
      onEachFeature: (feature, layer) => {
        if (!this.#mapInstance) return;
        const displayedLabel = this.obtainAreaDisplayedLabelCallback(feature);
        const divIcon = L.divIcon({
          html: displayedLabel,
          className: "location-label",
        });

        const divIconInvert = L.divIcon({
          html: displayedLabel,
          className: "location-label invert",
        });

        // TODO in case the layer is not a polygon
        const specicalBoundsCoordinates = feature.properties.zoomInBounds?.map(
          (item: [][]) => item.map((coords) => coords.reverse())
        );
        const specicalBounds = specicalBoundsCoordinates
          ? L.polygon([...specicalBoundsCoordinates]).getBounds()
          : undefined;
        const bounds = specicalBounds ?? (layer as L.Polygon).getBounds();
        const specialLabelPosition = this.obtainAreaLabelPositionCallback(
          feature
        )?.reverse() as [number, number] | undefined;
        const labelPosition = specialLabelPosition ?? bounds?.getCenter();
        const marker = L.marker(labelPosition, {
          icon: divIcon,
        });
        marker.addTo(layerGroup);

        if (this.validateAreaCallback(feature)) {
          layer
            .on("mouseover", (event) => {
              event.target.setStyle({
                fillColor: "var(--polygon-highlight-fill-color)",
              });
              marker.setIcon(divIconInvert);
            })
            .on("mouseout", (event) => {
              event.target.setStyle({ fillColor: "var(--polygon-fill-color)" });
              marker.setIcon(divIcon);
            })
            .on("click", () => {
              this.area = feature.properties.name;
            });
          layerGroup.on("remove", () => {
            (layer as L.GeoJSON).setStyle({
              fillColor: "var(--polygon-fill-color)",
            });
            marker.setIcon(divIcon);
          });
        }
      },
    }).addTo(layerGroup);
    return layerGroup;
  }

  // TODO refator
  generateCountriesGeoJSONLayer() {
    const layerGroup = L.layerGroup();
    L.geoJSON(this.#countriesGeoJSON, {
      style: (feature) => ({
        color: "var(--color)",
        fillColor: this.validateCountryCallback(feature)
          ? "var(--polygon-fill-color)"
          : "var(--polygon-dim-fill-color)",
        fillOpacity: 0.9,
        weight: 2,
      }),
      onEachFeature: (feature, layer) => {
        if (!this.#mapInstance) return;
        const displayedLabel =
          this.obtainCountryDisplayedLabelCallback(feature);
        const divIcon = L.divIcon({
          html: displayedLabel,
          className: "location-label",
        });

        const divIconInvert = L.divIcon({
          html: displayedLabel,
          className: "location-label invert",
        });

        // TODO in case the layer is not a polygon
        const specicalBoundsCoordinates = feature.properties.zoomInBounds?.map(
          (item: [][]) => item.map((coords) => coords.reverse())
        );
        const specicalBounds = specicalBoundsCoordinates
          ? L.polygon([...specicalBoundsCoordinates]).getBounds()
          : undefined;
        const bounds = specicalBounds ?? (layer as L.Polygon).getBounds();
        const specialLabelPosition = this.obtainCountryLabelPositionCallback(
          feature
        )?.reverse() as [number, number] | undefined;
        const labelPosition = specialLabelPosition ?? bounds?.getCenter();
        const marker = L.marker(labelPosition, {
          icon: divIcon,
        });
        marker.addTo(layerGroup);

        if (this.validateCountryCallback(feature)) {
          layer
            .on("mouseover", (event) => {
              event.target.setStyle({
                fillColor: "var(--polygon-highlight-fill-color)",
              });
              marker.setIcon(divIconInvert);
            })
            .on("mouseout", (event) => {
              event.target.setStyle({ fillColor: "var(--polygon-fill-color)" });
              marker.setIcon(divIcon);
            })
            .on("click", () => {
              this.dispatchEvent(
                new CustomEvent("countrySelect", { detail: feature })
              );
            })
            .bindTooltip(
              /* html */ `<img src="${this.obtainCountryImageCallback(
                feature
              )}" alt="${this.obtainCountryDisplayedLabelCallback(
                feature
              )}" height="100" width="100"/>`,
              {
                direction: "top",
                sticky: true,
                offset: [0, -10],
              }
            );
          layerGroup.on("remove", () => {
            (layer as L.GeoJSON).setStyle({
              fillColor: "var(--polygon-fill-color)",
            });
            marker.setIcon(divIcon);
          });
        }
      },
    }).addTo(layerGroup);
    return layerGroup;
  }

  #updateArea() {
    if (!this.#mapInstance) return;
    switch (typeof this.area) {
      case "string": {
        this.#areasLayer?.remove();
        this.#countriesLayer?.addTo(this.#mapInstance);
        const areaFeature = this.#areasGeoJSON?.features?.find(
          ({ properties }) => properties?.name === this.area
        );
        const areaZoomInBoundsCoordinates =
          areaFeature?.properties?.zoomInBounds ??
          (areaFeature?.geometry as { coordinates?: [][][] })?.coordinates?.map(
            (item: [][]) => item.map((coords) => coords.reverse())
          );
        const areaZoomInBounds = L.polygon([
          ...areaZoomInBoundsCoordinates,
        ]).getBounds();
        this.#mapInstance.fitBounds(areaZoomInBounds);
        break;
      }
      default: {
        this.#countriesLayer?.remove();
        this.#areasLayer?.addTo(this.#mapInstance);
        this.#mapInstance.setView(this.defaultCenter, this.defaultZoom);
        break;
      }
    }
  }

  #disableUserZoom() {
    this.#mapInstance?.touchZoom.disable();
    this.#mapInstance?.doubleClickZoom.disable();
    this.#mapInstance?.scrollWheelZoom.disable();
    this.#mapInstance?.boxZoom.disable();
  }

  static styles = [
    unsafeCSS(leafletCSS),
    css`
      :host {
        --base-background: hsl(0, 0%, 0%);
        --polygon-highlight-fill-color: hsl(0, 0%, 100%);
        --polygon-dim-fill-color: hsl(0, 0%, 20%);
        --polygon-fill-color: hsl(0, 0%, 50%);
        --color: hsl(0, 0%, 100%);
        --contrast-color: hsl(0, 0%, 20%);

        display: block;
      }

      #map {
        background: var(--base-background);
        height: 100%;
        width: 100%;

        & :focus {
          outline: initial;
        }
      }

      .location-label {
        color: var(--color);
        pointer-events: none !important;

        &.invert {
          color: var(--contrast-color);
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
