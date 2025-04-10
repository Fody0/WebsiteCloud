import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Modal } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import * as Yup from 'yup';
import axios from "axios";
import { serviceFormValidationRules, normalizeFieldName } from "../network/Validation";
import MyComponent from "./MyComponent";

const ServiceForm = () => {
    const { serviceName } = useParams();
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        middle_name: ''
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [pdfData, setPdfData] = useState(null);
    const [pdfFileName, setPdfFileName] = useState('');
    const [showPdfModal, setShowPdfModal] = useState(false);
    const main_part_link = 'http://localhost:8080/';

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get(`${main_part_link}api/v1/services/${encodeURIComponent(serviceName)}`);
                const data = response.data;
                setFields(data);
                const initialData = {
                    name: '',
                    surname: '',
                    middle_name: ''
                };
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
        const schemaShape = {
            name: Yup.string().required('Имя обязательно для заполнения'),
            surname: Yup.string().required('Фамилия обязательна для заполнения'),
            middle_name: Yup.string().required('Отчество обязательно для заполнения')
        };

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
            // Проверяем наличие токена
            const token = localStorage.getItem('authToken');
            const endpoint = token ? 'register' : 'none_register';


            const submitData = { ...formData,  service_name: serviceName };
            console.log(submitData);

            const response = await axios.post(
                `${main_part_link}api/v1/pdfs/${endpoint}`,
                submitData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : undefined
                    },
                    responseType: 'blob'
                }
            );

            const fileName = response.headers['x-filename'] || 'document.pdf';
            setPdfFileName(fileName);

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfData(pdfUrl);

            setShowPdfModal(true);
            setStatus('PDF успешно создан!');

        } catch (error) {
            console.error('Ошибка при создании PDF:', error);
            setStatus('Произошла ошибка при создании PDF.');
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfData;
        link.download = pdfFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCloseModal = () => {
        setShowPdfModal(false);
        URL.revokeObjectURL(pdfData);
        setPdfData(null);

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
                    {/* Фамилия */}
                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={formData.surname}
                            placeholder="Например: Иванов"
                            onChange={handleChange}
                            isInvalid={!!errors.surname}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.surname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Имя */}
                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Например: Иван"
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Отчество */}
                    <Form.Group className="mb-3">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            type="text"
                            name="middle_name"
                            value={formData.middle_name}
                            placeholder="Например: Иванович"
                            onChange={handleChange}
                            isInvalid={!!errors.middle_name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.middle_name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <MyComponent fields={fields} formData={formData} handleChange={handleChange} errors={errors} />

                    <Button type="submit" className="w-100" variant="primary">
                        Отправить
                    </Button>
                </Form>
            </Container>

            <Modal show={showPdfModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ваш документ готов</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '80vh' }}>
                    {pdfData && (
                        <embed
                            src={pdfData}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            style={{ minHeight: '70vh' }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleDownload}>
                        Скачать PDF
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ServiceForm;