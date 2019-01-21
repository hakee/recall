import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGOUT,
    LOGIN,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    REGISTER,
    EMAIL_INVALID,
    EMAIL_VALID
} from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token'));

const initialState = user ? {
    token: token,
    email: user.email,
    isAuth: true,
    user
} : {
    token: null,
    user: null,
    email: '',
    password: '',
    isAuth: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state,
                email: action.payload
            };
        case PASSWORD_CHANGED:
            return { ...state,
                password: action.payload
            };
        case LOGOUT:
            return { ...state,
                redirectTo: '/',
                token: null,
                user: null,
                isAuth: false,
                error: null
            };
        case LOGIN_USER_FAILED:
            return { ...state,
                error: action.payload,
                isAuth: false
            };
        case LOGIN_USER_SUCCESS:
            return { ...state,
                error: null,
                token: action.payload.token,
                user: action.payload.user,
                isAuth: true
            };
        case EMAIL_VALID:
            return {
                ...state,
                error: null
            }
        case EMAIL_INVALID:
            return {
                ...state,
                error: 'Email is already registered'
            }
        default:
            return state;
    }
};