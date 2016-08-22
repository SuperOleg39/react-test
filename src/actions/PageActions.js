import * as types from '../constants'

export function setSurname(surname) {
    return {
        type: types.SET_SURNAME,
        payload: surname
    }
}

export function setName(name) {
    return {
        type: types.SET_NAME,
        payload: name
    }
}

export function setPatron(patron) {
    return {
        type: types.SET_PATRON,
        payload: patron
    }
}

export function setBirth(birth) {
    return {
        type: types.SET_BIRTH,
        payload: birth
    }
}

export function setGender(gender) {
    return {
        type: types.SET_GENDER,
        payload: gender
    }
}

export function setPass(pass) {
    return {
        type: types.SET_PASS,
        payload: pass
    }
}

export function setEmail(email) {
    return {
        type: types.SET_EMAIL,
        payload: email
    }
}

export function setCar(car) {
    return {
        type: types.SET_CAR,
        payload: car
    }
}

export function getBrands() {
    return (dispatch) => {
        dispatch({
            type: types.BRANDS_REQUEST
        });

        fetch('./src/data/brands.json').then( response => {
            return response.json();
        }).then( brands => {
            dispatch({
                type: types.BRANDS_SUCCESS,
                payload: brands
            });
        }).catch( reason => {
            console.log(reason);
        });
    }
}

export function getModels(brand) {
    return (dispatch) => {
        dispatch({
            type: types.MODELS_REQUEST
        });

        fetch('./src/data/models.json').then( response => {
            return response.json();
        }).then( models => {
            dispatch({
                type: types.MODELS_SUCCESS,
                payload: models[brand]
            });
        }).catch( reason => {
            console.log(reason);
        });
    }
}

export function submitForm() {
    return (dispatch) => {
        dispatch({
            type: types.SUBMIT_FORM_REQUEST
        });

        setTimeout( () => {
            dispatch({
                type: types.SUBMIT_FORM_SUCCESS
            });
        }, 1000);
    }
}

export function addError(field, error, status) {
    return {
        type: types.ADD_ERROR,
        payload: error,
        fieldname: field,
        status: status
    }
}
