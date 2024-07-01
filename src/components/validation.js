const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const checkInputValidity = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling;
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      errorElement,
      inputElement.dataset.error || inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(inputElement, errorElement, config);
  }

  // Добавляем проверку на "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
  const pattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  if (!pattern.test(inputElement.value) && inputElement.value.length > 0) {
    showInputError(
      inputElement,
      errorElement,
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
      config
    );
  }
};

const showInputError = (inputElement, errorElement, errorMessage, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (inputElement, errorElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    hideInputError(inputElement, errorElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
};

export { enableValidation, clearValidation };
