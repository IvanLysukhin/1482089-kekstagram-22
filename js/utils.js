let pageBody = document.querySelector('body');

let openPopup = (popup) => {
  popup.classList.remove('hidden');
  pageBody.classList.add('modal-open');
};

let closePopup = (popup) => {
  popup.classList.add('hidden');
  pageBody.classList.remove('modal-open');
};

export {openPopup, closePopup}
