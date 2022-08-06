import React from "react";
// import { MapContainer } from "https://cdn.esm.sh/react-leaflet/MapContainer";
// import { TileLayer } from "https://cdn.esm.sh/react-leaflet/TileLayer";
// import { useMap } from "https://cdn.esm.sh/react-leaflet/hooks";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import axios from "axios";
import { useEffect } from "react";

import greenMarker from "../assets/images/green.png";
import redMarker from "../assets/images/red.png";
import blueMarker from "../assets/images/blue.png";

const baseURL = "http://solanabin.pythonanywhere.com";

const icons = {
  Paper: greenMarker,
  Plastics: redMarker,
  Metal: blueMarker,
};
const Maps = () => {
  const [dustbinData, setDustbinData] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/dustbins`).then((response) => {
      // handle success
      setDustbinData(response.data);
    });
  }, []);

  return (
    <>
      <div className="map">
        <MapContainer
          center={[27.6195, 85.5386]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {dustbinData !== [] &&
            dustbinData.map((data) => {
              const myIcon = new L.Icon({
                iconUrl: icons[data.dustbin_type],
                iconRetinaUrl: icons[data.dustbin_type],
                popupAnchor: [-0, -0],
                iconSize: [32, 45],
              });
              let lat_long = data.latitude_longitude.split(",").map((a) => {
                return parseFloat(a.substring(0, a.length - 3));
              });
              return (
                <Marker
                  key={data.id}
                  position={[lat_long[0], lat_long[1]]}
                  icon={myIcon}
                >
                  <Popup>
                    <>
                      {data.name} <br /> This dustbin keeps {data.dustbin_type}
                      <h3>
                        {parseInt((data.weight_filled / data.capacity) * 100)}{" "}
                        Percent Filled
                      </h3>
                      <div>
                        <ul>
                          <li>capacity: {data.capacity}</li>
                          <li>Height Filled: {data.weight_filled}</li>
                        </ul>
                      </div>
                    </>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </>
  );
};

export default Maps;
