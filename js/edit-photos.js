import {minScale, maxScale, minScaleStep, maxScaleStep} from './constants.js';

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

  scaleValue <= minScale ? scaleStep = minScaleStep : scaleStep = maxScaleStep;

  scaleValue -= scaleStep;

  changeScale(scaleValue);
});

plusScaleButton.addEventListener('click', () => {
  let scaleValue = parseInt(scaleInput.value);

  scaleValue >= maxScale ? scaleStep = minScaleStep : scaleStep = maxScaleStep;

  scaleValue += scaleStep;

  changeScale(scaleValue);
});

export {changeScale};
