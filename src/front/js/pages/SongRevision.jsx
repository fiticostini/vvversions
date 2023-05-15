import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import ProyectRevision from "../component/ProyectRevision.jsx";


export const SongRevision = () => {
  const { store } = useContext(Context);
  return (
    <div className="p-5 text-end">
      <h3>{store.artistName}</h3>
      
      <ProyectRevision />
      
      <div className="">
        
      </div>
    </div>
  );
};