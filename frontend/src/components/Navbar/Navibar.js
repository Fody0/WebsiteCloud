import React from 'react';
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Используем NavLink вместо Link

export function Navibar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-4">
                <Navbar.Brand className="me-4">WebDev</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" exact activeClassName="active">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" activeClassName="active">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/medical" activeClassName="active">Medical</Nav.Link>
                        <Nav.Link as={NavLink} to="/services" activeClassName="active">Services</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Button as={NavLink} to="/login" variant="primary" className="me-2">Log In</Button>
                        <Button as={NavLink} to="/register" variant="primary">Sign Up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}