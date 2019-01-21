import axios from 'axios';

import {
    NOTES_LOADED_SUCCESS,
    NOTES_LOADED_FAILED,
    NOTES_LOADING,
    NOTE_DETAIL_LOADING,
    NOTE_DETAIL_SUCCESS,
    NOTE_DETAIL_FAILED,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_FAILED,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_FAILED
} from '../constants/';

import {
    API_URL
} from '../config';

const requestHeaders = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return {
        'Authorization': `Bearer ${token}`
    };
}

export const fetchNotes = () => {
    return (dispatch) => {
        dispatch({
            type: NOTES_LOADING
        });

        axios
            .get(`${API_URL}/note/me`, {
                headers: requestHeaders()
            })
            .then((result) => {
                dispatch({
                    type: NOTES_LOADED_SUCCESS,
                    payload: result
                });
            })
            .catch(() => dispatch({
                type: NOTES_LOADED_FAILED,
                payload: 'Notes could not be loaded.'
            }));
    }
}

export const fetchNoteDetail = (id) => {
    return (dispatch) => {
        dispatch({
            type: NOTE_DETAIL_LOADING
        });

        axios.get(`${API_URL}/note/${id}`, {
                headers: requestHeaders()
            })
            .then((result) => {
                dispatch({
                    type: NOTE_DETAIL_SUCCESS,
                    payload: result.data
                });
            })
            .catch(() => dispatch({
                type: NOTE_DETAIL_FAILED,
                payload: 'Note could not be loaded.'
            }));
    }
}

export const updateNote = ({
    id,
    title,
    content
}) => {
    return (dispatch) => {
        return axios
            .put(`${API_URL}/note/${id}`, {
                title,
                content
            }, {
                headers: requestHeaders()
            })
            .then((response) => {
                dispatch({
                    type: NOTE_UPDATE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(() => dispatch({type: NOTE_UPDATE_FAILED, payload: 'Could not update note'}));
    }
}

export const createNote = ({
    title,
    content
}) => {
    return (dispatch) => {
        return axios
            .post(`${API_URL}/note`, {
                title,
                content
            }, {
                headers: requestHeaders()
            })
            .then((response) => {
                dispatch({
                    type: NOTE_CREATE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(() => dispatch({type: NOTE_CREATE_FAILED, payload: 'Could not create note'}));
    }
}