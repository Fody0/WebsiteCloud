import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../network/User_api';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const jwt = getAuthToken();

    return jwt ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;