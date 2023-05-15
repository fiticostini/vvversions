import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import ProyectRevision from "../component/ProyectRevision.jsx";
import VVVERSIONSLOGONEGRO from "../../img/VVVERSIONSLOGONEGRO.png";


export const SongRevision = () => {
  const { store } = useContext(Context);
  return (
    <div className="p-5 text-end">
      <h3>{store.artistName}</h3>
      
      <ProyectRevision />

      
      <div className="text-center">
        <img src={VVVERSIONSLOGONEGRO} className="col-2"></img>
        
      </div>
    </div>
  );
};