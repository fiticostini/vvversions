import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import ProyectRevision from "../component/ProyectRevision.jsx";
import VVVERSIONSLOGONEGRO from "../../img/VVVERSIONSLOGONEGRO.png";
import { Link, useParams } from "react-router-dom";


export const SongRevision = () => {
  const { store } = useContext(Context);
  const {projectid} = useParams();
  
  return (
    <div className="p-5 text-end">
      <h3>{store.artistName}</h3>
      <h3>{store.projects[0].title}</h3>
      <h3>PROBANDO</h3>
      
      <ProyectRevision />


      <div className="text-center">
        <img src={VVVERSIONSLOGONEGRO} className="col-2"></img>
        <div className="">
          <Link to={`/revisions/${projectid}`}>
            <p className="back2 p-2">BACK</p>
          </Link>
        </div>  
      </div>
    </div>
  );
};