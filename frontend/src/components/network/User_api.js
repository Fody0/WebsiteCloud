import axios from 'axios';

export const initialRegisterData = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export const initialLoginData = {
    email: '',
    password: ''
};

const main_part_link = 'http://localhost:8080';

export const registerUser = async (formData) => {
    try {
        console.log(formData);
        const response = await axios.post(`${main_part_link}/api/v1/Users/save_user`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        throw error;
    }
};

export const loginUser = async (formData) => {
    try {
        console.log(formData);
        const response = await axios.post(`${main_part_link}/api/v1/Users/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при входе:', error);
        throw error;
    }

};
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post('/api/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке письма для сброса пароля:', error);
        throw error;
    }
};