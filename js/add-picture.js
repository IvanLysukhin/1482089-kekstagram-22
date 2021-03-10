let templatePicture = document.querySelector('#picture').content.querySelector('a');
let picturesContainer = document.querySelector('.pictures');

let addPictures = (data) => {
  data.forEach((pic) => {
    let newPicture = templatePicture.cloneNode(true);
    let picture = newPicture.querySelector('.picture__img');
    picture.src = pic.url;

    let likesNumber = newPicture.querySelector('.picture__likes');
    likesNumber.textContent = pic.likes;

    let commentsNumber = newPicture.querySelector('.picture__comments');
    commentsNumber.textContent = pic.comments.length;

    picturesContainer.appendChild(newPicture);
  })
};

export {addPictures};
