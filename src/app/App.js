import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import s from './App.scss';
import Routes from '../modules/routes';
import AppContainer from 'src/products/ui/containers/app-container';

const App = () =>
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <AppContainer />
        </nav>
        <div className="container main-content">
            {Routes}
        </div>
    </div>;


export default App;
