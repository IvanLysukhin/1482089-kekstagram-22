import {openPopup, closePopup} from './utils.js';
import {ESCAPE, COMMENTS_ARRAY_LENGTH_LIMITER, ADD_COMMENTS_STEP} from './constants.js';

let templatePicture = document.querySelector('#picture').content.querySelector('a');
let picturesContainer = document.querySelector('.pictures');
let picturePopup = document.querySelector('.big-picture');
let commentsContainer = picturePopup.querySelector('.comments-count--show');
let addCommentsButton = document.querySelector('.comments-loader');

let deleteComments = () => {
  let comments = document.querySelectorAll('.social__comment');
  comments.forEach(comment => comment.remove());
};

let createComments = (array) => {
  let commentsList = picturePopup.querySelector('.social__comments');
  array.forEach((comment) => {
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
};

let checkCommentsArrayLength = (array) => {
  if (array.length <= COMMENTS_ARRAY_LENGTH_LIMITER) {
    commentsContainer.textContent = array.length;
    addCommentsButton.classList.add('hidden')
  } else {
    addCommentsButton.classList.remove('hidden');
  }
};

let addComments = (array) => {

  addCommentsButton.addEventListener('click', () => {
    let copyPhotoArray = array.splice(0, 5);
    if (copyPhotoArray.length < COMMENTS_ARRAY_LENGTH_LIMITER) {
      addCommentsButton.classList.add('hidden')
    } else {
      addCommentsButton.classList.remove('hidden');
    }

    createComments(copyPhotoArray);
  });
};

let addPictures = (data) => {

  // Добавляем миниатюры фото на страницу
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

    // Открытие попапа с фото
    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();

      openPopup(picturePopup);

      let bigPic = picturePopup.querySelector('.big-picture__img').querySelector('img');
      bigPic.src = pic.url;

      let bigLikes = picturePopup.querySelector('.likes-count');
      bigLikes.textContent = pic.likes;

      let bigComments = picturePopup.querySelector('.comments-count--all');
      commentsContainer.textContent = '5';
      bigComments.textContent = pic.comments.length;

      // Комментарии

      checkCommentsArrayLength(pic.comments);

      let commentsArray = pic.comments.slice();

      createComments(commentsArray.splice(0, 5));

      addComments(commentsArray);

      let commentNumber =  parseInt(commentsContainer.textContent);

      addCommentsButton.addEventListener('click', () => {
        let commentItemsNumber = picturePopup.querySelectorAll('.social__comment');

        commentNumber += ADD_COMMENTS_STEP;

        if (commentItemsNumber.length === pic.comments.length) {
          commentNumber = pic.comments.length;
        }

        commentsContainer.textContent= `${commentNumber}`;
      })


      let bigDescription = picturePopup.querySelector('.social__caption');
      bigDescription.textContent = pic.description;

      closeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        closePopup(picturePopup)
        deleteComments();
      });

      document.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ESCAPE) {
          closePopup(picturePopup);
          deleteComments();
        }
      })
    })
  })
};

export {addPictures};
