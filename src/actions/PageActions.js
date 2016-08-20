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
