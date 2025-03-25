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
const snilsRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$/;
const passportRegex = /^[0-9]{4} [0-9]{6}$/;
const insurancePolicyRegex = /^[0-9]{16}$/;


export const formValidationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/, 'ФИО должно быть в формате "Иванов Иван Иванович"')
        .required('ФИО обязательно'),

    snils: Yup.string()
        .matches(snilsRegex, 'СНИЛС должен быть в формате 123-456-789 00')
        .required('СНИЛС обязателен'),

    insurancePolicy: Yup.string()
        .matches(insurancePolicyRegex, 'Страховой полис должен содержать 16 цифр')
        .required('Страховой полис обязателен'),

    passport: Yup.string()
        .matches(passportRegex, 'Паспорт должен быть в формате 1234 567890')
        .required('Паспорт обязателен'),
});
