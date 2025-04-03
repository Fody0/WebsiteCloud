import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { formValidationSchema } from '../network/Validation';
import { Navibar } from "../Navbar/Navibar";

const initialUserData = {
    name: '',
    snils: '',
    insurancePolicy: '',
    passport: ''
};

const ServiceForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(() => {
    
        const savedData = localStorage.getItem('userData');
        return savedData
            ? JSON.parse(savedData)
            : { ...initialUserData };
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validate = async () => {
        try {
            await formValidationSchema.validate(formData, { abortEarly: false });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');

        const isValid = await validate();
        if (!isValid) return;

        try {
            const response = await fetch('/api/v1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, serviceId: id })
            });

            if (response.ok) {
                setStatus('Форма успешно отправлена!');
                setTimeout(() => navigate('/'), 2000);
            } else {
                throw new Error('Ошибка при отправке данных.');
            }
        } catch (error) {
            setStatus('Произошла ошибка при отправке данных.');
        }
    };

    return (
        <>
            <Navibar />
            <Container className="mt-5" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Заполните форму</h2>

                {status && <Alert variant={status.includes('успешно') ? 'success' : 'danger'}>{status}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Например: Иванов Иван Иванович"
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>СНИЛС</Form.Label>
                        <Form.Control
                            type="text"
                            name="snils"
                            value={formData.snils}
                            placeholder="Например: 123-456-789 00"
                            onChange={handleChange}
                            isInvalid={!!errors.snils}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.snils}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Страховой полис</Form.Label>
                        <Form.Control
                            type="text"
                            name="insurancePolicy"
                            value={formData.insurancePolicy}
                            placeholder="Например: 1234567890123456"
                            onChange={handleChange}
                            isInvalid={!!errors.insurancePolicy}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.insurancePolicy}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Паспорт (серия и номер)</Form.Label>
                        <Form.Control
                            type="text"
                            name="passport"
                            value={formData.passport}
                            placeholder="Например: 1234 567890"
                            onChange={handleChange}
                            isInvalid={!!errors.passport}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.passport}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Отправить
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default ServiceForm;