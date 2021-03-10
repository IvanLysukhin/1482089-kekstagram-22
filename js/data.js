let getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      onSuccess(data);
    } )
}


export {getData};
