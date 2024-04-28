import { isNumber, showError, showSuccess } from './global';

export const checkDateError = (inputEndDate: any, inputStartDate: any) => {
    const endDate: Date = inputEndDate.value;
    const startDate: Date = inputStartDate.value;
    if (startDate >= endDate) {
        showError(inputEndDate, 'Ngày kết thúc áp dụng phải lớn hơn ngày bắt đầu áp dụng !');
        showError(inputStartDate, 'Ngày kết thúc áp dụng phải lớn hơn ngày bắt đầu áp dụng !');
        return true;
    }
    return false;
};

export const checkDateWithCurrentDate = (inputDate: any) => {
    const date: any = inputDate.value;
    const currentDate = new Date();
    console.log(date);
    console.log(currentDate.toISOString().slice(0, 10));

    console.log(date < currentDate.toISOString().slice(0, 10));
    if (date < currentDate.toISOString().slice(0, 10)) {
        showError(inputDate, 'Ngày áp dụng phải lớn hơn hoặc bằng ngày hiện tại ');
        return true;
    }
    return false;
};

export const checkOutSoleNotIsNumber = (input: any) => {
    const outSole = input.value.trim();
    for (var i = 0; i < outSole.length; i++) {
        if (isNumber(outSole[i])) {
            showError(input, 'Chất liệu đế không chứa kí tự số ');
            return true;
        }
    }
    return true;
};
export const checkPriceIsNumber = (input: any) => {
    const price = input.value.trim();
    for (var i = 0; i < price.length; i++) {
        if (!isNumber(price[i])) {
            showError(input, 'Giá sản phẩm chỉ chứa kí tự số ');
            return false;
        }
    }
    return true;
};
export const checkSizeError = (inputEndSize: any, inputStartSize: any) => {
    const endSize: number = Number(inputEndSize.value.trim());
    const startSize: number = Number(inputStartSize.value.trim());
    if (startSize >= endSize) {
        showError(inputEndSize, 'Size bắt đầu phải nhỏ hơn size kết thúc !');
        showError(inputStartSize, 'Size bắt đầu phải nhỏ hơn size kết thúc !');

        return true;
    }
    return false;
};
export const checkSizeIsNumber = (input: any) => {
    const size = input.value.trim();
    for (var i = 0; i < size.length; i++) {
        if (!isNumber(size[i])) {
            showError(input, 'Size sản phẩm chỉ chứa kí tự số ');
            return false;
        }
    }
    return true;
};
export const handleFocusInput = (listInput: any) => {
    listInput.forEach((input: any) => {
        input.onfocus = () => {
            showSuccess(input);
        };
    });
};
