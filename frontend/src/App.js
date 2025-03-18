import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from './components/pages/Error';
import About from './components/pages/About';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
};

export default App;
