import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';

import {commonReducer} from './common/actions/common.actions.reducer';
import {loginReducer} from './features/login/login.reducer';
// import logoutReducer from './features/logout/logout.reducer';
import {registrationReducer} from './features/registration/registration.reducer';
import registerServiceWorker from './services/registerServiceWorker';

const rootReducer = combineReducers({
    common: commonReducer,
    login: loginReducer,
    registration: registrationReducer
    //logout: logoutReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();    