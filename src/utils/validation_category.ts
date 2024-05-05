import { isNumber, showError } from './global';

export const checkNameError = (input: any) => {
    const name = input.value.trim();
    let isError = false;

    for (var i = 0; i < name.length; i++) {
        let number = parseInt(name[i]);
        if (isNumber(number)) {
            showError(input, 'Tên khách hàng không chứa kí tự số!');
            isError = true;
        }
    }
    return isError;
};
