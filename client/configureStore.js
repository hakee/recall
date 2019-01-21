import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import {
    routerMiddleware
} from 'connected-react-router/immutable';

import thunk from 'redux-thunk';

import rootReducer from './reducer';

export default function configureStore(history) {
    const middlewares = [thunk, routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
        compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(...enhancers)
    );

    return store;
}