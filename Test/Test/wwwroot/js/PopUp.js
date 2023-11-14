function AddPopUp() {
    let popupBb = document.querySelector('.popup_bg');
    let popup = document.querySelector('.popup');
    let openPopUpButton = document.querySelectorAll('.open-popup');
    let closePopUpButton = document.querySelector('.close-popup');

    openPopUpButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            popupBb.classList.add('active');
            popup.classList.add('active');
        })
    });

    closePopUpButton.addEventListener('click', () => {
        popupBb.classList.remove('active');
        popup.classList.remove('active');
        ClearInputs();
    });

    document.addEventListener('click', (e) => {
        if (e.target === popupBb) {
            popupBb.classList.remove('active');
            popup.classList.remove('active');
            ClearInputs();
        }
    })
};
AddPopUp();

