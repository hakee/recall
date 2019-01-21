import {
    APP_LOAD,
} from '../constants';

const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {

    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};