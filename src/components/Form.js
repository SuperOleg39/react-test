import React, { PropTypes, Component } from 'react'
import * as utils from '../utils/validation'

const cyryllicRegexp = /^[А-ЯЁ][а-яё]*$/ig;
const numberRegexp = /^[0-9.,-]+$/ig;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ig;

export default class Form extends Component {
    onSurnameInputChange(e) {
        let val = e.target.value;

        if (!utils.isEmpty(val) && !utils.isCyryllic(val)) {
            e.target.value = this.props.form.surname;
            return;
        }

        this.props.actions.setSurname(e.target.value);
    }
    onNameInputChange(e) {
        let val = e.target.value;

        if (!utils.isEmpty(val) && !utils.isCyryllic(val)) {
            e.target.value = this.props.form.name;
            return;
        }

        this.props.actions.setName(e.target.value);
    }
    onPatronInputChange(e) {
        let val = e.target.value;

        if (!utils.isEmpty(val) && !utils.isCyryllic(val)) {
            e.target.value = this.props.form.patron;
            return;
        }

        this.props.actions.setPatron(e.target.value);
    }
    onBirthInputChange(e) {
        utils.applyMask(e.target, '__.__.____', '.', utils.isNumber);

        this.props.actions.setBirth(e.target.value);
    }
    onGenderInputSwitch(e) {
        this.props.actions.setGender(e.target.value);
    }
    onPassInputChange(e) {
        utils.applyMask(e.target, '__-__-____', '-', utils.isNumber);

        this.props.actions.setPass(e.target.value);
    }
    onEmailInputChange(e) {
        let val = e.target.value;

        this.props.actions.setEmail(e.target.value);
    }
    onFormSubmit(e) {
        e.preventDefault();

        let isFormInvalid = validateForm(e.target, this.props.actions.addError);

        if (!isFormInvalid) {
            this.props.actions.submitForm();
        }
    }

    render() {
        const form = this.props.form;

        return <form onSubmit={ ::this.onFormSubmit }>
            <div className={ form.errors['surname-empty'] ? 'invalid input-wrap' : 'input-wrap' }>
                <div className='input-label'>Фамилия*</div>
                <input name="surname" type='text' placeholder={ form.surname } onChange={ ::this.onSurnameInputChange } />
                <div className='error'>
                {(
                    () => {
                        if (form.errors['surname-empty']) {
                            return 'Заполните поле!';
                        }
                    }
                )()}
                </div>
            </div>
            <div className={ form.errors['name-empty'] ? 'invalid input-wrap' : 'input-wrap' }>
                <div className='input-label'>Имя*</div>
                <input name="name" type='text' placeholder={ form.name } onChange={ ::this.onNameInputChange } />
                <div className='error'>
                {(
                    () => {
                        if (form.errors['name-empty']) {
                            return 'Заполните поле!';
                        }
                    }
                )()}
                </div>
            </div>
            <div className={ form.errors['patron-empty'] ? 'invalid input-wrap' : 'input-wrap' }>
                <div className='input-label'>Отчество*</div>
                <input name="patron" type='text' placeholder={ form.patron } onChange={ ::this.onPatronInputChange } />
                <div className='error'>
                {(
                    () => {
                        if (form.errors['patron-empty']) {
                            return 'Заполните поле!';
                        }
                    }
                )()}
                </div>
            </div>
            <div className={ form.errors['birth-empty'] || form.errors['birth-error'] || form.errors['birth-access'] ? 'invalid input-wrap' : 'input-wrap' }>
                <div className='input-label'>Дата рождения*</div>
                <input name="birth" type='text' placeholder={ form.birth } onChange={ ::this.onBirthInputChange } />
                <div className='error'>
                {(
                    () => {
                        if (form.errors['birth-empty']) {
                            return 'Заполните поле!';
                        }
                        if (form.errors['birth-error']) {
                            return 'Дата рождения введена неверно!';
                        }
                        if (form.errors['birth-access']) {
                            return 'Доступ несовершеннолетним строго воспрещен!';
                        }
                    }
                )()}
                </div>
            </div>
            <div className='input-wrap gender-wrap'>
                <div className='input-label'>Пол*</div>
                <input name='gender' type='radio' value='male' onChange={ ::this.onGenderInputSwitch } checked={ form.gender == 'male' } /> мужской <br />
                <input name='gender' type='radio' value='female' onChange={ ::this.onGenderInputSwitch } checked={ form.gender == 'female' } /> женский <br />
            </div>
            <div className={ form.errors['pass-empty'] || form.errors['pass-error'] ? 'invalid input-wrap' : 'input-wrap' }>
                <div className='input-label'>Серия и номер паспорта*</div>
                <input name="pass" type='text' placeholder={ form.pass } onChange={ ::this.onPassInputChange } />
                <div className='error'>
                {(
                    () => {
                        if (form.errors['pass-empty']) {
                            return 'Заполните поле!';
                        }
                        if (form.errors['pass-error']) {
                            return 'Номер паспорта введен неверно!';
                        }
                    }
                )()}
                </div>
            </div>
            <div className={ form.errors['email-error'] ? 'invalid input-wrap' : 'input-wrap' }>
                <div className='input-label'>E-mail</div>
                <input name="email" type='text' placeholder={ form.email } onChange={ ::this.onEmailInputChange } />
                <div className='error'>
                {(
                    () => {
                        if (form.errors['email-error']) {
                            return 'E-mail введен неверно!';
                        }
                    }
                )()}
                </div>
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

function validateForm(form, addError) {
    let fields = form.querySelectorAll('input');
    let statusArr = [];

    fields.forEach( item => {
        let name = item.getAttribute('name');
        let isEmpty, isNoDate, isNoAdult, isToShort, isNoEmail;

        switch (name) {
            case 'surname':
                isEmpty = utils.isEmpty(item.value);

                statusArr.push(isEmpty);
                addError(name, 'empty', isEmpty);
                break;
            case 'name':
                isEmpty = utils.isEmpty(item.value);

                statusArr.push(isEmpty);
                addError(name, 'empty', isEmpty);
                break;
            case 'patron':
                isEmpty = utils.isEmpty(item.value);

                statusArr.push(isEmpty);
                addError(name, 'empty', isEmpty);
                break;
            case 'birth':
                isEmpty = utils.isEmpty(item.value);
                isNoDate = !utils.isDate(item.value);
                isNoAdult = !utils.haveEighteen(item.value);

                statusArr.push(isEmpty);
                statusArr.push(isEmpty);
                statusArr.push(isEmpty);
                addError(name, 'empty', isEmpty);
                addError(name, 'error', isNoDate);
                addError(name, 'access', isNoAdult);
                break;
            case 'pass':
                isEmpty = utils.isEmpty(item.value);
                isToShort = !utils.minLength(item.value, 10);

                statusArr.push(isEmpty);
                statusArr.push(isToShort);
                addError(name, 'empty', utils.isEmpty(item.value));
                addError(name, 'error', isToShort);
                break;
            case 'email':
                if (item.value.length) {
                    isNoEmail = !utils.isEmail(item.value);

                    statusArr.push(isNoEmail);
                    addError(name, 'error', isNoEmail);
                }
                break;
        }
    });

    return statusArr.some( item => {
        return item;
    });
}
