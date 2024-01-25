import { LitElement, PropertyValueMap, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import L from "leaflet";

import leafletCSS from "leaflet/dist/leaflet.css?inline";

/**
 * A map based geo-location explorer.
 *
 * @cssprop --base-background - base background of the map.
 * @cssprop --polygon-highlight-fill-color - highlight fill color of polygons.
 * @cssprop --polygon-dim-fill-color - dim fill color of polygons.
 * @cssprop --polygon-fill-color - default fill color of polygons.
 * @cssprop --color - default text color.
 * @cssprop --contrast-color - contrast text color.
 *
 * @fires areaSelect - Occurs when an area is selected. The event `detail` prop gives the GeoJSON feature of the area.
 * @fires countrySelect - Occurs when a country is selected. The event `detail` prop gives the GeoJSON feature of the country.
 */
@customElement("util-geo-explorer")
export class UtilGeoExplorerElement extends LitElement {
  /**
   * @internal
   */
  #mapInstance?: L.Map;
  /**
   * @internal
   */
  #timezoneOverlay?: L.ImageOverlay;
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
   * @internal
   */
  @state()
  areasGeoJSON?: GeoJSON.FeatureCollection;
  /**
   * @internal
   */
  @state()
  countriesGeoJSON?: GeoJSON.FeatureCollection;

  /**
   * The default center.
   */
  @property({ type: Array, reflect: true })
  defaultCenter: [number, number] = [0, 0];

  /**
   * The default zoom.
   */
  @property({ type: Number, reflect: true })
  defaultZoom: number = 2;

  /**
   * The image source of timezone overlay.
   */
  @property({ attribute: "timezone-overlay-image-src", reflect: true })
  timezoneOverlayImageSrc: string = "";

  /**
   * @internal
   */
  #areas: string = "";
  /**
   * The source of areas geojson.
   */
  @property({ reflect: true })
  set areas(value: string) {
    this.#areas = value;
    (async () =>
      (this.areasGeoJSON = await fetch(this.areas).then((response) =>
        response.json()
      )))();
  }
  get areas() {
    return this.#areas;
  }

  /**
   * @internal
   */
  #countries: string = "";
  /**
   * The source of countries geojson.
   */
  @property({ reflect: true })
  set countries(value: string) {
    this.#countries = value;
    (async () =>
      (this.countriesGeoJSON = await fetch(this.countries).then((response) =>
        response.json()
      )))();
  }
  get countries() {
    return this.#countries;
  }

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
   * Callback of getting the ID of an area.
   */
  @property()
  obtainAreaIdCallback: (feature?: GeoJSON.Feature) => string = (feature) =>
    feature?.id?.toString() ?? "";

  /**
   * Callback of getting the ID of a country.
   */
  @property()
  obtainCountryIdCallback: (feature?: GeoJSON.Feature) => string = (feature) =>
    feature?.id?.toString() ?? "";

  /**
   * Callback of getting the displayed label of an area.
   */
  @property()
  obtainAreaDisplayedLabelCallback: (feature?: GeoJSON.Feature) => string = (
    feature
  ) => this.obtainAreaIdCallback(feature);

  /**
   * Callback of getting the displayed label of a country.
   */
  @property()
  obtainCountryDisplayedLabelCallback: (feature?: GeoJSON.Feature) => string = (
    feature
  ) => this.obtainCountryIdCallback(feature);

  /**
   * Callback of getting the zoom-in bounds of an area.
   */
  @property()
  obtainAreaZoomInBoundsCallback: (
    feature?: GeoJSON.Feature
  ) => number[][][] | undefined = () => undefined;

  /**
   * Callback of getting the zoom-in bounds of a country.
   */
  @property()
  obtainCountryZoomInBoundsCallback: (
    feature?: GeoJSON.Feature
  ) => number[][][] | undefined = () => undefined;

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

  protected async firstUpdated() {
    this.#mapInstance = this.generateMapInstance();
    this.#disableUserZoom();
    this.#updateArea();
    this.#setupTimezoneOverlay();
  }

  protected willUpdate(
    changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>
  ): void {
    if (!this.#mapInstance) return;
    if (
      [...changedProperties.keys()].filter((key) =>
        [
          "areasGeoJSON",
          "obtainAreaIdCallback",
          "obtainAreaLabelPositionCallback",
          "obtainAreaDisplayedLabelCallback",
          "obtainAreaZoomInBoundsCallback",
          "validateAreaCallback",
        ].includes(key.toString())
      ).length > 0
    ) {
      this.#areasLayer = this.generateAreasGeoJSONLayer();
      this.#updateArea();
    }
    if (
      [...changedProperties.keys()].filter((key) =>
        [
          "countriesGeoJSON",
          "obtainCountryIdCallback",
          "obtainCountryLabelPositionCallback",
          "obtainCountryDisplayedLabelCallback",
          "obtainCountryZoomInBoundsCallback",
          "validateCountryCallback",
        ].includes(key.toString())
      ).length > 0
    ) {
      this.#countriesLayer = this.generateCountriesGeoJSONLayer();
      this.#updateArea();
    }
    if (changedProperties.has("timezoneOverlayImageSrc" as never)) {
      this.#setupTimezoneOverlay();
    }
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

  generateAreasGeoJSONLayer() {
    this.#areasLayer?.remove();
    const layerGroup = L.layerGroup();
    L.geoJSON(this.areasGeoJSON, {
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
        const specicalBoundsCoordinates = this.obtainAreaZoomInBoundsCallback(
          feature
        )?.map((item) => item.map((coords) => coords.reverse()));
        const specicalBounds = specicalBoundsCoordinates
          ? L.polygon([
              ...specicalBoundsCoordinates,
            ] as unknown as L.LatLngExpression[][][]).getBounds()
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
              this.dispatchEvent(
                new CustomEvent("areaSelect", { detail: feature })
              );
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
    this.#countriesLayer?.remove();
    const layerGroup = L.layerGroup();
    L.geoJSON(this.countriesGeoJSON, {
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
        const specicalBoundsCoordinates =
          this.obtainCountryZoomInBoundsCallback(feature)?.map((item) =>
            item.map((coords) => coords.reverse())
          );
        const specicalBounds = specicalBoundsCoordinates
          ? L.polygon([
              ...specicalBoundsCoordinates,
            ] as unknown as L.LatLngExpression[][][]).getBounds()
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
    if (!this.areasGeoJSON || !this.countriesGeoJSON) {
      this.#areasLayer?.remove();
      this.#countriesLayer?.remove();
      return;
    }
    switch (typeof this.area) {
      case "string": {
        this.#areasLayer?.remove();
        this.#countriesLayer?.addTo(this.#mapInstance);
        const areaFeature = this.areasGeoJSON?.features?.find(
          (feature) => this.obtainAreaIdCallback(feature) === this.area
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

  #setupTimezoneOverlay() {
    this.#timezoneOverlay?.remove();
    const bounds = this.#mapInstance?.getBounds();
    const north = bounds?.getNorth() ?? 0;
    const south = bounds?.getSouth() ?? 0;
    const height = (north - south) / 5;
    this.#timezoneOverlay = L.imageOverlay(
      this.timezoneOverlayImageSrc,
      L.latLngBounds([
        [south + height, -180],
        [south, 180],
      ])
    );
    this.#mapInstance?.on("move", () => {
      const bounds = this.#mapInstance?.getBounds();
      const north = bounds?.getNorth() ?? 0;
      const south = bounds?.getSouth() ?? 0;
      const height = (north - south) / 5;
      this.#timezoneOverlay?.setBounds(
        L.latLngBounds([
          [south + height, -180],
          [south, 180],
        ])
      );
    });
    this.#mapInstance?.addLayer(this.#timezoneOverlay);
    this.#timezoneOverlay?.bringToFront();
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
    "util-geo-explorer": UtilGeoExplorerElement;
  }
}
