import axios from 'axios';
import history from '../utils/history';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    EMAIL_VALID,
    EMAIL_INVALID,
    LOGOUT
} from '../constants';

import {
    API_URL
} from '../config';

export function authError(CONST, error) {
    return {
        type: CONST,
        payload: error
    };
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
}

export const loginUser = ({
    email,
    password
}) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN
        });

        axios
            .post(`${API_URL}/auth/signin`, {
                email,
                password
            })
            .then((response) => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: response.data
                });
                history.push('/');
            })
            .catch(() => dispatch(authError(LOGIN_USER_FAILED, 'Username or password is not right')));
    }
}

export const registerUser = ({
    email,
    password
}) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER
        });

        axios
            .post(`${API_URL}/auth/signup`, {
                email,
                password
            })
            .then((response) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.data
                });
                history.push('/login');
            })
            .catch(() => dispatch(authError(REGISTER_FAILED, 'Registration failed')));
    }
};

export const verifyEmail = ({
    email
}) => {
    return (dispatch) => {
        axios.get(`${API_URL}/auth/verify`, {
                email
            })
            .then((response) => {
                dispatch({
                    type: EMAIL_VALID
                });
            })
            .catch(() => dispatch({
                type: EMAIL_INVALID
            }))
    }
};

export const logoutUser = () => {
    localStorage.clear();
    history.push('/login');
    return {
        type: LOGOUT
    };
};