import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";

const services = [
    { id: 1, title: 'Консультация терапевта' },
    { id: 2, title: 'Анализ крови' },
    { id: 3, title: 'Процедуры физиотерапии' }
];

const Services = () => (
    <>
        {/* Фиксированная навигационная панель */}
        <Navibar className="fixed-top" />

        {/* Основной контент с отступом */}
        <Container className="mt-5 pt-5">
            <h2 className="text-center mb-4">Выберите медицинскую услугу</h2>

            <Row>
                {services.map((service) => (
                    <Col key={service.id} md={4} className="mb-4">
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>{service.title}</Card.Title>
                                <Link to={`/form/${service.id}`}>
                                    <Button variant="primary" className="w-100">
                                        Выбрать услугу
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
);

export default Services;