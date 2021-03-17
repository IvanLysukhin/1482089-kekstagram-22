/* global _:readonly */
import {RERENDER_DELAY, NUMBER_NEEDLESS_PHOTOS} from './constants.js';
import {addPictures} from './add-picture.js';
import {getData} from './data.js';

let defaultButton = document.querySelector('#filter-default');
let randomButton = document.querySelector('#filter-random');
let discussedButton = document.querySelector('#filter-discussed');

let clearPictures = () => {
  let previousPhotos = document.querySelectorAll('.picture');
  previousPhotos.forEach(photo => photo.remove());
}

let getRandomPhotos = (array) => {
  clearPictures();

  let newPhotos = _.shuffle(array).slice(NUMBER_NEEDLESS_PHOTOS);

  addPictures(newPhotos);
};

let sortPhotosByComments = (array) => {
  clearPictures();
  let sortedPhotos = array.sort((a, b) => {return b.comments.length - a.comments.length});

  addPictures(sortedPhotos);
};

let changeActiveClass = (target) => {

  let buttons = document.querySelectorAll('.img-filters__button');

  buttons.forEach((button) => {
    if (button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  })

  target.classList.add('img-filters__button--active');
};

defaultButton.addEventListener('click', _.debounce((evt) => {
  clearPictures();
  getData(addPictures);
  changeActiveClass(evt.target);
}, RERENDER_DELAY));

randomButton.addEventListener('click', _.debounce((evt) => {
  getData(getRandomPhotos);
  changeActiveClass(evt.target);
}, RERENDER_DELAY));

discussedButton.addEventListener('click', _.debounce((evt) => {
  getData(sortPhotosByComments);
  changeActiveClass(evt.target);
}, RERENDER_DELAY));
