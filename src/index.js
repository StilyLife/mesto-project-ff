import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const placesContainer = document.querySelector(".places__list");
const placeTemplate = document.querySelector("#card-template").content;

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const formEditProfile = popupEdit.querySelector('.popup__form');
const formNewCard = popupNewCard.querySelector('.popup__form');
const newCardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const newCardLinkInput = formNewCard.querySelector('.popup__input_type_url');

// Функция для рендеринга всех карточек
function render() {
  initialCards.forEach(item => {
    const cardElement = createCard(item, toggleLike, openPopupImage, placeTemplate);
    renderCard(cardElement);
  });
}

// Функция для вставки карточки в разметку
function renderCard(cardElement) {
  placesContainer.prepend(cardElement); // Добавляем в начало контейнера
}

// Открытие и закрытие попапов
function openPopupImage(name, link) {
  const popup = popupImage;
  const popupImageElement = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  openPopup(popup);
}

// Обработчики для кнопок открытия попапов
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

addCardButton.addEventListener('click', () => openPopup(popupNewCard));

// Обработчики для кнопок закрытия попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

// Обработчик отправки формы редактирования профиля
formEditProfile.addEventListener('submit', function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
});

// Обработчик отправки формы добавления новой карточки
formNewCard.addEventListener('submit', function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  const newCard = createCard({ name, link }, toggleLike, openPopupImage, placeTemplate);
  renderCard(newCard);
  closePopup(popupNewCard);
  this.reset(); // Очищаем форму
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  render();
});
