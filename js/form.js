import {openPopup, closePopup} from './utils.js';

let formPopup = document.querySelector('.img-upload__overlay');
let cancelButton = formPopup.querySelector('#upload-cancel');
let uploadInput = document.querySelector('#upload-file');

uploadInput.addEventListener('change', (evt)=> {
  evt.preventDefault();
  openPopup(formPopup);
});


cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup(formPopup);
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closePopup(formPopup);
  }
});
