"use client";
import DisplayMap from "@/components/Map";
import React, { useState, useEffect } from "react";
import storesList from "../data/stores-list.json";
import SelectLayers from "@/components/ToggleLayer";
import NavBar from "@/components/NavBar";
import LegendWindow from "@/components/Legend";
import InfoBar from "@/components/InfoBar";
// import { getStore } from "@/components/SampleFetch";

export default function Main() {
  // const fetchStore = async () => {
  //   const store = await getStore({ id: 42 });
  //   return store.name;
  // };
  // const result = fetchStore();

  // Callback function to handle the state change of the checkboxes child component
  const [layersState, setLayersState] = useState({
    Restaurant: true, // default values, display all
    Cafe: true,
    Store: true,
  });

  // Callback function to handle the state change of the checkboxes child component
  const handleLayersChange = (event: any) => {
    const newState = {
      ...layersState, // to keep the state of the other checkboxes
      [event.target.name]: event.target.checked, // to update the state of the checkbox that was clicked
    };
    setLayersState(newState);
  };
  ////////////////////////////////

  // pass only the types of stores that are checked to the Map
  const mapData = storesList
    .filter((store) => layersState[store.type as keyof typeof layersState]) // filter the stores based on the checked layers
    .map((store) => ({
      store_id: store.store_id,
      name: store.name,
      rating: Number(store.rating),
      lat: parseFloat(store.coordinates.split(", ")[0]),
      lng: parseFloat(store.coordinates.split(", ")[1]),
    }));

  // Infobar State:
  const [infoDisplay, setInfoDisplay] = useState(null); // To set what information to display (specified by store_id)
  const [open, setOpen] = useState(false); // Drawer state
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  ////////////////////////////////
  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div>
        <div className="overlay m-2.5 mt-24 max-w-40">
          <SelectLayers
            layersState={layersState}
            handleLayersChange={handleLayersChange}
          />
          <div className="mt-4">
            <LegendWindow />
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <InfoBar
            storeID={infoDisplay}
            open={open}
            toggleDrawer={toggleDrawer(false)}
          />
        </div>
      </div>
      <DisplayMap
        plotDetailsArr={mapData}
        setInfoDisplay={setInfoDisplay}
        setOpen={setOpen}
      />
    </div>
  );
}
// // "use client";
// import { getStore } from "@/components/SampleFetch";
// export default function Main() {
//   const fetchStore = async () => {
//     const store = await getStore({ id: 42 });
//     return store.name;
//   };
//   const result = fetchStore();
//   return <p>{result}</p>;
// }
