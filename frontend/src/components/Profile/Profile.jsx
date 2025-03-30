import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import { formValidationSchema } from '../network/Validation';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        snils: '',
        insurancePolicy: '',
        passport: ''
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = async (values) => {
        try {
            await formValidationSchema.validate(values, { abortEarly: false });
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

        const isValid = await validate(formData);
        if (!isValid) return;

        // здесь будкт логику отправки данных на сервер

        setStatus('Данные успешно сохранены!');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <>
            <Navibar />
            <Container className="mt-5" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Личный Кабинет</h2>

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
                        Сохранить
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default Profile;