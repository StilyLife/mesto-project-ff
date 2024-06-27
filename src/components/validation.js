const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const saveButton = document.querySelector('.popup__button');
const nameError = document.querySelector('.popup__error_type_name');
const jobError = document.querySelector('.popup__error_type_description');

const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');
const newCardNameError = document.querySelector('.popup__error_type_card-name');
const newCardLinkError = document.querySelector('.popup__error_type_url');

const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,40}$/;
const jobPattern = /^[A-Za-zА-Яа-яЁё\s-]{2,200}$/;
const cardNamePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/;
const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

function validateName() {
  const nameValue = nameInput.value.trim();
  if (nameValue.length === 0) {
    nameInput.setCustomValidity("Вы пропустили это поле.");
    nameError.textContent = nameInput.validationMessage;
    nameInput.classList.add('popup__input_error');
    return false;
  } else if (nameValue.length < 2) {
    nameInput.setCustomValidity(`Минимальное количество символов: 2. Длина текста сейчас: ${nameValue.length} символ${nameValue.length === 1 ? '' : 'а'}`);
    nameError.textContent = nameInput.validationMessage;
    nameInput.classList.add('popup__input_error');
    return false;
  } else if (!namePattern.test(nameValue)) {
    nameInput.setCustomValidity("Имя должно быть от 2 до 40 символов и содержать только латинские и кириллические буквы, знаки дефиса и пробелы.");
    nameError.textContent = nameInput.validationMessage;
    nameInput.classList.add('popup__input_error');
    return false;
  } else {
    nameInput.setCustomValidity("");
    nameError.textContent = "";
    nameInput.classList.remove('popup__input_error');
    return true;
  }
}

function validateJob() {
  const jobValue = jobInput.value.trim();
  if (jobValue.length === 0) {
    jobInput.setCustomValidity("Вы пропустили это поле.");
    jobError.textContent = jobInput.validationMessage;
    jobInput.classList.add('popup__input_error');
    return false;
  } else if (jobValue.length < 2) {
    jobInput.setCustomValidity(`Минимальное количество символов: 2. Длина текста сейчас: ${jobValue.length} символ${jobValue.length === 1 ? '' : 'а'}`);
    jobError.textContent = jobInput.validationMessage;
    jobInput.classList.add('popup__input_error');
    return false;
  } else if (!jobPattern.test(jobValue)) {
    jobInput.setCustomValidity("О себе должно быть от 2 до 200 символов и содержать только латинские и кириллические буквы, знаки дефиса и пробелы.");
    jobError.textContent = jobInput.validationMessage;
    jobInput.classList.add('popup__input_error');
    return false;
  } else {
    jobInput.setCustomValidity("");
    jobError.textContent = "";
    jobInput.classList.remove('popup__input_error');
    return true;
  }
}

function validateForm() {
  const isNameValid = validateName();
  const isJobValid = validateJob();
  saveButton.disabled = !isNameValid || !isJobValid;
  if (saveButton.disabled) {
    saveButton.classList.add('popup__button_disabled');
  } else {
    saveButton.classList.remove('popup__button_disabled');
  }
}

function validateNewCardName() {
  const nameValue = newCardNameInput.value.trim();
  if (nameValue.length === 0) {
    newCardNameInput.setCustomValidity("Вы пропустили это поле.");
    newCardNameError.textContent = newCardNameInput.validationMessage;
    newCardNameInput.classList.add('popup__input_error');
    return false;
  } else if (nameValue.length < 2 || nameValue.length > 30) {
    newCardNameInput.setCustomValidity("Название должно быть от 2 до 30 символов.");
    newCardNameError.textContent = newCardNameInput.validationMessage;
    newCardNameInput.classList.add('popup__input_error');
    return false;
  } else if (!cardNamePattern.test(nameValue)) {
    newCardNameInput.setCustomValidity("Название может содержать латинские и кириллические буквы, знаки дефиса и пробелы.");
    newCardNameError.textContent = newCardNameInput.validationMessage;
    newCardNameInput.classList.add('popup__input_error');
    return false;
  } else {
    newCardNameInput.setCustomValidity("");
    newCardNameError.textContent = "";
    newCardNameInput.classList.remove('popup__input_error');
    return true;
  }
}

function validateNewCardLink() {
  const linkValue = newCardLinkInput.value.trim();
  if (linkValue.length === 0) {
    newCardLinkInput.setCustomValidity("Вы пропустили это поле.");
    newCardLinkError.textContent = newCardLinkInput.validationMessage;
    newCardLinkInput.classList.add('popup__input_error');
    return false;
  } else if (!urlPattern.test(linkValue)) {
    newCardLinkInput.setCustomValidity("Пожалуйста, введите корректный URL.");
    newCardLinkError.textContent = newCardLinkInput.validationMessage;
    newCardLinkInput.classList.add('popup__input_error');
    return false;
  } else {
    newCardLinkInput.setCustomValidity("");
    newCardLinkError.textContent = "";
    newCardLinkInput.classList.remove('popup__input_error');
    return true;
  }
}

function validateNewCardForm() {
  const isNameValid = validateNewCardName();
  const isLinkValid = validateNewCardLink();
  saveButton.disabled = !isNameValid || !isLinkValid;
  if (saveButton.disabled) {
    saveButton.classList.add('popup__button_disabled');
  } else {
    saveButton.classList.remove('popup__button_disabled');
  }
}

nameInput.addEventListener('input', validateForm);
jobInput.addEventListener('input', validateForm);
newCardNameInput.addEventListener('input', validateNewCardForm);
newCardLinkInput.addEventListener('input', validateNewCardForm);

export { validateForm, validateName, validateJob, nameInput, jobInput, nameError, jobError, saveButton, validateNewCardForm, validateNewCardName, validateNewCardLink, newCardNameInput, newCardLinkInput, newCardNameError, newCardLinkError };