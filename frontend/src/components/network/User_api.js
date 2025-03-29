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

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
}

export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
}

const main_part_link = 'http://localhost:8080/';

export const registerUser = async (formData) => {
    try {
        console.log(formData);
        var header;
        if(getAuthToken() == null) header = "null";
        else header = "Bearer ".concat(getAuthToken());
        console.log(header);
        const response = await axios.post(`${main_part_link}api/v1/auth/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        throw error;
    }
};

export const loginUser = async (formData) => {
    try {
        console.log(formData);
        var header;
        if(getAuthToken() == null) header = "null";
        else header = "Bearer ".concat(getAuthToken());
        const response = await axios.post(`${main_part_link}api/v1/auth/login/authenticate`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        console.error('Ошибка при входе:', error);
        throw error;
    }

};
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post('/api/forgot-password', { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке письма для сброса пароля:', error);
        throw error;
    }
};