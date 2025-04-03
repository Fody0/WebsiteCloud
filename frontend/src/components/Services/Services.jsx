import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import {fetchServices} from "../network/User_api";



const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    if (loading) {
        return (
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Загрузка...</h2>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Произошла ошибка: {error.message}</h2>
            </Container>
        );
    }

    return (
        <>

            <Navibar className="fixed-top" />

            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Выберите медицинскую услугу</h2>

                <Row>
                    {services.map((service) => (
                        <Col key={service.id} md={4} className="mb-4">
                            <Card className="shadow">
                                <Card.Body>
                                    <Card.Title>{service.name}</Card.Title>
                                    <Card.Text>{service.description}</Card.Text>
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
};

export default Services;