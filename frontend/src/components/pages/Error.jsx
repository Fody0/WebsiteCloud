import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <h1 style={{color:'red'}}>
                Вы перешли на несуществующую страницу!
            </h1>
            <p>Вы будете перенаправлены на главную страницу через 5 секунд...</p>
        </div>
    );
};

export default Error;