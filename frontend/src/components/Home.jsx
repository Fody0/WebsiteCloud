import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navibar } from "./Navbar/Navibar";

const Home = () => {
    return (
        <div>
            <Navibar />
            <Container fluid className="bg-dark text-white py-5 text-center">
                <h1 className="display-4">Добро пожаловать в наш медицинский центр!</h1>
                <p className="lead">
                    Мы предлагаем широкий спектр медицинских услуг для вашего здоровья.
                </p>
            </Container>

        </div>
    );
};

export default Home;