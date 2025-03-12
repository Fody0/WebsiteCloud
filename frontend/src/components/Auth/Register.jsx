import React, { useState } from 'react';
import { registerUser, initialRegisterData } from '../network/User_api';


const Register = () => {
    const [formData, setFormData] = useState(initialRegisterData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            console.log('Регистрация успешна:', data);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Имя" onChange={handleChange} value={formData.name} required />
            <input type="text" name="surname" placeholder="Фамилия" onChange={handleChange} value={formData.surname} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
            <input type="password" name="password" placeholder="Пароль" onChange={handleChange} value={formData.password} required />
            <input type="text" name="passport" placeholder="Паспорт" onChange={handleChange} value={formData.passport} required />
            <input type="text" name="snils" placeholder="СНИЛС" onChange={handleChange} value={formData.snils} required />
            <input type="date" name="birthDate" placeholder="Дата рождения" onChange={handleChange} value={formData.birthDate} required />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default Register;