import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {getAuthToken, logoutUser, setAuthToken} from "../network/User_api";
import logo from '../../image/cloudcom.png';

export function Navibar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userSurnameInitial, setUserSurnameInitial] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = getAuthToken();
        const name = window.localStorage.getItem('name');
        const surname = window.localStorage.getItem('surname');
        const middle_name = window.localStorage.getItem('middle_name');


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
            setAuthToken('');

        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-4">
                <Navbar.Brand as={NavLink} to="/" className="me-4">
                    <img
                        src={logo}
                        alt="CloudCom Dubna"
                        height="40"
                        className="d-inline-block align-top"
                        style={{
                            maxWidth: '150px',
                            objectFit: 'contain'
                        }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" exact activeClassName="active">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" activeClassName="active">About</Nav.Link>


                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/profile" className="text-white me-2 text-decoration-none">
                                    <span className="align-middle">{userName} {userSurnameInitial}.</span>
                                </NavLink>
                                <Button variant="primary" onClick={handleLogout}>Log Out</Button>
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