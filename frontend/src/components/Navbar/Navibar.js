import React from 'react';
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Navibar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-4"> {/* Добавляем отступы по бокам */}
                <Navbar.Brand className="me-4">WebDev</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/medical">Medical</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Button as={Link} to="/login" variant="primary" className="me-2">Log In</Button>
                        <Button as={Link} to="/register" variant="primary">Sign Up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}