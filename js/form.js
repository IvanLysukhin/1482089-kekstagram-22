let formPopup = document.querySelector('.img-upload__overlay');
let pageBody = document.querySelector('body');
let cancelButton = formPopup.querySelector('#upload-cancel');
let uploadInput = document.querySelector('#upload-file');

let openPopup = () => {
  formPopup.classList.remove('hidden');
  pageBody.classList.add('modal-open');
}

let closePopup = () => {
  formPopup.classList.add('hidden');
  pageBody.classList.remove('modal-open');
}

uploadInput.addEventListener('change', (evt)=> {
  evt.preventDefault();
  openPopup();
});


cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closePopup();
  }
});
