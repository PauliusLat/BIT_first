"use strict";

import Profile_image from './profile_image';

class News {

  constructor(target) {
    this.target = target;
    this.getData();
  }

  getData() {

    const DOM = document.getElementById(this.target);

    if (DOM) {

      const parentElement = document.querySelector(".news-add");
      const editor = document.getElementById("editor");
      const title = document.createElement("input");
      title.setAttribute('placeholder', 'Pavadinimas');
      title.className = "titleInput";

      parentElement.insertBefore(title, editor);

      let readImage = new Profile_image();
      readImage.image();

      const newsPostTitle = document.querySelector(".titleInput");
      const editables = document.querySelectorAll("[contenteditable]");
      const button = document.getElementById("submit");
      const newsImageTitle = document.getElementById("newsName");
      const altText = document.getElementById("newsAlt");
      const catDown = document.querySelector(".catDown");
      const catUp = document.querySelector(".catUp")

      const tag = document.getElementById("newsTagInput");
      const newsCat = document.querySelector(".newsCat");

      catDown.addEventListener("click", () => {
        catUp.classList.remove("hiden");
        catDown.classList.add("hiden");
        newsCat.classList.remove("hiden");
      });

      catUp.addEventListener("click", () => {
        catUp.classList.add("hiden");
        catDown.classList.remove("hiden");
        newsCat.classList.add("hiden");
      });

      function getCheckedValues() {
        return Array.from(document.querySelectorAll('input[type="checkbox"]'))
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
      }

      let response;
      button.addEventListener(
        "click", () => {
          let obj = {
            title: newsPostTitle.value,
            tag: tag.value,
            api: 'news-store',
            content: editables[0].innerHTML,
            category: getCheckedValues(),
            alt: altText.value,
            imageTitle: newsImageTitle.value
          }

          if (obj.title) {
            response = readImage.sendImageData(obj);
            if (response) {
              window.location.reload();
            }
          } else {
            alert("Neįvestas pavadinimas!!!");
          }
        });
    }
  }
}

export default News;
