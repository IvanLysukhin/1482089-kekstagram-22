import {openPopup, closePopup} from './utils.js';

let templatePicture = document.querySelector('#picture').content.querySelector('a');
let picturesContainer = document.querySelector('.pictures');
let picturePopup = document.querySelector('.big-picture');

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

    let closeButton = picturePopup.querySelector('.cancel');

    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();

      openPopup(picturePopup);

      let bigPic = picturePopup.querySelector('.big-picture__img').querySelector('img');
      bigPic.src = pic.url;

      let bigLikes = picturePopup.querySelector('.likes-count');
      bigLikes.textContent = pic.likes;

      let bigComments = picturePopup.querySelector('.comments-count');
      bigComments.textContent = pic.comments.length;

      // Комментарии
      let commentsList = picturePopup.querySelector('.social__comments');

      pic.comments.forEach((comment) => {
        let newComment = document.createElement('li');
        newComment.classList.add('social__comment')

        let newCommentPic = document.createElement('img');
        newCommentPic.classList.add('social__picture');
        newCommentPic.style.width = '35px';
        newCommentPic.style.height = '35px';
        newComment.appendChild(newCommentPic);

        let newCommentText = document.createElement('p');
        newCommentText.classList.add('social__text');
        newComment.appendChild(newCommentText);

        newCommentPic.src = comment.avatar;
        newCommentPic.alt = comment.name;

        newCommentText.textContent = comment.message;

        commentsList.appendChild(newComment);
      })

      let bigDescription = picturePopup.querySelector('.social__caption');
      bigDescription.textContent = pic.description;

      closeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        closePopup(picturePopup)
        let comments = commentsList.querySelectorAll('li');
        comments.forEach(comment => comment.remove());
      });

      document.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 27) {
          closePopup(picturePopup);
          let comments = commentsList.querySelectorAll('li');
          comments.forEach(comment => comment.remove());
        }
      })
    })
  })
};

export {addPictures};
