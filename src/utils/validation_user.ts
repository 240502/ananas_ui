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
export const checkBirthDayError = (input: any) => {
    const birthday = input.value.trim();
    const date = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - date.getFullYear();
    if (age > 17 && age < 80) {
        return false;
    } else {
        showError(input, 'Ngày sinh không hợp lệ: tuổi của khách hàng phải từ 18 - 79 !');

        return true;
    }
};
export const checkPasswordError = (input: any) => {
    const pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    if (pattern.test(input.value.trim())) {
        return false;
    } else {
        showError(input, 'Mật khẩu phải từ 8 kí tự trở nên, có chứa: số, chữ hoa thường !');
        return true;
    }
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
