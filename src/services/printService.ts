const PRINT_BODY_CLASS = 'particular-print';
const PRINT_CONTENT_CLASS = 'particular-print-content';

export const printService = Object.freeze({
  printContent: (content: HTMLElement): void => {
    document.body.classList.add(PRINT_BODY_CLASS);

    const printEl = document.createElement('div');
    printEl.innerHTML = content.innerHTML;
    printEl.classList.add(PRINT_CONTENT_CLASS);
    document.documentElement.append(printEl);

    window.print();

    printEl.remove();
    document.body.classList.remove(PRINT_BODY_CLASS);
  },
});
