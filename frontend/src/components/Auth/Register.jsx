import React, { useState } from 'react';
import { registerUser, initialRegisterData } from '../network/User_api';
import {registerValidationSchema} from "../network/Validation";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";


const Register = () => {
    const [formData, setFormData] = useState(initialRegisterData);
    const [errors, setErrors] = useState({});

    const validate = async () => {
        try {
            await registerValidationSchema.validate(formData, { abortEarly: false });
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
        if (isValid) {
            try {
                const data = await registerUser(formData);
                console.log('Регистрация успешна:', data);
            } catch (error) {
                console.error('Ошибка при регистрации:', error);
            }
        }
    };

    return (
        <form style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto'}} onSubmit={handleSubmit}>
                <MyInput type="text" name="name" placeholder="Имя" onChange={handleChange} value={formData.name}/>
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

                <MyInput type="text" name="surname" placeholder="Фамилия" onChange={handleChange} value={formData.surname}/>
            {errors.surname && <div style={{ color: 'red' }}>{errors.surname}</div>}


                <MyInput type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email}/>
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}



                <MyInput type="password" name="password" placeholder="Пароль" onChange={handleChange} value={formData.password}/>
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}



                <MyInput type="password" name="confirmPassword" placeholder="Повторите пароль" onChange={handleChange} value={formData.confirmPassword}/>
            {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}


            <MyButton type="submit">Зарегистрироваться</MyButton>
        </form>
    );
};

export default Register;