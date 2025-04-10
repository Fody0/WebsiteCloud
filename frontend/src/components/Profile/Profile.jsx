import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import { formValidationSchema } from '../network/Validation';
import axios from 'axios';
import { getAuthToken } from "../network/User_api";

const Profile = () => {
    const [formData, setFormData] = useState({
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
        const fetchPersonalData = async () => {
            try {

                const storedSnils = window.localStorage.getItem('snils');
                const storedInsurance = window.localStorage.getItem('insurancePolicy');
                const storedPassport = window.localStorage.getItem('passport');

                if (!storedSnils || !storedInsurance || !storedPassport) {
                    const response = await axios.get(
                        `${main_part_link}api/v1/auth/register_personal`,
                        {
                            headers: {
                                'Authorization': 'Bearer '.concat(getAuthToken())
                            }
                        }
                    );

                    const data = response.data;


                    const newFormData = {
                        snils: data.snils || '',
                        insurancePolicy: data.insurancePolicy || '',
                        passport: data.passport || ''
                    };

                    setFormData(newFormData);

                    window.localStorage.setItem('snils', data.snils || '');
                    window.localStorage.setItem('insurancePolicy', data.insurancePolicy || '');
                    window.localStorage.setItem('passport', data.passport || '');

                    localStorage.setItem('userData', JSON.stringify(newFormData));
                } else {

                    setFormData({
                        snils: storedSnils || '',
                        insurancePolicy: storedInsurance || '',
                        passport: storedPassport || ''
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setErrorLoading(error);
                setLoading(false);
            }
        };

        fetchPersonalData();
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
            const cleanValue = (value) => value.replace(/[^0-9]/g, '');

            const personalData = {
                snils: formData.snils,
                insurancePolicy: cleanValue(formData.insurancePolicy),
                passport: cleanValue(formData.passport)
            };

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

            window.localStorage.setItem('snils', formData.snils);
            window.localStorage.setItem('insurancePolicy', formData.insurancePolicy);
            window.localStorage.setItem('passport', formData.passport);

            localStorage.setItem('userData', JSON.stringify(formData));

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