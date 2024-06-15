// Функция для удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  // Функция для лайка карточки
  export function toggleLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
  }
  
  // Функция для создания карточки
  export function createCard({ name, link }, handleLike, handleImageClick, placeTemplate) {
    const cardElement = placeTemplate.querySelector(".places__item").cloneNode(true);
  
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = name;
  
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = link;
    cardImage.alt = name;
  
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => deleteCard(cardElement));
  
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", handleLike);
  
    cardImage.addEventListener("click", () => handleImageClick(name, link));
  
    return cardElement;
  }
  