(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"18661490-d1b5-4ef3-87a3-f96c1fd25588","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function o(e,t){var o=e.querySelector(".card__like-button"),c=e.querySelector(".card__like-count");o.classList.contains("card__like-button_is-active")?r(t).then((function(e){o.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.error(e)})):n(t).then((function(e){o.classList.add("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.error(e)}))}function c(e,t,n,r,o,c){var u=e.name,a=e.link,i=e.likes,l=e._id,s=e.owner,d=r.querySelector(".places__item").cloneNode(!0);d.querySelector(".card__title").textContent=u;var p=d.querySelector(".card__image");p.src=a,p.alt=u;var f=d.querySelector(".card__delete-button");return s._id!==o?f.remove():f.addEventListener("click",(function(){return c(l,d)})),d.querySelector(".card__like-button").addEventListener("click",(function(){return t(d,l)})),d.querySelector(".card__like-count").textContent=i.length,p.addEventListener("click",(function(){return n(u,a)})),d}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i),document.addEventListener("mousedown",l)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),document.removeEventListener("mousedown",l)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&a(t)}}function l(e){var t=document.querySelector(".popup_is-opened");t&&e.target===t&&a(t)}var s=function(e,t){var n=e.nextElementSibling;e.validity.valid?p(e,n,t):d(e,n,e.dataset.error||e.validationMessage,t),!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(e.value)&&e.value.length>0&&d(e,n,"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",t)},d=function(e,t,n,r){e.classList.add(r.inputErrorClass),t.textContent=n,t.classList.add(r.errorClass)},p=function(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass)},f=function(e,t,n){_(e)?(t.classList.add(n.inactiveButtonClass),t.disabled=!0):(t.classList.remove(n.inactiveButtonClass),t.disabled=!1)},_=function(e){return e.some((function(e){return!e.validity.valid}))},m=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){var n=e.nextElementSibling;p(e,n,t)})),f(n,r,t)};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v,h,S,b,q,E,L,k,C,g=document.querySelector(".places__list"),x=document.querySelector("#card-template").content,A=document.querySelector(".profile__edit-button"),U=document.querySelector(".profile__add-button"),w=document.querySelectorAll(".popup__close"),O=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),j=document.querySelector(".popup_type_edit"),D=document.querySelector(".popup_type_new-card"),I=document.querySelector(".popup_type_image"),P=document.querySelector(".popup_type_delete-confirm"),B=j.querySelector(".popup__form"),N=D.querySelector(".popup__form"),J=I.querySelector(".popup__image"),M=I.querySelector(".popup__caption"),z=document.querySelector(".profile__image-container"),H=document.querySelector(".popup_type_avatar"),$=H.querySelector(".popup__form"),Z=($.querySelector(".popup__input_type_avatar"),$.querySelector(".popup__error_type_avatar"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__error_visible"}),F=document.querySelector(".profile__image");function G(e,t){P?(P.cardId=e,P.cardElement=t,u(P)):console.error("Popup delete confirm not found")}function K(n){var r=P.cardId,o=P.cardElement;(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(r).then((function(){!function(e){e.remove()}(o),a(P)})).catch((function(e){return console.error(e)}))}function Q(e,t){J.src=t,J.alt=e,M.textContent=e,u(I)}function R(e,t){e.textContent=t}function V(){h.value=O.textContent,S.value=T.textContent,m(B,Z),u(j)}function W(){N.reset(),m(N,Z),u(D)}function X(e){a(e.target.closest(".popup"))}function Y(n){var r,o;n.preventDefault(),R(b,"Сохранение..."),(r=h.value,o=S.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){O.textContent=e.name,T.textContent=e.about,a(j)})).catch((function(e){return console.error(e)})).finally((function(){R(b,"Сохранить")}))}function ee(n){var r,u;n.preventDefault(),R(L,"Сохранение..."),(r=q.value,u=E.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:u})}).then(t)).then((function(e){var t;t=c(e,o,Q,x,v,G),g.prepend(t),a(D),N.reset()})).catch((function(e){return console.error(e)})).finally((function(){R(L,"Сохранить")}))}function te(){$.reset(),m($,Z),u(H)}function ne(n){var r;n.preventDefault(),R(C,"Сохранение..."),(r=k.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){F.style.backgroundImage="url(".concat(e.avatar,")"),a(H)})).catch((function(e){return console.error(e)})).finally((function(){R(C,"Сохранить")}))}document.addEventListener("DOMContentLoaded",(function(){Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=r[0],a=r[1];v=u._id,O.textContent=u.name,T.textContent=u.about,F.style.backgroundImage="url(".concat(u.avatar,")"),a.forEach((function(e){var t=c(e,o,Q,x,v,G);g.prepend(t)}))})).catch((function(e){return console.error(e)})),h=B.querySelector(".popup__input_type_name"),S=B.querySelector(".popup__input_type_description"),b=B.querySelector(".popup__button"),q=N.querySelector(".popup__input_type_card-name"),E=N.querySelector(".popup__input_type_url"),L=N.querySelector(".popup__button"),k=$.querySelector(".popup__input_type_avatar"),C=$.querySelector(".popup__button"),A.addEventListener("click",V),U.addEventListener("click",W),w.forEach((function(e){return e.addEventListener("click",X)})),B.addEventListener("submit",Y),N.addEventListener("submit",ee),P.querySelector(".popup__button").addEventListener("click",K),z.addEventListener("click",te),$.addEventListener("submit",ne),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);f(n,r,t),n.forEach((function(e){e.addEventListener("input",(function(){s(e,t),f(n,r,t)}))}))}(t,e)}))}(Z)}))})();