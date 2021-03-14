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


// Валидация формы

let hashtagsInput = document.querySelector('.text__hashtags');
// let descriptionInput = document.querySelector('.text__description');

let space = new RegExp('\\s+');
let regHashtag = new RegExp('\\w');


let checkSharp = (array) => {
  return array.some((hashtag) => {return hashtag[0] !== '#';})
};

let checkSymbols = (array) => {
  return array.some((hashtag) => {
    for (let i = 1; i < hashtag.length; i++) {
      if (hashtag[i].search(regHashtag) === -1) {
        return true;
      }
    }
  })
};

let checkMinLength = (array) => {
  return array.some((hashtag) => {return hashtag.length < 2})
};

let checkMaxLength = (array) => {
  return array.some((hashtag) => {return hashtag.length > 20})
};

let checkUniq = (array) => {
  for(let i = 0; i < array.length; i++) {
    let checkedElement = array[i].toLowerCase();
    for (let k = i + 1; k < array.length; k++) {
      if (checkedElement === array[k].toLowerCase()) {return true}
    }
  }
};

hashtagsInput.addEventListener('input', () => {
  let hashtagsArray = hashtagsInput.value.split(space);

  if (checkSharp(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Хэш-тег должен начинать с #');
  } else if (checkSymbols(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Хэш-тег должен состоять только из букв и чисел');
  } else if (checkMinLength(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (checkMaxLength(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
  } else if (hashtagsArray.length > 5) {
    hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (checkUniq(hashtagsArray))  {
    hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  } else (hashtagsInput.setCustomValidity(''));

  hashtagsInput.reportValidity();
});
