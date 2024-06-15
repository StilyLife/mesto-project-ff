// Функция для открытия модального окна
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';
      popup.style.pointerEvents = 'auto';
      popup.style.userSelect = 'auto';
    }, 0);
    document.addEventListener('keydown', closePopupOnEsc);
    document.addEventListener('mousedown', closePopupOnOverlay);
  }
  
  // Функция для закрытия модального окна
  export function closePopup(popup) {
    popup.style.opacity = '0';
    popup.style.pointerEvents = 'none';
    popup.style.userSelect = 'none';
    popup.addEventListener('transitionend', () => {
      popup.style.visibility = 'hidden';
      popup.classList.remove('popup_opened', 'popup_is-animated');
    }, { once: true });
    document.removeEventListener('keydown', closePopupOnEsc);
    document.removeEventListener('mousedown', closePopupOnOverlay);
  }
  
  // Функция для закрытия модального окна по нажатию на Esc
  function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
  // Функция для закрытия модального окна по клику на оверлей
  function closePopupOnOverlay(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup && evt.target === openedPopup) {
      closePopup(openedPopup);
    }
  }
  