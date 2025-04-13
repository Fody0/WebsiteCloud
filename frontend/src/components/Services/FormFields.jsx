import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Form} from "react-bootstrap";
import {PassportInput, SnilsInput, PolicyInput, GenericInput} from './InputComponents';

const FormFields = (props) => {
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

export default FormFields;