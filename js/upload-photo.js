import {FILE_TYPES} from './constants.js';
let previewPhoto = document.querySelector('.img-upload__preview img');

let uploadUserPhoto = (target) => {
  let file = target.files[0];

  let checkFile = FILE_TYPES.some((type) => {
    return file.name.endsWith(type);
  });

  if (checkFile) {
    let fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.addEventListener('load', () => {
      previewPhoto.src = fileReader.result;
    });
  }
};

let setDefaultPhoto = () => {
  previewPhoto.src = 'img/upload-default-image.jpg';
};

export {uploadUserPhoto, setDefaultPhoto}
