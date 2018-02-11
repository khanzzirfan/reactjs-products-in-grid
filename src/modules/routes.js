import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductsContainer from 'src/products/ui/containers/products-container';

export default (
	<Switch>
		<Route exact path="/" component={ProductsContainer} />
		<Route path="/about" component={ProductsContainer} />
	</Switch>
);