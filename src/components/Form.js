import React, { PropTypes, Component } from 'react'

const cyryllicRegexp = /^[А-ЯЁ][а-яё]*$/ig;
const numberRegexp = /^[0-9.,-]+$/ig;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default class Form extends Component {
    onSurnameInputChange(e) {
        let val = e.target.value;

        if (!val.match(cyryllicRegexp)) {
            e.target.value = val.slice(0, -1);
            return;
        }

        this.props.actions.setSurname(e.target.value);
    }
    onNameInputChange(e) {
        let val = e.target.value;

        if (!val.match(cyryllicRegexp)) {
            e.target.value = val.slice(0, -1);
            return;
        }

        this.props.actions.setName(e.target.value);
    }
    onPatronInputChange(e) {
        let val = e.target.value;

        if (!val.match(cyryllicRegexp)) {
            e.target.value = val.slice(0, -1);
            return;
        }

        this.props.actions.setPatron(e.target.value);
    }
    onBirthInputChange(e) {
        applyDateMask(e.target);

        this.props.actions.setBirth(e.target.value);
    }
    onGenderInputSwitch(e) {
        this.props.actions.setGender(e.target.value);
    }
    onPassInputChange(e) {
        applyPassportMask(e.target);

        this.props.actions.setPass(e.target.value);
    }
    onEmailInputChange(e) {
        let val = e.target.value;

        this.props.actions.setEmail(e.target.value);
    }
    onFormSubmit(e) {
        e.preventDefault();

        let isFormInvalid = validateForm(e.target);

        if (!isFormInvalid) {
            this.props.actions.submitForm();
        }
    }

    render() {
        const form = this.props.form;

        return <form onSubmit={ ::this.onFormSubmit }>
            <div className='input-wrap surname-wrap'>
                <div className='input-label'>Фамилия*</div>
                <input name="surname" type='text' placeholder={ form.surname } onChange={ ::this.onSurnameInputChange } />
                <div className='error'>Заполните поле!</div>
            </div>
            <div className='input-wrap name-wrap'>
                <div className='input-label'>Имя*</div>
                <input name="name" type='text' placeholder={ form.name } onChange={ ::this.onNameInputChange } />
                <div className='error'>Заполните поле!</div>
            </div>
            <div className='input-wrap patron-wrap'>
                <div className='input-label'>Отчество*</div>
                <input name="patron" type='text' placeholder={ form.patron } onChange={ ::this.onPatronInputChange } />
                <div className='error'>Заполните поле!</div>
            </div>
            <div className='input-wrap birth-wrap'>
                <div className='input-label'>Дата рождения*</div>
                <input name="birth" type='text' placeholder={ form.birth } onChange={ ::this.onBirthInputChange } />
                <div className='error'>Заполните поле!</div>
                <div className='error suberror'>Дата рождения введена неверно!</div>
                <div className='error accesserror'>Доступ несовершеннолетним строго воспрещен!</div>
            </div>
            <div className='input-wrap gender-wrap'>
                <div className='input-label'>Пол*</div>
                <input name='gender' type='radio' value='male' onChange={ ::this.onGenderInputSwitch } checked={ form.gender == 'male' } /> мужской <br />
                <input name='gender' type='radio' value='female' onChange={ ::this.onGenderInputSwitch } checked={ form.gender == 'female' } /> женский <br />
            </div>
            <div className='input-wrap pass-wrap'>
                <div className='input-label'>Серия и номер паспорта*</div>
                <input name="pass" type='text' placeholder={ form.pass } onChange={ ::this.onPassInputChange } />
                <div className='error'>Заполните поле!</div>
            </div>
            <div className='input-wrap email-wrap'>
                <div className='input-label'>E-mail</div>
                <input name="email" type='text' placeholder={ form.email } onChange={ ::this.onEmailInputChange } />
                <div className='error'>Заполните поле!</div>
                <div className='error suberror'>E-mail введен неверно!</div>
            </div>
            <input type='submit' />
        </form>
    }
}

Form.PropTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    setAge: PropTypes.func.isRequired
}

function validateForm(form) {
    let fields = form.querySelectorAll('input');
    let statusArr = [];

    fields.forEach( item => {
        let name = item.getAttribute('name');

        switch (name) {
            case 'surname':
                statusArr.push(validateEmptyField(item));
                break;
            case 'name':
                statusArr.push(validateEmptyField(item));
                break;
            case 'patron':
                statusArr.push(validateEmptyField(item));
                break;
            case 'birth':
                statusArr.push(validateBirthField(item));
                statusArr.push(validateEmptyField(item));
                break;
            case 'pass':
                statusArr.push(validateEmptyField(item));
                break;
            case 'email':
                statusArr.push(validateEmailField(item));
                break;
        }
    });

    return statusArr.some( item => {
        return !item;
    });
}

function validateEmptyField(field) {
    if (!field.value.length) {
        field.parentNode.classList.add('invalid', 'invalid-empty');
        field.parentNode.classList.remove('invalid-error');
        field.parentNode.classList.remove('invalid-access');
    } else {
        field.parentNode.classList.remove('invalid', 'invalid-empty')
    }

    return !!field.value.length;
}

function validateBirthField(field) {
    let date = Date.parse(field.value);
    let currentYear = new Date().getFullYear();
    let birthYear;

    if (date) {
        birthYear = new Date(date).getFullYear();

        if (Math.abs(currentYear - birthYear) >= 18) {
            field.parentNode.classList.remove('invalid', 'invalid-access')
        } else {
            field.parentNode.classList.add('invalid', 'invalid-access');
            field.parentNode.classList.remove('invalid-error');
        }
    } else {
        field.parentNode.classList.add('invalid', 'invalid-error')
        field.parentNode.classList.remove('invalid-access');
    }

    return !!date && Math.abs(currentYear - birthYear) >= 18;
}

function validateEmailField(field) {
    if (!emailRegexp.test(field.value) && field.value.length) {
        field.parentNode.classList.add('invalid', 'invalid-error')
    } else {
        field.parentNode.classList.remove('invalid', 'invalid-error')
    }

    if (field.value.length) {
        return emailRegexp.test(field.value);
    }
    return true;
}

function applyDateMask(input) {
    let str = input.value;
    let maskedStr = '';

    let filteredStrArr = str.split('').filter( item => {
        return item != '.' && item.match(numberRegexp);
    });

    if (filteredStrArr.length > 8) {
        filteredStrArr = filteredStrArr.slice(0, 8);
    }

    filteredStrArr.forEach( (item, i) => {
        if (i == 1 || i == 3) {
            maskedStr += item + '.';
        } else {
            maskedStr += item;
        }
    });

    input.value = maskedStr;
}

function applyPassportMask(input) {
    let str = input.value;
    let maskedStr = '';

    let filteredStrArr = str.split('').filter( item => {
        return item != '-' && item.match(numberRegexp);
    });

    if (filteredStrArr.length > 10) {
        filteredStrArr = filteredStrArr.slice(0, 10);
    }

    filteredStrArr.forEach( (item, i) => {
        if (i == 1 || i == 3) {
            maskedStr += item + '-';
        } else {
            maskedStr += item;
        }
    });

    input.value = maskedStr;
}
