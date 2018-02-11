import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ProductsReducer from 'src/products/reducers/products-reducer';

//dummy reducers;
const addOne = (state = 0, action) => {
  return state + 1;
}

const addTwo = (state = 10, action) => {
  return state + 2;
}

const rootReducer = combineReducers({
  addOne,
  products: ProductsReducer,
  routing: routerReducer
});

export default rootReducer;