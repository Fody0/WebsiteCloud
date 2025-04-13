import React from 'react';
import { Form } from 'react-bootstrap';

export const PolicyInput = ({ fieldConfig, formData, handleChange, errors }) => {
    const fieldName = fieldConfig.fieldData;

    return (
        <Form.Group className="mb-3">
            <Form.Label>Полис ОМС</Form.Label>
            <Form.Control
                type="text"
                name={fieldName}
                value={formData[fieldName] || ''}
                placeholder="Например: 1234567890000000"
                onChange={handleChange}
                isInvalid={!!errors[fieldName]}
            />
            <Form.Control.Feedback type="invalid">
                {errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export const SnilsInput = ({ fieldConfig, formData, handleChange, errors }) => {
    const fieldName = fieldConfig.fieldData;

    return (
        <Form.Group className="mb-3">
            <Form.Label>СНИЛС</Form.Label>
            <Form.Control
                type="text"
                name={fieldName}
                value={formData[fieldName] || ''}
                placeholder="Например: 123-456-789 00"
                onChange={handleChange}
                isInvalid={!!errors[fieldName]}
            />
            <Form.Control.Feedback type="invalid">
                {errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export const PassportInput = ({ fieldConfig, formData, handleChange, errors }) => {
    const fieldName = fieldConfig.fieldData;
    return (
        <Form.Group className="mb-3">
            <Form.Label>Паспорт (серия и номер)</Form.Label>
            <Form.Control
                type="text"
                name={fieldName}
                value={formData[fieldName] || ''}
                placeholder="Например: 1234 567890"
                onChange={handleChange}
                isInvalid={!!errors[fieldName]}
            />
            <Form.Control.Feedback type="invalid">
                {errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export const GenericInput = ({ fieldConfig, formData, handleChange, errors }) => {
    const fieldName = fieldConfig.fieldData;

    return (
        <Form.Group className="mb-3">
            <Form.Label>{fieldName}</Form.Label>
            <Form.Control
                type="text"
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleChange}
                isInvalid={!!errors[fieldName]}
                placeholder={`Введите ${fieldName.toLowerCase()}`}
            />
            <Form.Control.Feedback type="invalid">
                {errors[fieldName]}
            </Form.Control.Feedback>
        </Form.Group>
    );
};