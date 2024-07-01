// Функция для открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc);
  document.addEventListener("mousedown", closePopupOnOverlay);
}

// Функция для закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  document.removeEventListener("mousedown", closePopupOnOverlay);
}

// Функция для закрытия модального окна по нажатию на Esc
function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция для закрытия модального окна по клику на  оверлей
function closePopupOnOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup && evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}
