import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Navibar } from "./Navbar/Navibar";
import { fetchServices } from "./network/User_api";

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                setError(error);
                // Устанавливаем пустой массив услуг при ошибке
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    return (
        <div>
            <Navibar />

            {/* Приветственный баннер */}
            <Container fluid className="bg-dark text-white py-5 text-center">
                <h1 className="display-4">Добро пожаловать в наш медицинский центр!</h1>
                <p className="lead">
                    Мы предлагаем широкий спектр медицинских услуг для вашего здоровья.
                </p>
            </Container>

            {/* Секция с услугами */}
            <Container id="services" className="mt-5 pt-3">
                <h2 className="text-center mb-4">Наши медицинские услуги</h2>

                {error && (
                    <Alert variant="danger" className="text-center">
                        Ошибка загрузки услуг: {error.message}. Сервер недоступен или произошла сетевая ошибка.
                    </Alert>
                )}

                {loading ? (
                    <div className="text-center my-5">
                        <h3>Загрузка услуг...</h3>
                    </div>
                ) : (
                    <Row>
                        {services.length > 0 ? (
                            services.map((service) => (
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
                            ))
                        ) : (
                            !error && (
                                <Col className="text-center my-5">
                                    <h4>На данный момент доступные услуги отсутствуют</h4>
                                </Col>
                            )
                        )}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Home;