import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer">
		<div className="ms-4">
		
		</div>
		<div className="py-5 text-end d-flex justify-content-end mb-3">
		<p className ="me-4">
			
			<Link to="/single">About us</Link>
		</p>
		</div>
	</footer>
);
