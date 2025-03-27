import React from 'react';
import {Link, Routes} from 'react-router-dom';
import {Navibar} from "./Navbar/Navibar";
import {getCsrfToken} from "../utils/session.utils";


const Home = () => (
    <div>
        <script>
            getCsrfToken()
        </script>
        <Navibar/>
        <h1 >Добро пожаловать! </h1>
    </div>
);


export default Home;
