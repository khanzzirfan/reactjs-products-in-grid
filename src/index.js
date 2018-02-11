import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, history } from './store/configStore';
import Root from './modules/root';

const store = configureStore();

ReactDOM.render(
    <div>
        <Root store={store} history={history} />
    </div>,
    document.getElementById('root')
);
