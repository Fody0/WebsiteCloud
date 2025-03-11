import React, { useState } from 'react';
import axios from "axios";


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        passport: '',
        snils: '',
        birthDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Имя" onChange={handleChange} required />
            <input type="text" name="surname" placeholder="Фамилия" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
            <input type="text" name="passport" placeholder="Паспорт" onChange={handleChange} required />
            <input type="text" name="snils" placeholder="СНИЛС" onChange={handleChange} required />
            <input type="date" name="birthDate" placeholder="Дата рождения" onChange={handleChange} required />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default Register;