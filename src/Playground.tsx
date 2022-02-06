import React, { useRef, useEffect, useState } from "react";
//@ts-ignore
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//@ts-ignore
import MapboxLanguage from "@mapbox/mapbox-gl-language"; // eslint-disable-line import/no-extraneous-dependencies

mapboxgl.accessToken = process.env.MAP_BOX_ACCESS_TOKEN;

export const PlayGround = () => {
  const mapContainer = useRef(null);
  const map = useRef<typeof mapboxgl | null>(null);
  const [lng, setLng] = useState(139.4534);
  const [lat, setLat] = useState(35.4548);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (mapContainer.current === null) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const language = new MapboxLanguage();
    map.current.addControl(language); //チュートリアルにcurrentがなかった
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    //@ts-ignore
    map.current.on("move", () => {
      //@ts-ignore
      setLng(map.current.getCenter().lng.toFixed(4));
      //@ts-ignore
      setLat(map.current.getCenter().lat.toFixed(4));
      //@ts-ignore
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
