import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  apiDeleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./components/api.js";

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
const popupDeleteConfirm = document.querySelector(".popup_type_delete-confirm");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formNewCard = popupNewCard.querySelector(".popup__form");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

// Добавленные переменные для смены аватара
const avatarContainer = document.querySelector(".profile__image-container");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = popupAvatar.querySelector(".popup__form");
const avatarInput = formAvatar.querySelector(".popup__input_type_avatar");
const avatarError = formAvatar.querySelector(".popup__error_type_avatar");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

let currentUserId;
let nameInput, jobInput, submitButtonEditProfile;
let cardNameInput, linkInput, submitButtonNewCard;
let avatarUrlInput, submitButtonAvatar;
const avatarElement = document.querySelector(".profile__image");

// Функция для рендеринга всех карточек
function render() {
  getInitialCards()
    .then((cards) => {
      cards.forEach((item) => {
        const cardElement = createCard(
          item,
          toggleLike,
          openPopupImage,
          placeTemplate,
          currentUserId,
          openDeleteConfirmationPopup
        );
        placesContainer.prepend(cardElement);
      });
    })
    .catch((err) => console.error(err));
}

// Функция для открытия попапа подтверждения удаления
function openDeleteConfirmationPopup(cardId, cardElement) {
  if (!popupDeleteConfirm) {
    console.error("Popup delete confirm not found");
    return;
  }
  popupDeleteConfirm.cardId = cardId;
  popupDeleteConfirm.cardElement = cardElement;
  openPopup(popupDeleteConfirm);
}

// Обработчик подтверждения удаления карточки
function handleDeleteConfirmation(evt) {
  const cardId = popupDeleteConfirm.cardId;
  const cardElement = popupDeleteConfirm.cardElement;

  apiDeleteCard(cardId)
    .then(() => {
      deleteCard(cardElement);
      closePopup(popupDeleteConfirm);
    })
    .catch((err) => console.error(err));
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

// Функция для изменения текста кнопки во время загрузки
function setButtonText(buttonElement, text) {
  buttonElement.textContent = text;
}

// Обработчик открытия формы редактирования профиля
function handleProfileEditButtonClick() {
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

  setButtonText(submitButtonEditProfile, "Сохранение...");
  updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitButtonEditProfile, "Сохранить");
    });
}

// Обработчик отправки формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();

  setButtonText(submitButtonNewCard, "Сохранение...");
  addNewCard(cardNameInput.value, linkInput.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        toggleLike,
        openPopupImage,
        placeTemplate,
        currentUserId,
        openDeleteConfirmationPopup
      );
      renderCard(newCard);
      closePopup(popupNewCard);
      formNewCard.reset(); // Очищаем форму
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitButtonNewCard, "Сохранить");
    });
}

// Обработчик открытия формы смены аватара
function handleAvatarEditClick() {
  formAvatar.reset(); // Очищаем форму
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
}

// Обработчик отправки формы смены аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();

  setButtonText(submitButtonAvatar, "Сохранение...");
  updateAvatar(avatarUrlInput.value)
    .then((userData) => {
      avatarElement.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setButtonText(submitButtonAvatar, "Сохранить");
    });
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileName.textContent = userData.name; // Устанавливаем имя пользователя
      profileJob.textContent = userData.about; // Устанавливаем занятие пользователя
      avatarElement.style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach((item) => {
        const cardElement = createCard(
          item,
          toggleLike,
          openPopupImage,
          placeTemplate,
          currentUserId,
          openDeleteConfirmationPopup
        );
        placesContainer.prepend(cardElement);
      });
    })
    .catch((err) => console.error(err));

  nameInput = formEditProfile.querySelector(".popup__input_type_name");
  jobInput = formEditProfile.querySelector(".popup__input_type_description");
  submitButtonEditProfile = formEditProfile.querySelector(".popup__button");

  cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
  linkInput = formNewCard.querySelector(".popup__input_type_url");
  submitButtonNewCard = formNewCard.querySelector(".popup__button");

  avatarUrlInput = formAvatar.querySelector(".popup__input_type_avatar");
  submitButtonAvatar = formAvatar.querySelector(".popup__button");

  profileEditButton.addEventListener("click", handleProfileEditButtonClick);
  buttonOpenPopupCard.addEventListener("click", handleOpenPopupCardClick);
  closeButtons.forEach((button) =>
    button.addEventListener("click", handleCloseButtonClick)
  );
  formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
  formNewCard.addEventListener("submit", handleFormNewCardSubmit);
  popupDeleteConfirm
    .querySelector(".popup__button")
    .addEventListener("click", handleDeleteConfirmation);

  // Добавленные обработчики для смены аватара
  avatarContainer.addEventListener("click", handleAvatarEditClick);
  formAvatar.addEventListener("submit", handleFormAvatarSubmit);

  enableValidation(validationConfig);
});