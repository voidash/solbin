import React from "react";
// import { MapContainer } from "https://cdn.esm.sh/react-leaflet/MapContainer";
// import { TileLayer } from "https://cdn.esm.sh/react-leaflet/TileLayer";
// import { useMap } from "https://cdn.esm.sh/react-leaflet/hooks";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {useState} from 'react';
import mapData from "../data/mapData.json";
import L from "leaflet";
import axios from "axios"
import marker from "../assets/images/garbage.png";

const baseURL= "http://solanabin.pythonanywhere.com"


const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});
const Maps = () => {
  const [dustbinData,setDustbinData]=useState();
  axios.get(`${baseURL}/dustbins`)
  .then( (response)=> {
    // handle success
    console.log(response);
  })

  // console.log(mapData);
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

          {mapData.map((data) => (
            <Marker
              key={data.id}
              position={[data.gps.latitude, data.gps.longitude]}
              icon={myIcon}
            >
              <Popup>
                {data.name} <br /> This dustbin keeps {data.type}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default Maps;
