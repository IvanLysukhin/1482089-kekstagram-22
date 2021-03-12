import {openPopup, closePopup} from './utils.js';
import {ESCAPE, defaultScale} from './constants.js';
import {changeScale, clearFilters} from './edit-photos.js';

let formPopup = document.querySelector('.img-upload__overlay');
let editForm = document.querySelector('.img-upload__form')
let cancelButton = formPopup.querySelector('#upload-cancel');
let uploadInput = document.querySelector('#upload-file');

let resetForm = () => {
  editForm.reset();
}

uploadInput.addEventListener('change', (evt)=> {
  evt.preventDefault();
  openPopup(formPopup);

  changeScale(defaultScale);
});


cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup(formPopup);
  resetForm();
  clearFilters();
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESCAPE) {
    closePopup(formPopup);
    resetForm();
    clearFilters();
  }
});
