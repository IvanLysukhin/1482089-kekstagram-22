import {ERROR_DELAY, ESCAPE} from './constants.js';

let pageBody = document.querySelector('body');

let openPopup = (popup) => {
  popup.classList.remove('hidden');
  pageBody.classList.add('modal-open');
};

let closePopup = (popup) => {
  popup.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

let openErrorDataPopup = () => {
  let errorPopup = document.createElement('div');
  errorPopup.style.height = '50px';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.backgroundColor = '#ffaa99';
  errorPopup.style.position = 'fixed';
  errorPopup.style.padding = '10px';
  errorPopup.style.fontSize = '20px';
  errorPopup.style.top = '0';
  errorPopup.style.right = '0';
  errorPopup.style.left = '0';
  errorPopup.style.color = '#232321';
  errorPopup.textContent = 'Ошибка загрузки данных с сервера';

  document.body.appendChild(errorPopup);

  setTimeout(() => {
    errorPopup.remove();
  }, ERROR_DELAY)
};

let openMessage = (type) => {
  let mainContainer = document.querySelector('main');
  let messageTemplate = document.querySelector(`#${type}`).content.querySelector('section');
  let message = messageTemplate.cloneNode(true);

  let closeButton = message.querySelector('button');

  closeButton.addEventListener('click', () => {
    message.remove();
  });

  let closeMessageOnClick = (evt) => {
    if (evt.target === message) {
      message.remove();
      mainContainer.removeEventListener('click', closeMessageOnClick);
      document.removeEventListener('keydown', closeMessageOnEscape);
    }
  };

  mainContainer.addEventListener('click', closeMessageOnClick);

  let closeMessageOnEscape = (evt) => {
    if (evt.keyCode === ESCAPE) {
      message.remove();
      document.removeEventListener('keydown', closeMessageOnEscape);
      mainContainer.removeEventListener('click', closeMessageOnClick);
    }
  };

  document.addEventListener('keydown', closeMessageOnEscape);

  mainContainer.appendChild(message);
};

export {openPopup, closePopup, openErrorDataPopup, openMessage}
