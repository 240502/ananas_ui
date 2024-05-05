import { isNumber, showError, showSuccess } from './global';

export const checkEmailError = (input: any) => {
    var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (regex.test(input.value.trim())) {
        showSuccess(input);
        return false;
    } else {
        showError(input, 'Email không hợp lệ !');
        return true;
    }
};

export const checkPhoneError = (input: any) => {
    const phone = input.value.trim();
    let isError = false;
    for (var i = 0; i < phone.length; i++) {
        let number = parseInt(phone[i]);
        if (!isNumber(number)) {
            showError(input, 'Số điện thoại không chứa kí tự chữ!');
            isError = true;
        }
    }
    return isError;
};

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
