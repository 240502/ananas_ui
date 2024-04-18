export function toggleNav(): void {
    const list_btn_down = document.querySelectorAll('.tree-title');

    list_btn_down.forEach((item) => {
        item.addEventListener('click', function (e) {
            const parent = item.parentElement;
            if (parent?.classList.contains('open')) {
                parent?.classList.remove('open');
            } else {
                parent?.classList.add('open');
            }
        });
    });
}

export function activeItemTree(setCateId: any, id: any): void {
    const list_tree_item = document.querySelectorAll('.tree li');
    list_tree_item.forEach((item) => {
        item.addEventListener('click', function (e) {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                setCateId(0);
            } else {
                item.classList.add('active');
                setCateId(id);
            }
        });
    });
}
