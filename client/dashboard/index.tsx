"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DashboardApp from '../components/DashboardApp';
import store from '../store';

ReactDOM.render(
    <Provider store={store}>
        <DashboardApp />
    </Provider>, 
    document.getElementById('root')
);

