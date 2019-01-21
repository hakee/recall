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

const _openedNote = {
    title: '',
    content: ''
};

const INITIAL_STATE = {
    items: [],
    errorMessage: null,
    openedNote: _openedNote
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NOTES_LOADED_SUCCESS:
            return {
                ...state,
                items: action.payload.data
            }
        case NOTES_LOADED_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            }
        case NOTE_DETAIL_SUCCESS:
            return {
                ...state,
                openedNote: action.payload,
                errorMessage: null
            }
        case NOTE_DETAIL_FAILED:
            return {
                ...state,
                openedNote: _openedNote,
                errorMessage: action.payload
            }
        case NOTE_UPDATE_SUCCESS:
            return {
                ...state,
                openedNote: action.payload,
                errorMessage: null
            }
        case NOTE_UPDATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            }
        case NOTE_CREATE_SUCCESS:
            return {
                ...state,
                errorMessage: null
            }
        case NOTE_CREATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}