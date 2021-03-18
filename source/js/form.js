import {openPopup, closePopup, openMessage} from './utils.js';
import {ESCAPE, DEFAULT_SCALE, MIN_HASHTAG_LENGTH, MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT, MAX_DESCRIPTION_LENGTH} from './constants.js';
import {changeScale, clearFilters} from './edit-photos.js';
import {sendData} from './data.js';
import {uploadUserPhoto, setDefaultPhoto} from './upload-photo.js';

let formPopup = document.querySelector('.img-upload__overlay');
let editForm = document.querySelector('.img-upload__form');
let cancelButton = formPopup.querySelector('#upload-cancel');
let uploadInput = document.querySelector('#upload-file');

let hashtagsInput = document.querySelector('.text__hashtags');
let descriptionInput = document.querySelector('.text__description');

let resetForm = () => {
  editForm.reset();
};

// Валидация формы

const SPACE = new RegExp('\\s+');
const WORD_SYMBOLS = new RegExp('\\w');

let checkSharp = (array) => {
  return array.some((hashtag) => {return hashtag[0] !== '#'});
};

let checkSymbols = (array) => {
  return array.some((hashtag) => {
    for (let i = 1; i < hashtag.length; i++) {
      if (hashtag[i].search(WORD_SYMBOLS) === -1) {
        return true;
      }
    }
  })
};

let checkMinLength = (array) => {
  return array.some((hashtag) => {return hashtag.length < MIN_HASHTAG_LENGTH})
};

let checkMaxLength = (array) => {
  return array.some((hashtag) => {return hashtag.length > MAX_HASHTAG_LENGTH})
};

let checkUniq = (array) => {
  for(let i = 0; i < array.length; i++) {
    let checkedElement = array[i].toLowerCase();
    for (let k = i + 1; k < array.length; k++) {
      if (checkedElement === array[k].toLowerCase()) {return true}
    }
  }
};

let checkCommentLength = () => {
  if(descriptionInput.value.length > MAX_DESCRIPTION_LENGTH) {
    descriptionInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  } else {
    descriptionInput.setCustomValidity('');
  }

  descriptionInput.reportValidity();
};

let checkHashTags = () => {
  let hashtagsArray = hashtagsInput.value.split(SPACE);

  if (checkSharp(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Хэш-тег должен начинать с #');
  } else if (checkSymbols(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Хэш-тег должен состоять только из букв и чисел');
  } else if (checkMinLength(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (checkMaxLength(hashtagsArray)) {
    hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов');
  } else if (hashtagsArray.length > MAX_HASHTAG_COUNT) {
    hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (checkUniq(hashtagsArray))  {
    hashtagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  } else {
    hashtagsInput.setCustomValidity('')
  }

  hashtagsInput.reportValidity();
};

let closePopupCancelButton = (evt) => {
  evt.preventDefault();
  closeFormPopup();
}

let closePopupEscape = (evt) => {
  if (evt.keyCode === ESCAPE && hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
    closeFormPopup();
  }
};

let closeFormPopup = () => {
  closePopup(formPopup);
  resetForm();
  clearFilters();
  setDefaultPhoto();

  hashtagsInput.removeEventListener('input', checkHashTags);
  descriptionInput.removeEventListener('input', checkCommentLength);

  cancelButton.removeEventListener('click', closePopupCancelButton);
  document.removeEventListener('keydown', closePopupEscape);
};

uploadInput.addEventListener('change', (evt)=> {
  evt.preventDefault();
  openPopup(formPopup);
  uploadUserPhoto(evt.target);
  changeScale(DEFAULT_SCALE);

  hashtagsInput.addEventListener('input', checkHashTags);
  descriptionInput.addEventListener('input', checkCommentLength);

  cancelButton.addEventListener('click', closePopupCancelButton);
  document.addEventListener('keydown', closePopupEscape);
});

let onSuccess = () => {
  closeFormPopup();
  openMessage('success');
}
let onError = () => {
  openMessage('error');
  editForm.style.zIndex = '1';
}

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let formData = new FormData(editForm);

  sendData(formData)
    .then(onSuccess)
    .catch(onError)
})
