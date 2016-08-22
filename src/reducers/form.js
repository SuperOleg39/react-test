import * as types from '../constants'

const initialState = {
    surname: '',
    name: '',
    patron: '',
    birth: '',
    gender: 'male',
    pass: '',
    email: '',
    car: false,
    carBrands: [],
    brandModels: [],
    fetching: false,
    errors: {}
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
        case types.ADD_ERROR:
            let newErrors = {};

            newErrors[`${action.fieldname}-${action.payload}`] = action.status;

            return {
                ...state,
                errors: {
                    ...state.errors,
                    [`${action.fieldname}-${action.payload}`]: action.status
                }
            }
            break;
        default:
            return state;
    }
}
