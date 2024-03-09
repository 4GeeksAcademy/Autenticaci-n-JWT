import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Carousel } from "../component/carousel";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div>
			{store.characters.map((character, index) => (
                    <Carousel key= {index} 
					titulo={character.firstName}
					img={`https://thronesapi.com/assets/images/${character.image}.jpg`}
					/>
					))}
			</div>
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
		</div>
	);
};
