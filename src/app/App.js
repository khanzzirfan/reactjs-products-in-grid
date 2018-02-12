import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import s from './App.scss';
import { Link } from 'react-router-dom';
import Routes from '../modules/routes';
import AppNavbarComponent from 'src/common/app-navbar-component';
import AppHeaderComponent from 'src/common/app-header-component';
import ProductSortContainer from 'src/products/ui/containers/product-sort-container';

const App = () =>
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <ProductSortContainer />
        </nav>
        <div className="container main-content">
            {Routes}
        </div>
    </div>;


export default App;
