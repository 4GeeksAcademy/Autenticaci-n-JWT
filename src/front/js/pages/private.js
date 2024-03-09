import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Context } from "../store/appContext";

export const Private = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt-token")

    useEffect(() => {
        actions.autenticar(token)
    }, [])

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };


    return (<>
        { store.storeToken ?
        <div className="container">
            <h1>Esto es tu página privada</h1>
            <Button variant="primary"
                type="submit"
                onClick={handleLogout}>
                Logout
            </Button>
        </div>
        
 :navigate("/login")}
    </>)
};
