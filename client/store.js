import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';

import reducer from './reducer';

import createHistory from 'history/createBrowserHistory';

export const history = createHistory();
