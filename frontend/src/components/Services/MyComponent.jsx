import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Form} from "react-bootstrap";

const MyComponent = (props) => {

    // const [fields, setFields] = useState([]);

    // useEffect(() => {
    //     const fetchFields = async () => {
    //         try {
    //             const response = await axios.get(`${main_part_link}api/v1/services/${encodeURIComponent(serviceName)}`);
    //             const data = response.data;
    //             setFields(data);
    //             const initialData = {};
    //             data.forEach(({ field }) => {
    //                 initialData[field.fieldData] = '';
    //             });
    //
    //             setFormData(initialData);
    //             setLoading(false);
    //         } catch (err) {
    //             console.error('Ошибка при получении полей:', err.response?.data || err.message);
    //             setFields([]);
    //             setLoading(false);
    //         }
    //     };

    //     fetchFields();
    // }, [serviceName]);

    // console.log(props);


    return props.fields.map((item) => {
        const componentMap = {
            'Паспорт': PassportInput,
            'СНИЛС': SnilsInput,
            'Полис': PolicyInput
        };

        const Component = componentMap[item.field.fieldData];
        if (!Component) return (
            <GenericInput
                key={item.field.fieldId}
                fieldConfig={item.field}
                formData={props.formData}
                handleChange={props.handleChange}
                errors={props.errors}
            />
        );

        return (
            <Component
                key={item.field.fieldId}
                formData={props.formData}
                handleChange={props.handleChange}
                errors={props.errors}
                fieldConfig={item.field}
            />
        );
    });
};

export default MyComponent;


const PolicyInput = ({ fieldConfig, formData, handleChange, errors }) => {
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


const SnilsInput = ({ fieldConfig, formData, handleChange, errors }) => {
    const fieldName = fieldConfig.fieldData;

    return(
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

const PassportInput = ({ fieldConfig, formData, handleChange, errors }) => {
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

const GenericInput = ({ fieldConfig, formData, handleChange, errors }) => {
    const fieldName = fieldConfig.fieldData;
    // const fieldKey = fieldName.toLowerCase().replace(/\s+/g, '_');

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