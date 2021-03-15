import {openErrorDataPopup} from './utils.js';

let getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(openErrorDataPopup)
}

let sendData = (data) => {
  return fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  )
};


export {getData, sendData};
