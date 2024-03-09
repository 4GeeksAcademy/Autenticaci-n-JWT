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
        {store.storeToken ?
            <div className="container">
                <div className="alert alert-secondary m-5" role="alert">
                    Bienvenido!!
                </div>
                <Button className="m-5" variant="secondary"
                    type="submit"
                    onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            : navigate("/login")}
    </>)
};
