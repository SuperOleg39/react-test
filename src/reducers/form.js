import * as types from '../constants'

const initialState = {
    surname: 'Драпеза',
    name: 'Олег',
    patron: 'Николаевич',
    birth: '12.07.1991',
    gender: 'male',
    pass: '11-22-333444',
    email: 'surf4sites@yandex.ru',
    car: 'false',
    carBrands: [],
    brandModels: [],
    fetching: false
};

export default function form(state = initialState, action) {
    switch (action.type) {
        case types.SET_SURNAME:
            return {
                ...state,
                surname: action.payload
            }
            break;
        case types.SET_NAME:
            return {
                ...state,
                name: action.payload
            }
            break;
        case types.SET_PATRON:
            return {
                ...state,
                patron: action.payload
            }
            break;
        case types.SET_BIRTH:
            return {
                ...state,
                birth: action.payload
            }
            break;
        case types.SET_GENDER:
            return {
                ...state,
                gender: action.payload
            }
            break;
        case types.SET_PASS:
            return {
                ...state,
                pass: action.payload
            }
            break;
        case types.SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
            break;
        case types.SUBMIT_FORM_REQUEST:
            return {
                ...state,
                fetching: 'process'
            }
            break;
        case types.SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                fetching: 'success'
            }
            break;
        case types.SUBMIT_FORM_FAIL:
            return {
                ...state,
                fetching: 'fail'
            }
            break;
        default:
            return state;
    }
}
