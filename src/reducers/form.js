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
    carBrands: [
        'Выберите марку автомобиля'
    ],
    brandModels: [
        'Выберите модель автомобиля'
    ],
    fetching: false,
    jsonFetching: false,
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
        case types.SET_CAR:
            return {
                ...state,
                car: action.payload
            }
            break;
        case types.BRANDS_REQUEST:
            return {
                ...state,
                jsonFetching: 'process'
            }
            break;
        case types.BRANDS_SUCCESS:
            let brands = [];

            brands.push('Выберите марку автомобиля');

            for (let i = 0; i < Object.keys(action.payload).length; i++) {
                brands.push(action.payload[i])
            }

            return {
                ...state,
                jsonFetching: 'success',
                carBrands: brands
            }
            break;
        case types.MODELS_REQUEST:
            return {
                ...state,
                jsonFetching: 'process'
            }
            break;
        case types.MODELS_SUCCESS:
            let models = [];

            models.push('Выберите модель автомобиля');

            for (let i = 0; i < Object.keys(action.payload).length; i++) {
                models.push(action.payload[i])
            }

            return {
                ...state,
                jsonFetching: 'success',
                brandModels: models
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
            let property = `${action.fieldname}-${action.payload}`;

            return {
                ...state,
                errors: {
                    ...state.errors,
                    [property]: action.status
                }
            }
            break;
        default:
            return state;
    }
}
