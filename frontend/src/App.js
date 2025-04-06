import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from './components/pages/Error';
import About from './components/pages/About';
import Forgot from "./components/Reset/Forgot";
import Reset from "./components/Reset/Reset";
import Services from "./components/Services/Services";
import ServiceForm from "./components/Services/ServiceForm";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/Profile/PrivateRoute";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error />} />
                <Route path="/about" element={<About />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/reset-password" element={<Reset />} />
                <Route path="/form/:id" element={<ServiceForm />} />
                <Route path="/profile" element={<PrivateRoute element={Profile} />}/>
                <Route path="/service-form/:serviceName" element={<ServiceForm />} />
            </Routes>
        </Router>
    );
};

export default App;
