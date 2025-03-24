import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import { Form, Button, Container } from 'react-bootstrap';

const Reset = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Пароли не совпадают' });
            return;
        }

        console.log('Пароль успешно сброшен:', formData.password);
        navigate('/login');
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Сброс пароля</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Введите новый пароль"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите новый пароль"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Сохранить новый пароль
                </Button>
            </Form>
        </Container>
    );
};

export default Reset;
