import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import { formValidationSchema } from '../Network/Validation';
import { fetchPersonalData, savePersonalData } from '../Network/User_api';

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

    useEffect(() => {
        const loadPersonalData = async () => {
            try {
                const storedSnils = window.localStorage.getItem('snils');
                const storedInsurance = window.localStorage.getItem('insurancePolicy');
                const storedPassport = window.localStorage.getItem('passport');

                if (!storedSnils || !storedInsurance || !storedPassport) {
                    const data = await fetchPersonalData();

                    const newFormData = {
                        snils: data.snils || '',
                        insurancePolicy: data.insurancePolicy || '',
                        passport: data.passport || ''
                    };

                    setFormData(newFormData);
                    localStorage.setItem('snils', newFormData.snils);
                    localStorage.setItem('insurancePolicy', newFormData.insurancePolicy);
                    localStorage.setItem('passport', newFormData.passport);
                    localStorage.setItem('userData', JSON.stringify(newFormData));
                } else {
                    setFormData({
                        snils: storedSnils,
                        insurancePolicy: storedInsurance,
                        passport: storedPassport
                    });
                }

                setLoading(false);
            } catch (error) {
                setErrorLoading(error);
                setLoading(false);
            }
        };

        loadPersonalData();
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
            const response = await savePersonalData(formData);

            window.localStorage.setItem('snils', formData.snils);
            window.localStorage.setItem('insurancePolicy', formData.insurancePolicy);
            window.localStorage.setItem('passport', formData.passport);
            window.localStorage.setItem('userData', JSON.stringify(formData));

            setStatus(response.message || 'Данные успешно сохранены!');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            const serverMessage = error.response?.data?.message;
            if (error.response?.status === 403) {
                setStatus('Данные уже существуют или доступ запрещён.');
            } else {
                setStatus(serverMessage || 'Произошла ошибка при сохранении данных.');
            }
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
        let message = 'Не удалось загрузить данные.';

        if (errorLoading.message === 'Network Error') {
            message = 'Сервер недоступен. Возможно, он выключен или возникли проблемы с соединением.';
        } else if (errorLoading.response) {
            message = `Ошибка ${errorLoading.response.status}: ${errorLoading.response.statusText}`;
        }

        return (
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4 text-danger">Произошла ошибка</h2>
                <p className="text-center">{message}</p>
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
