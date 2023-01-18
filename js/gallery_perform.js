'use strict';

import galleryItems from "./app.js";

const galleryList = document.querySelector('.js-gallery');

const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const fullImageBox = document.querySelector('.lightbox');
const fullImage = document.querySelector('.lightbox__image');
const boxOverlay = document.querySelector('.lightbox__content');

console.log(galleryList); 

galleryItems.forEach(galleryItems => {
    galleryList.insertAdjacentHTML('beforeend', 
    `<li class="gallery__item">

    <img 
    class="gallery__image"
    src="${galleryItems.preview}"
    data-source="${galleryItems.original}"
    alt="${galleryItems.description}"
    />

    <a
    class="gallery__link"
    href="${galleryItems.original}"
    >
    <span class="gallery__icon">
    <i class="material-icons"></i>
  </span>
    </li>
    `);
});

function openImage({target}) {
    if (target.tagName !== "IMG") {
        return;
      }
    fullImageBox.classList.add('is-open');  
    fullImage.setAttribute('src', `${target.dataset.source}`);
    fullImage.setAttribute('alt', `${target.getAttribute('alt')}`);
    document.addEventListener("keydown", closeImageWithEsc);

    // target.classList.add('active');
};

galleryList.addEventListener("click", openImage);

function closeImage() {
    fullImageBox.classList.remove('is-open');
    fullImage.setAttribute('src', ``);
};

closeBtn.addEventListener('click', closeImage);

function closeImageWithEsc(event){
    if(event.code !== 'Escape'){
        return;
    };
    closeImage();
};

function closeImageWithOverlay(e){
    if(e.target !== e.currentTarget){
        return;
    };
    closeImage();
};

boxOverlay.addEventListener('click', closeImageWithOverlay);