import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getAuthToken, logoutUser } from "../network/User_api";

export function Navibar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userSurnameInitial, setUserSurnameInitial] = useState('');

    useEffect(() => {
        const jwt = getAuthToken();
        const name = window.localStorage.getItem('name');
        const surname = window.localStorage.getItem('surname');

        if (jwt && name && surname) {
            setIsAuthenticated(true);
            setUserName(name);
            setUserSurnameInitial(surname.charAt(0));
        } else {
            setIsAuthenticated(false);
            setUserName('');
            setUserSurnameInitial('');
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsAuthenticated(false);
            setUserName('');
            setUserSurnameInitial('');
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-4">
                <Navbar.Brand as={NavLink} to="/" className="me-4">
                    WebDev
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" exact activeClassName="active">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" activeClassName="active">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/medical" activeClassName="active">Medical</Nav.Link>
                        <Nav.Link as={NavLink} to="/services" activeClassName="active">Services</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/profile" className="text-white me-2 text-decoration-none">
                                    <span className="align-middle">{userName} {userSurnameInitial}.</span>
                                </NavLink>
                                <Button variant="primary">Log Out</Button>
                            </>
                        ) : (
                            <>
                                <Button as={NavLink} to="/login" variant="primary" className="me-2">Log In</Button>
                                <Button as={NavLink} to="/register" variant="primary">Sign Up</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}