import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Cards } from "../component/cards";


export const Home = () => {
	const { store, actions } = useContext(Context);



	return (
		<div className="container-fluid">
			<div className="d-flex justify-content-end m-5 mt-3 grid gap-3">
				<Link to="/signup">
					<Button className="btn btn-secondary px-3" variant="primary" type="submit">
						Signup
					</Button>
				</Link>
				<Link to="/login">
					<Button className="btn btn-secondary px-4" variant="primary" type="submit">
						Login
					</Button>
				</Link>
			</div>
			<div class="alert alert-secondary m-5 text-center" role="alert">
				<h1>Biblioteca de los principales personajes de Game of Throne!</h1>
			</div>
			<div className="container-fluid d-flex flex-wrap m-5">
				{store.characters.map((character, index) => (
					<Cards key={index}
						imageUrl={character.imageUrl}
						fullName={character.fullName}
						firstName={character.firstName}
						lastName={character.lastName}
						title={character.title}
						family={character.family}
					/>
				))}
			</div>

		</div>
	);
};
