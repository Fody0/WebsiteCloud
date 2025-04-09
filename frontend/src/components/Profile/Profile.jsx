import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import { formValidationSchema } from '../network/Validation';
import axios from 'axios';
import {getAuthToken} from "../network/User_api";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        middle_name: '',
        snils: '',
        insurancePolicy: '',
        passport: ''
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(null);

    const main_part_link = 'http://localhost:8080/';

    useEffect(() => {
        const name = window.localStorage.getItem('name');
        const surname = window.localStorage.getItem('surname');
        const middleName = window.localStorage.getItem('middle_name');

        if (name && surname) {
            setFormData({
                ...formData,
                name: `${surname} ${name}${middleName ? ' ' + middleName : ''}`,
                middle_name: middleName || '',
                snils: window.localStorage.getItem('snils') || '',
                insurancePolicy: window.localStorage.getItem('insurancePolicy') || '',
                passport: window.localStorage.getItem('passport') || ''
            });
        }

        setLoading(false);
    }, []);

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

        try {
            const [lastName, firstName, ...rest] = formData.name.split(' ');
            const middleName = rest.join(' ');

            // Очищаем только страховой полис и паспорт от нецифровых символов
            const cleanValue = (value) => value.replace(/[^0-9]/g, '');

            const personalData = {
                snils: formData.snils, // Оставляем СНИЛС как есть (с дефисами и пробелом)
                insurancePolicy: cleanValue(formData.insurancePolicy),
                passport: cleanValue(formData.passport)
            };
            console.log(personalData);


            const response = await axios.post(
                `${main_part_link}api/v1/auth/register_personal`,
                personalData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '.concat(getAuthToken())
                    }
                }
            );

            window.localStorage.setItem('name', firstName);
            window.localStorage.setItem('surname', lastName);
            window.localStorage.setItem('middle_name', formData.middle_name || middleName || '');
            window.localStorage.setItem('snils', formData.snils);
            window.localStorage.setItem('insurancePolicy', formData.insurancePolicy);
            window.localStorage.setItem('passport', formData.passport);

            localStorage.setItem('userData', JSON.stringify({
                name: `${lastName} ${firstName} ${formData.middle_name || middleName || ''}`.trim(),
                middle_name: formData.middle_name || middleName || '',
                snils: formData.snils,
                insurancePolicy: formData.insurancePolicy,
                passport: formData.passport
            }));

            setStatus(response.data?.message || 'Данные успешно сохранены!');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
            setStatus(error.response?.data?.message || 'Произошла ошибка при сохранении данных.');
            setTimeout(() => setStatus(''), 3000);
        }
    };


    if (loading) {
        return (
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Загрузка...</h2>
            </Container>
        );
    }

    if (errorLoading) {
        return (
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Произошла ошибка: {errorLoading.message}</h2>
            </Container>
        );
    }

    return (
        <>
            <Navibar />
            <Container className="mt-5" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Личный Кабинет</h2>

                {status && <Alert variant={status.includes('успешно') ? 'success' : 'danger'}>{status}</Alert>}

                <Form onSubmit={handleSubmit}>
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

