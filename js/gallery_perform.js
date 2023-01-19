'use strict';

import galleryItems from "./app.js";

const galleryList = document.querySelector('.js-gallery');

const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const fullImageBox = document.querySelector('.lightbox');
const fullImage = document.querySelector('.lightbox__image');
const boxOverlay = document.querySelector('.lightbox__overlay');

// console.log(galleryList); 

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
    target.classList.add("active");
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
    console.log(boxOverlay);
};

function closeImageWithOverlay(event){
    if(event.target !== event.currentTarget){
        return;
    };
    closeImage();
};




// console.log(fullImage);

boxOverlay.addEventListener('click', closeImageWithOverlay);
fullImage.addEventListener('click', closeImageWithOverlay)

function pressNext(event) {
    console.log(event.code);
    if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
      const items = document.querySelectorAll(".gallery__image");
      const itemsArr = Array.from(items);
      let idx = itemsArr.findIndex(elem => elem.classList.contains("active"));
      itemsArr[idx].classList.remove("active");
      
      if (event.code === "ArrowRight") {
        idx += 1;
      };
      if (event.code === "ArrowLeft") {
        idx -= 1;
      }
      if (idx < 0) {
          idx = itemsArr.length -1;
      }
      if (idx > itemsArr.length -1) {
          idx = 0;
      }
      const newImage = itemsArr[idx];
      newImage.classList.add("active");
      fullImage.setAttribute("src", `${newImage.dataset.source}`);
      fullImage.setAttribute("alt", `${newImage.getAttribute("alt")}`);
    }
  }
  document.addEventListener("keydown", pressNext);