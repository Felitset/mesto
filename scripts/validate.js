
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_message');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_message');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);

    } else {
      hideInputError(formElement, inputElement);
    
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const formButton = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, formButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, formButton);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  }

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  }; 

  const toggleButtonState = (inputList, formButton) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      formButton.classList.remove('popup__button_active');
      formButton.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      formButton.classList.add('popup__button_active');
      formButton.removeAttribute('disabled');
    }
  };
  

  function clearPopup() {
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    const spanList = [];
    inputList.forEach( (inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
        spanList.push(document.querySelector(`.${inputElement.id}-error`));
    });
    spanList.forEach((spanElement) => {
      spanElement.textContent = '';
    }) ;
       
  }

enableValidation({
    formElement: '.popup__form',
    formInput: '.popup__input',
    formButton: '.popup__button',
    activeButtonClass: 'popup__button_active',
    inputErrorClass: 'popup__input_type_error',
    errorElement: 'popup__input-error_message'
  }); 