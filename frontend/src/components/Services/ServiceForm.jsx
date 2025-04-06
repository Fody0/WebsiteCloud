import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import * as Yup from 'yup';
import axios from "axios";
import { serviceFormValidationRules, normalizeFieldName } from "../network/Validation";

const ServiceForm = () => {
    const { serviceName } = useParams();
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const main_part_link = 'http://localhost:8080/';

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get(`${main_part_link}api/v1/services/${encodeURIComponent(serviceName)}`);
                const data = response.data;
                setFields(data);
                const initialData = {};
                data.forEach(({ field }) => {
                    initialData[field.fieldData] = '';
                });

                setFormData(initialData);
                setLoading(false);
            } catch (err) {
                console.error('Ошибка при получении полей:', err.response?.data || err.message);
                setFields([]);
                setLoading(false);
            }
        };

        fetchFields();
    }, [serviceName]);

    const validate = async () => {
        const schemaShape = {};
        fields.forEach(({ field }) => {
            const fieldName = field.fieldData;
            const normalizedFieldName = normalizeFieldName(fieldName);

            schemaShape[fieldName] = serviceFormValidationRules[normalizedFieldName] ||
                Yup.string().required(`Поле "${fieldName}" обязательно`);
        });

        const validationSchema = Yup.object().shape(schemaShape);

        try {
            await validationSchema.validate(formData, { abortEarly: false });
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
        if (!isValid) return;

        try {
            const response = await axios.post(`${main_part_link}api/v1`, {...formData, serviceName}, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setStatus('Форма успешно отправлена!');
                setTimeout(() => navigate('/'), 2000);
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            setStatus('Произошла ошибка при отправке данных.');
        }
    };

    if (loading) {
        return (
            <Container className="mt-5 pt-5">
                <h2 className="text-center mb-4">Загрузка данных формы...</h2>
            </Container>
        );
    }

    return (
        <>
            <Navibar />
            <Container className="mt-5" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Заполните форму для услуги: {serviceName}</h2>
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

                    {fields.map(({ field }) => (
                        <Form.Group className="mb-3" key={field.fieldId}>
                            <Form.Label>{field.fieldData}</Form.Label>
                            <Form.Control
                                type="text"
                                name={field.fieldData}
                                value={formData[field.fieldData] || ''}
                                placeholder={`Введите ${field.fieldData}`}
                                onChange={handleChange}
                                isInvalid={!!errors[field.fieldData]}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[field.fieldData]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    ))}

                    <Button type="submit" className="w-100" variant="primary">
                        Отправить
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default ServiceForm;