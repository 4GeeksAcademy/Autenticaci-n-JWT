import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');     // Estados para los campos del formulario
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario
		const msg = await actions.signup(email, password);
        console.log(msg);
        setShowModal(true); // Mostrar el modal después de completar el registro
    };

    const handleCloseModal = () => {
        setShowModal(false); // Ocultar el modal al hacer clic en el botón de cerrar
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
                            Signup
                        </Button>
                    </Form>
                </div>
            </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registro Exitoso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tu cuenta ha sido creada correctamente.</Modal.Body>
                    <Modal.Footer>
                        <Link to="/login">
                            <Button variant="primary">
                                Ir a Iniciar Sesión
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};
