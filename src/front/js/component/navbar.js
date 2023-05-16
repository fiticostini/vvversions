import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import VVVERSIONSLOGOBLANCO from "../../img/VVVERSIONSLOGOBLANCO.png";

export const Navbar = () => {
  const location = useLocation();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = () => {
    const response = actions.logout();
    if (response) navigate("/");
  };
  return (
	<div className="bg-white">
    <nav
      className={
        location.pathname == `/register`
          ? `invisible`
          : location.pathname == `/about`
          ? `invisible`
          : `navbar navbarhome`
      } 
    >
      <div className="d-flex">
		<div className="p-2 ms-3">
        <Link to="/">
          <img
            src={VVVERSIONSLOGOBLANCO}
            className="col-3 ms-3 navbar-brand mb-0 h1" ></img>
        </Link>
		</div>
        <div className="ml-auto d-flex me-1 mt-4 col-3">
			
          <Link to="/register">
            <button
              disabled={location.pathname == `/register` ? true : false}
              className={
                location.pathname == `/register`
                  ? "invisible"
                  : "botonregister text-white me-3"
              }
            >
              {" "}
              Register
			  
            </button>
			
          </Link>
          <Link to="/user/login">
            <button className="botonlogin text-white me-3">Sign In</button>
          </Link>
		  <div>
          <button
            onClick={handleLogout}
            className="border border-0 bg-black botonlogout  text-danger "
          >
            Log out
          </button>
		  </div>
        </div>
      </div>
    </nav>
	</div>
  );
};
