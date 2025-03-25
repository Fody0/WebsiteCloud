import React, { useState } from 'react';
import { loginUser, initialLoginData } from '../network/User_api';
import { loginValidationSchema } from '../network/Validation';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/index.css';
import { Form, Button, Container } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";

const Login = () => {
   <div>
       <Navibar/>
   </div>
    const [formData, setFormData] = useState(initialLoginData);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = async () => {
        try {
            await loginValidationSchema.validate(formData, { abortEarly: false });
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
            try {
                const data = await loginUser(formData);
                console.log('Логин успешен:', data);
                navigate('/');
            } catch (error) {
                console.error('Ошибка при входе:', error);
            }
        }
    };

    return (
        <>

                <Navibar />
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Вход</h2>
            <Form onSubmit={handleSubmit}>
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

                <Button variant="primary" type="submit" className="w-100 mb-3">
                    Войти
                </Button>

                <div className="text-center">
                    <Link to="/forgot-password" className="text-decoration-none">
                        Забыли пароль?
                    </Link>
                </div>
            </Form>
        </Container>
            </>
    );
};

export default Login;
