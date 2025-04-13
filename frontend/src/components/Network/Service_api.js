import axios from "axios";
const main_part_link = 'http://localhost:8080/';
export const fetchServices = async () => {
    try {
        const response = await axios.get(`${main_part_link}api/v1/services`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении списка услуг:', error);

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