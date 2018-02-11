import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import s from './App.scss';
import { Link } from 'react-router-dom';
import Routes from '../modules/routes';
import AppNavbarComponent from 'src/common/app-navbar-component';
import AppHeaderComponent from 'src/common/app-header-component';

const App = () =>
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <AppNavbarComponent />
        </nav>
        <div className="container">
            <AppHeaderComponent />
            {Routes}

        </div>
    </div>;


export default App;
