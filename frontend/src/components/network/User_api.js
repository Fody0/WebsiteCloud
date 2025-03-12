import axios from 'axios';

export const initialRegisterData = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passport: '',
    snils: '',
    birthDate: ''
};

export const initialLoginData = {
    email: '',
    password: ''
};


export const registerUser = async (formData) => {
    try {
        const response = await axios.post('/api/register', formData);
        return response.data;
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        throw error;
    }
};


export const loginUser = async (formData) => {
    try {
        const response = await axios.post('/api/login', formData);
        return response.data;
    } catch (error) {
        console.error('Ошибка при входе:', error);
        throw error;
    }
};
