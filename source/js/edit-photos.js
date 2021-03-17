/* global noUiSlider:readonly */
import {MIN_SCALE,
  MAX_SCALE,
  MIN_SCALE_STEP,
  MAX_SCALE_STEP,
  WORD_LENGTH,
  SLIDER_DEFAULT_MIN,
  SLIDER_DEFAULT_MAX,
  SLIDER_DEFAULT_START,
  SLIDER_DEFAULT_STEP} from './constants.js';

let minusScaleButton = document.querySelector('.scale__control--smaller');
let plusScaleButton = document.querySelector('.scale__control--bigger');
let scaleInput = document.querySelector('.scale__control--value');
let photoPreview = document.querySelector('.img-upload__preview').querySelector('img');

let scaleStep;

let changeScale = (value) => {
  scaleInput.value = `${value}%`;
  photoPreview.style.transform = `scale(${value / 100})`;
}

minusScaleButton.addEventListener('click', () => {
  let scaleValue = parseInt(scaleInput.value);

  scaleValue <= MIN_SCALE ? scaleStep = MIN_SCALE_STEP : scaleStep = MAX_SCALE_STEP;

  scaleValue -= scaleStep;

  changeScale(scaleValue);
});

plusScaleButton.addEventListener('click', () => {
  let scaleValue = parseInt(scaleInput.value);

  scaleValue >= MAX_SCALE ? scaleStep = MIN_SCALE_STEP : scaleStep = MAX_SCALE_STEP;

  scaleValue += scaleStep;

  changeScale(scaleValue);
});

let sliderContainer = document.querySelector('.effect-level__slider');

// Фото-фильтры

let photoFilters = document.querySelectorAll('.effects__radio');
let effectValueInput = document.querySelector('.effect-level__value');

let addFilter = (id, minFilterValue, maxFilterValue, filterStep, filterStart, styleFilterName, unit) => {
  photoPreview.className = '';
  let filterName = id.slice(WORD_LENGTH);
  let className = `effects__preview-${filterName}`;
  photoPreview.classList.add(className);

  sliderContainer.noUiSlider.updateOptions({
    range: {
      min: minFilterValue,
      max: maxFilterValue,
    },
    step: filterStep,
    start: filterStart,
  });

  sliderContainer.noUiSlider.on('update', (_, handle, unencoded) => {
    let value = unencoded[handle];
    effectValueInput.value = sliderContainer.noUiSlider.get();
    photoPreview.style.filter = `${styleFilterName}(${value}${unit})`;
  });
};

let clearFilters = () => {
  photoPreview.className = '';
  photoPreview.style.filter = '';

  if (document.querySelector('.noUi-target')) {
    sliderContainer.noUiSlider.destroy();
  }
};

photoFilters.forEach((filter) => {
  filter.addEventListener('change', (evt) => {

    if (!document.querySelector('.noUi-target')) {
      noUiSlider.create(sliderContainer, {
        range: {
          min: SLIDER_DEFAULT_MIN,
          max: SLIDER_DEFAULT_MAX,
        },
        start: SLIDER_DEFAULT_START,
        step: SLIDER_DEFAULT_STEP,
        connect: 'lower',
      });
    }

    switch (evt.target.id) {
      case 'effect-chrome':
        return addFilter(evt.target.id, 0, 1, 0.1, 0.5, 'grayscale', '');
      case 'effect-sepia':
        return addFilter(evt.target.id, 0, 1, 0.1, 0.5, 'sepia', '');
      case 'effect-marvin':
        return addFilter(evt.target.id, 0, 100, 1, 100, 'invert', '%');
      case 'effect-phobos':
        return addFilter(evt.target.id, 0, 3, 0.1, 2, 'blur', 'px');
      case 'effect-heat':
        return addFilter(evt.target.id, 1, 3, 0.1, 2, 'brightness', '');
      default:
        return clearFilters();
    }
  })
})

export {changeScale, clearFilters};
