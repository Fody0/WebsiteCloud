import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword } from '../network/User_api';
import '../styles/index.css';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await forgotPassword(email);
            setMessage('Письмо с инструкциями по сбросу пароля отправлено на вашу почту.');
        } catch (err) {
            setError('Ошибка при отправке письма. Проверьте корректность Email.');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Восстановление пароля</h2>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Введите ваш Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Отправить ссылку на почту
                </Button>

                <div className="text-center mt-3">
                    <Link to="/login" className="text-decoration-none">
                        Вернуться ко входу
                    </Link>
                </div>
            </Form>
        </Container>
    );
};

export default Forgot;
