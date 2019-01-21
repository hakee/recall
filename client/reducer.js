import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';

import history from './utils/history';

import base from './reducers/base';
import auth from './reducers/auth';
import notes from './reducers/notesList';

export default combineReducers({
    router: connectRouter(history),
    base,
    auth,
    notes
});