import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer>
		<div className="ms-4">
			<h1>VVVERSIONS</h1>
		
		</div>
		<div className="py-5 text-end d-flex justify-content-end mb-3">
		<p className ="me-4">
			
			<Link to="/about">About us</Link>
		</p>
		</div>
	</footer>
);
