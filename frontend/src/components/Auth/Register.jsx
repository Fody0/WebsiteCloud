import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { registerUser, initialRegisterData } from '../Network/User_api';
import {registerValidationSchema} from "../Network/Validation";
import { Form, Button, Container } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";

const Register = () => {
    const [formData, setFormData] = useState(initialRegisterData);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = async () => {
        try {
            await registerValidationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            const formErrors = err.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setErrors(formErrors);
            return false;
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validate();

        if (isValid) {
            const { confirmPassword, ...dataToSend } = formData;

            try {
                const data = await registerUser(dataToSend);
                console.log('Регистрация успешна:', data);
                navigate('/');
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
            }
        }
    };

    return (
        <>
            <Navibar />
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Регистрация</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Имя"
                        onChange={handleChange}
                        value={formData.name}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="surname"
                        placeholder="Фамилия"
                        onChange={handleChange}
                        value={formData.surname}
                        isInvalid={!!errors.surname}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.surname}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        name="middle_name"
                        placeholder="Отчество"
                        onChange={handleChange}
                        value={formData.middle_name}
                        isInvalid={!!errors.middle_name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.middle_name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        value={formData.password}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Повторите пароль"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
            </>
    );
};

export default Register;