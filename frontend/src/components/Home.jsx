import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Добро пожаловать!</h1>
        <p>Выберите одно из действий:</p>
        <nav>
            <Link to="/login">Войти</Link> |
            <Link to="/register">Зарегистрироваться</Link>
        </nav>
    </div>
);

export default Home;
