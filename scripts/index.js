const placesContainer = document.querySelector(".places__list");
const placeTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  const cardDelete = event.target.closest(".card");
  cardDelete.remove();
}

function renderCard({ name, link }, deleteCard) {
  const placeElement = placeTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  placeElement.querySelector(".card__title").textContent = name;
  placeElement.querySelector(".card__image").src = link;
  placeElement.querySelector(".card__image").alt = name;
  placeElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  placesContainer.append(placeElement);
}

function render() {
  initialCards.forEach(function (item) {
    renderCard(item, deleteCard);
  });
}

render();
