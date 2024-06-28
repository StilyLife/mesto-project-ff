import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

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
  const nameInput = formEditProfile.querySelector('.popup__input_type_name');
  const jobInput = formEditProfile.querySelector('.popup__input_type_description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEdit);
}

// Обработчик открытия формы добавления новой карточки
function handleOpenPopupCardClick() {
  formNewCard.reset(); // Очищаем форму
  clearValidation(formNewCard, validationConfig);
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
  const nameInput = formEditProfile.querySelector('.popup__input_type_name');
  const jobInput = formEditProfile.querySelector('.popup__input_type_description');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик отправки формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const nameInput = formNewCard.querySelector('.popup__input_type_card-name');
  const linkInput = formNewCard.querySelector('.popup__input_type_url');
  const name = nameInput.value;
  const link = linkInput.value;
  const newCard = createCard({ name, link }, toggleLike, openPopupImage, placeTemplate);
  renderCard(newCard);
  closePopup(popupNewCard);
  formNewCard.reset(); // Очищаем форму
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  render();
  enableValidation(validationConfig);
  profileEditButton.addEventListener("click", handleProfileEditButtonClick);
  buttonOpenPopupCard.addEventListener("click", handleOpenPopupCardClick);
  closeButtons.forEach((button) => {
    button.addEventListener("click", handleCloseButtonClick);
  });
  formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
  formNewCard.addEventListener("submit", handleFormNewCardSubmit);
});