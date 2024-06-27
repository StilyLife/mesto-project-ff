import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { 
  validateForm, 
  nameInput, 
  jobInput, 
  nameError, 
  jobError, 
  saveButton, 
  validateNewCardForm, 
  newCardNameInput, 
  newCardLinkInput 
} from "./components/validation.js";

const placesContainer = document.querySelector(".places__list");
const placeTemplate = document.querySelector("#card-template").content;

const profileEditButton = document.querySelector(".profile__edit-button");
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formNewCard = popupNewCard.querySelector(".popup__form");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// Функция для рендеринга всех карточек
function render() {
  initialCards.forEach((item) => {
    const cardElement = createCard(
      item,
      toggleLike,
      openPopupImage,
      placeTemplate
    );
    renderCard(cardElement);
  });
}

// Функция для вставки карточки в разметку
function renderCard(cardElement) {
  placesContainer.prepend(cardElement);
}

// Открытие и закрытие попапов
function openPopupImage(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  openPopup(popupImage);
}

// Обработчик открытия формы редактирования профиля
function handleProfileEditButtonClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  nameError.textContent = "";
  jobError.textContent = "";
  nameInput.setCustomValidity("");
  jobInput.setCustomValidity("");
  nameInput.classList.remove('popup__input_error');
  jobInput.classList.remove('popup__input_error');
  validateForm();
  openPopup(popupEdit);
}

// Обработчик открытия формы добавления новой карточки
function handleOpenPopupCardClick() {
  formNewCard.reset(); // Очищаем форму
  validateNewCardForm(); // Проверяем форму
  openPopup(popupNewCard);
}

// Обработчики для кнопок закрытия попапов
function handleCloseButtonClick(evt) {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
}

// Обработчик отправки формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  if (!saveButton.disabled) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
  }
}

// Обработчик отправки формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  const newCard = createCard({ name, link }, toggleLike, openPopupImage, placeTemplate);
  renderCard(newCard);
  closePopup(popupNewCard);
  formNewCard.reset(); // Очищаем форму
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  render();
  profileEditButton.addEventListener("click", handleProfileEditButtonClick);
  buttonOpenPopupCard.addEventListener("click", handleOpenPopupCardClick);
  closeButtons.forEach((button) => {
    button.addEventListener("click", handleCloseButtonClick);
  });
  formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
  formNewCard.addEventListener("submit", handleFormNewCardSubmit);
  nameInput.addEventListener("input", validateForm);
  jobInput.addEventListener("input", validateForm);
  newCardNameInput.addEventListener("input", validateNewCardForm);
  newCardLinkInput.addEventListener("input", validateNewCardForm);
});