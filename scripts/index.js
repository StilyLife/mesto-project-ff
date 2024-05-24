const placesContainer = document.querySelector(".places__list");
const placeTemplate = document.querySelector("#card-template").content;

function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard({ name, link }) {
  const cardElement = placeTemplate.querySelector(".places__item").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function renderCard(cardElement) {
  placesContainer.append(cardElement);
}

function render() {
  initialCards.forEach(item => {
    const cardElement = createCard(item);
    renderCard(cardElement);
  });
}

render();