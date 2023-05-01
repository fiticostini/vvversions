import React, { useContext } from "react";
import { Context } from "../store/appContext";
import benHarper from "../../img/benharper.jpg";
import "../../styles/home.css";

export const Home = () => {
  return (
   <div>
      <div className="d-flex justify-content-center">
	  <img src={benHarper} alt="..." className="img-fluid col-7 justify-content-center mt-3"
	  
></img>
      </div>
	  </div>
   
  );
};
