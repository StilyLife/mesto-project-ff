import { likeCard, unlikeCard } from "./api.js";

// Функция для удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для лайка карточки
export function toggleLike(cardElement, cardId) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    unlikeCard(cardId)
      .then((cardData) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = cardData.likes.length;
      })
      .catch((err) => console.error(err));
  } else {
    likeCard(cardId)
      .then((cardData) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = cardData.likes.length;
      })
      .catch((err) => console.error(err));
  }
}

// Функция для создания карточки
export function createCard(
  { name, link, likes, _id, owner },
  handleLike,
  handleImageClick,
  placeTemplate,
  currentUserId,
  openDeleteConfirmationPopup
) {
  const cardElement = placeTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (owner._id !== currentUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      openDeleteConfirmationPopup(_id, cardElement)
    );
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLike(cardElement, _id));

  const likeCountElement = cardElement.querySelector(".card__like-count");
  likeCountElement.textContent = likes.length;

  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}
