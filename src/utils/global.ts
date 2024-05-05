export function showSuccess(input: any) {
    let parent = input.parentElement;
    let error__message = parent.querySelector('.error_message');
    parent.classList.remove('error');
    error__message.textContent = '';
}

export function showError(input: any, message: string) {
    let parent = input.parentElement;
    let error__message = parent.querySelector('.error_message');
    parent.classList.add('error');
    error__message.textContent = message;
}

export const checkEmptyError = (listInput: any[]) => {
    let isEmpty = false;
    console.log(listInput);
    if (listInput !== undefined) {
        listInput.forEach((input: any) => {
            if (input.type === 'text') {
                input.value = input.value.trim();
            }
            if (!input.value) {
                isEmpty = true;
                showError(input, 'Không được để trống ô này !');
            } else {
                showSuccess(input);
            }
        });
    }
    return isEmpty;
};
export const isNumber = (char: any) => {
    return !isNaN(parseInt(char));
};

export const handleFocusInput = (listInput: any) => {
    listInput.forEach((input: any) => {
        input.onfocus = () => {
            showSuccess(input);
        };
    });
};
