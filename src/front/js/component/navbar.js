import React from "react";
import { Link, useLocation } from "react-router-dom";


export const Navbar = () => {
	const location = useLocation()
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
					<Link to="/demo">
						<button className="botonlogin text-dark">Sign In</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
