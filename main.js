(()=>{"use strict";var e=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e,t,n,o){var r=e.name,c=e.link,p=o.querySelector(".places__item").cloneNode(!0);p.querySelector(".card__title").textContent=r;var u=p.querySelector(".card__image");return u.src=c,u.alt=r,p.querySelector(".card__delete-button").addEventListener("click",(function(){return function(e){e.remove()}(p)})),p.querySelector(".card__like-button").addEventListener("click",t),u.addEventListener("click",(function(){return n(r,c)})),p}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),document.addEventListener("mousedown",p)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),document.removeEventListener("mousedown",p)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&r(t)}}function p(e){var t=document.querySelector(".popup_is-opened");t&&e.target===t&&r(t)}var u=document.querySelector(".places__list"),d=document.querySelector("#card-template").content,i=document.querySelector(".profile__edit-button"),a=document.querySelector(".profile__add-button"),s=document.querySelectorAll(".popup__close"),l=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_image"),f=m.querySelector(".popup__input_type_name"),k=m.querySelector(".popup__input_type_description"),q=m.querySelector(".popup__form"),S=y.querySelector(".popup__form"),L=S.querySelector(".popup__input_type_card-name"),E=S.querySelector(".popup__input_type_url"),g=v.querySelector(".popup__image"),h=v.querySelector(".popup__caption");function x(e){u.prepend(e)}function b(e,t){g.src=t,g.alt=e,h.textContent=e,o(v)}function C(){f.value=l.textContent,k.value=_.textContent,o(m)}function j(){o(y)}function w(e){r(e.target.closest(".popup"))}function D(e){e.preventDefault(),l.textContent=f.value,_.textContent=k.value,r(m)}function z(e){e.preventDefault(),x(n({name:L.value,link:E.value},t,b,d)),r(y),S.reset()}document.addEventListener("DOMContentLoaded",(function(){e.forEach((function(e){x(n(e,t,b,d))})),i.addEventListener("click",C),a.addEventListener("click",j),s.forEach((function(e){e.addEventListener("click",w)})),q.addEventListener("submit",D),S.addEventListener("submit",z)}))})();