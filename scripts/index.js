const popupElement = document.querySelector('.popup');

const popupCloseButtonElement = document.querySelector('.popup__close');

const popupOpenButtonElement = document.querySelector('.profile__edit-button');
console.log(popupOpenButtonElement);

const openPopup = function() {
  popupElement.classList.remove('popup_is-closed');
};

const closePopup = function() {
  popupElement.classList.add('popup_is-closed');
};

popupCloseButtonElement.addEventListener('click', closePopup);
popupOpenButtonElement.addEventListener('click', openPopup);


let formElement = document.querySelector('.popup__form'); 

const submitButtonElement = document.querySelector('.popup__save-button');



function formSubmitHandler(evt) {
    evt.preventDefault(); 
    let jobInput = document.querySelector("input[name='profession']").value;

    const finalName = document.querySelector('.profile__name');
    const finalJob = document.querySelector('.profile__description');
    
    finalName.textContent=nameInput;
    finalJob.textContent =jobInput;
}

formElement.addEventListener('submit', formSubmitHandler);
submitButtonElement.addEventListener('click', closePopup);
