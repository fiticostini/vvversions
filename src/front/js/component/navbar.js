import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";




export const Navbar = () => {
	const location = useLocation()
	const {store, actions} = useContext(Context);
	const navigate = useNavigate()
	const handleLogout = () => {
	const response = actions.logout()
	if (response) navigate("/")
	}
	return (
		<nav className={location.pathname==`/register`? `navbar navbarregister` : location.pathname==`/single`? `navbar navbarsingle`: `navbar navbarhome` }>
			<div className="container">
				
				<Link to="/">
					<span className="navbar-brand mb-0 h1">VVVERSIONS</span>
				</Link>
				<div className="ml-auto">
					<Link to="/register">
						<button className="botonregister text-white me-3">Register</button>
					</Link>
					<Link to="/user/login">
						<button className="botonlogin text-dark">Sign In</button>
					</Link>
					<button onClick={handleLogout} className="btn btn-danger text-dark">Log out</button>
				</div>
			</div>
		</nav>
	);
};
