import React, { useContext } from "react";
import { Context } from "../store/appContext";
import benHarper from "../../img/benharper4.jpg";
import "../../styles/home.css";

export const Home = () => {
  return (
   <div>
      <div className="d-flex justify-content-center">
	  <img src={benHarper} class="img-fluid" alt="..." className="col-10 justify-content-center mt-3"
	  
></img>
      </div>
	  </div>
   
  );
};
