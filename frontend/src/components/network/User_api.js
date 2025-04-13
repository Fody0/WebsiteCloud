import axios from 'axios';

export const initialRegisterData = {
    name: '',
    surname: '',
    middle_name: '',
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
        window.localStorage.setItem('name', response.data.name);
        window.localStorage.setItem('surname', response.data.surname);
        window.localStorage.setItem('middle_name', response.data.middle_name);
        console.log(response.data);
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
        const response = await axios.post(`${main_part_link}api/v1/auth/authenticate`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },


        });
        setAuthToken(response.data.token);
        window.localStorage.setItem('name', response.data.name);
        window.localStorage.setItem('surname', response.data.surname);
        window.localStorage.setItem('middle_name', response.data.middle_name);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при входе:', error);
        throw error;
    }


};
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post('/api/v1', { email },
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
export const logoutUser = async () => {
    try {
          /*  var header;
            if(getAuthToken() == null) header = "null";
            else header = "Bearer ".concat(getAuthToken());
            console.log('Logging out...');
            const response = await axios.post(`${main_part_link}/api/v1/Users/logout`, {}, {
                headers: {
                    "Authorization": header,
                },

            });*/
        /*return response.data;*/


        setAuthToken('');
        localStorage.clear();


    } catch (error) {
        console.error('Ошибка при выходе из системы:', error);
        throw error;
    }
};
export const fetchServices = async () => {
    try {
        const response = await axios.get(`${main_part_link}api/v1/services`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении списка услуг:', error);

        throw error;
    }
};
export const fetchPersonalData = async () => {
    try {
        const response = await axios.get(
            `${main_part_link}api/v1/auth/register_personal`,
            {
                headers: {
                    'Authorization': 'Bearer ' + getAuthToken()
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении персональных данных:', error);
        throw error;
    }
};

export const savePersonalData = async (formData) => {
    try {
        const cleanValue = (value) => value.replace(/[^0-9]/g, '');
        const personalData = {
            snils: formData.snils,
            insurancePolicy: cleanValue(formData.insurancePolicy),
            passport: cleanValue(formData.passport)
        };


        const response = await axios.post(
            `${main_part_link}api/v1/auth/register_personal`,
            personalData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getAuthToken()
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Ошибка при сохранении персональных данных:', error);
        throw error;
    }
};

export const submitServiceForm = async (formData, fields, serviceName) => {
    try {
        const token = localStorage.getItem('authToken');
        const endpoint = token ? 'register' : 'none_register';
        const renamedData = {
            'Фамилия': formData.surname,
            'Имя': formData.name,
            'Отчество': formData.middle_name,
            ...formData,
            service_name: serviceName
        };

        delete renamedData.surname;
        delete renamedData.name;
        delete renamedData.middle_name;

        const response = await axios.post(
            `${main_part_link}api/v1/pdfs/${endpoint}`,
            renamedData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : undefined
                },
                responseType: 'blob'
            }
        );
        return {
            success: true,
            data: response.data,
            fileName: response.headers['x-filename'] || 'document.pdf'
        };
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        return {
            success: false,
            error
        };
    }
};