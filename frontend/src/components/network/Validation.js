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
const fioRegex = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/;
const bloodGroupRegex = /^(I|II|III|IV)[+-]$|^[ABO][+-]$/i;

export const normalizeFieldName = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('снилс')) return 'Снилс';
    if (lowerName.includes('паспорт')) return 'Паспорт';
    if (lowerName.includes('полис')) return 'Полис';
    if (lowerName.includes('фио')) return 'ФИО';
    if (lowerName.includes('кровь') || lowerName.includes('группа')) return 'ГруппаКрови';
    return name;
};

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

export const serviceFormValidationRules = {
    'Снилс': Yup.string()
        .matches(snilsRegex, 'СНИЛС должен быть в формате 123-456-789 00')
        .required('СНИЛС обязателен'),
    'Паспорт': Yup.string()
        .matches(passportRegex, 'Паспорт должен быть в формате 1234 567890')
        .required('Паспорт обязателен'),
    'Полис': Yup.string()
        .matches(insurancePolicyRegex, 'Полис должен содержать 16 цифр')
        .required('Полис обязателен'),
    'ФИО': Yup.string()
        .matches(/^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/, 'ФИО должно быть в формате "Иванов Иван Иванович"')
        .required('ФИО обязательно'),
    'ГруппаКрови': Yup.string()
        .matches(bloodGroupRegex, 'Группа крови должна быть в формате: A+, B-, AB+, O-, I+, II-, III+, IV-')
        .required('Группа крови обязательна')

};