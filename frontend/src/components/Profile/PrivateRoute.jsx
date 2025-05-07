import React from 'react';
import { Navigate} from 'react-router-dom';
import { getAuthToken } from '../Network/User_api';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const jwt = getAuthToken();

    return jwt ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;