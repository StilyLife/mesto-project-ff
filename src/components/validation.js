const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const saveButton = document.querySelector('.popup__button');
const nameError = document.querySelector('.popup__error_type_name');
const jobError = document.querySelector('.popup__error_type_description');

const namePattern = /^[A-Za-zА-Яа-яЁё\s-]{2,40}$/;
const jobPattern = /^[A-Za-zА-Яа-яЁё\s-]{2,200}$/;

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

nameInput.addEventListener('input', validateForm);
jobInput.addEventListener('input', validateForm);

export { validateForm, validateName, validateJob, nameInput, jobInput, nameError, jobError, saveButton };
