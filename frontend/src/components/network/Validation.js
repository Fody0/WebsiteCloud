import * as Yup from 'yup';


export const registerValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Имя должно содержать минимум 2 символа')
        .required('Имя обязательно'),

    surname: Yup.string()
        .min(2, 'Фамилия должна содержать минимум 2 символа')
        .required('Фамилия обязательна'),

    email: Yup.string()
        .email('Некорректный формат email')
        .required('Email обязателен'),

    password: Yup.string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Пароль обязателен'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно')
});
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Некорректный формат email')
        .required('Email обязателен'),

    password: Yup.string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Пароль обязателен'),


});
