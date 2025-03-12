import React, { useState } from 'react';
import { loginUser,initialLoginData } from '../network/User_api';

const Login = () => {
    const [formData, setFormData] = useState(initialLoginData);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            console.log('Успешный вход:', data);
        } catch (error) {
            console.error('Ошибка при входе:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
            <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default Login;
