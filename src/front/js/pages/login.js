import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');     // Estados para los campos del formulario
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario
		const msg = await actions.login(email, password, navigate);
        console.log(msg);
    };

	return (
		<div className="text-center mt-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
            </div>
            </div>
	);
};
