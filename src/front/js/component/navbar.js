import React from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container-fluid m-1">
				<Link to="/">
					<img src="https://cdn.worldvectorlogo.com/logos/game-of-thrones.svg" className="" style= {{height: 50, width: 300}}/>
				</Link>
				<div className="ml-auto">
					<DropdownButton id="dropdown-basic-button" title="Information">
						<Dropdown.Item href="https://start.4geeksacademy.com/starters/react-flask" target="_blank">Documentation</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
					</DropdownButton>
				</div>
			</div>
		</nav>
	);
};
