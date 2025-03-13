import React, { useState } from 'react';
import { loginUser,initialLoginData } from '../network/User_api';
import { loginValidationSchema } from '../network/Validation';
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";


const Login = () => {
    const [formData, setFormData] = useState(initialLoginData);
    const [errors, setErrors] = useState({});
    const validate = async () => {
        try {
            await loginValidationSchema.validate(formData, { abortEarly: false });
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
                const data = await loginUser(formData);
                console.log('Логин успешен:', data);
            } catch (error) {
                console.error('Ошибка при входе:', error);
            }
        }
    };

    return (
        <form style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto'}} onSubmit={handleSubmit}>
            <MyInput type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email}/>
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}



            <MyInput type="password" name="password" placeholder="Пароль" onChange={handleChange} value={formData.password}/>
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}


            <MyButton type="submit">Войти</MyButton>
        </form>
    );
};

export default Login;
