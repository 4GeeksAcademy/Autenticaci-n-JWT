import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		
		<div className="text-center mt-5">
			<div className="container">
					<Link to="/signup">
					<Button variant="primary" type="submit">
					Signup
					</Button> </Link>
					
					<Link to="/login">
					<Button variant="primary" type="submit">
					Login
					</Button> </Link>
			</div>
			
			<div className="alert alert-info m-3">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
