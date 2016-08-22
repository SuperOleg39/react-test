const cyryllicRegexp = /^[А-ЯЁ][а-яё]*$/ig;
const numberRegexp = /^[0-9.,-]+$/ig;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ig;

export function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

export function isEmail(value) {
  return value.match(emailRegexp);
}

export function isCyryllic(value) {
  return value.match(cyryllicRegexp);
}

export function isNumber(value) {
  return Number.isInteger(Number(value));
}

export function isDate(value) {
    let date = Date.parse(value);

    return !!Math.abs(date) && minLength(value, 10);
}

export function haveEighteen(value) {
    let date = Date.parse(value);
    let currentYear = new Date().getFullYear();
    let birthYear;

    if (Math.abs(date)) {
        birthYear = new Date(date).getFullYear();

        return Math.abs(currentYear - birthYear) >= 18;
    }

    return false;
}

export function isRequired(value) {
    return !isEmpty(value);
}

export function minLength(value, min) {
  return value.length >= min;
}

/**
 * @param { Element } input
 * @param { string } mask
 * @param { string } separator
 * @param { function } validateFunc
 */
export function applyMask(input, mask, separator, validateFunc) {
    let str = input.value;
    let maskLength = mask.split(separator).join('').length;
    let maskedStr = '';
    let maskSepPos = [];

    mask.split('').forEach( (item, i) => {
        if (item == separator) {
            maskSepPos.push(i - maskSepPos.length);
        }
    });

    let filteredStr = str.split('').filter( (item, i) => {
        return item != separator && validateFunc(item);
    });

    if (filteredStr.length > maskLength) {
        filteredStr = filteredStr.slice(0, maskLength);
    }

    filteredStr.forEach( (item, i) => {
        maskSepPos.forEach( item => {
            if (i == item) {
                maskedStr += separator;
            }
        });

        maskedStr += item;
    });

    input.value = maskedStr;
}
