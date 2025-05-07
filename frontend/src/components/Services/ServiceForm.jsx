import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Alert, Modal } from 'react-bootstrap';
import { Navibar } from "../Navbar/Navibar";
import axios from "axios";
import { validateServiceForm } from "../Network/Validation";
import FormFields from "./FormFields";
import { submitServiceForm } from "../Network/Service_api";

const ServiceForm = () => {
    const { serviceName } = useParams();
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [pdfData, setPdfData] = useState(null);
    const [pdfFileName, setPdfFileName] = useState('');
    const [showPdfModal, setShowPdfModal] = useState(false);
    const main_part_link = 'http://localhost:8080/';

    useEffect(() => {
        const loadUserData = () => {
            return {
                'name': localStorage.getItem('name') || '',
                'surname': localStorage.getItem('surname') || '',
                'middle_name': localStorage.getItem('middle_name') || '',
                'СНИЛС': localStorage.getItem('snils') || '',
                'Полис': localStorage.getItem('insurancePolicy') || '',
                'Паспорт': localStorage.getItem('passport') || ''
            };
        };

        const fetchFields = async () => {
            try {
                const response = await axios.get(`${main_part_link}api/v1/services/${encodeURIComponent(serviceName)}`);
                const data = response.data;
                setFields(data);

                const userData = loadUserData();
                const initialData = { ...userData };

                data.forEach(({ field }) => {
                    if (!initialData.hasOwnProperty(field.fieldData)) {
                        initialData[field.fieldData] = '';
                    }
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, errors: validationErrors } = await validateServiceForm(formData, fields);
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        const result = await submitServiceForm(formData, fields, serviceName);

        if (result.success) {
            const pdfBlob = new Blob([result.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfFileName(result.fileName);
            setPdfData(pdfUrl);
            setShowPdfModal(true);
            setStatus('PDF успешно создан!');
        } else {
            setStatus('Произошла ошибка при создании PDF.');
            console.error(result.error);
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
                    <Form.Group className="mb-3">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={formData["surname"] || ''}
                            placeholder="Например: Иванов"
                            onChange={handleChange}
                            isInvalid={!!errors["surname"]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors["surname"]}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData["name"] || ''}
                            placeholder="Например: Иван"
                            onChange={handleChange}
                            isInvalid={!!errors["name"]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors["name"]}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control
                            type="text"
                            name="middle_name"
                            value={formData["middle_name"] || ''}
                            placeholder="Например: Иванович"
                            onChange={handleChange}
                            isInvalid={!!errors["middle_name"]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors["middle_name"]}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <FormFields
                        fields={fields}
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                    />

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