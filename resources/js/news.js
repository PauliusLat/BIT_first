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
      const category = document.getElementById("catNews");
      const tag = document.getElementById("tagNews");
      const newsCat = document.querySelector(".newsCat");
      const newsCatBtn = document.getElementById("create");


      category.addEventListener("click", () => {
        newsCat.style.display = "";
        const selectCat = document.getElementById("cat");
        selectCat.setAttribute("multiple", "multiple");
      });

      tag.addEventListener("click", () => {
        console.log(1111111111);
      });

      newsCatBtn.addEventListener("click", () => {
        newsCat.style.display = "none";
      });

      var select = document.getElementById('cat');
      const showAll = document.querySelector(".showAllSelected");

      var cat = [];
      var filteredAry = [];
      var tempCat = [];

      select.onchange = () => {
        var options = select.getElementsByTagName('option'),
          values;
        var text;

        for (var i = options.length; i--;) {

          if (options[i].selected) values = (options[i].value)
          if (options[i].selected) text = (options[i].innerText)
        }
        const showCat = document.createElement("div");
        const span = document.createElement("span");

        span.className = "closeCat";
        span.setAttribute("id", values);
        showCat.className = "selectedCat";
        span.innerHTML = "X";
        showCat.innerHTML = text.replace(/\s+/g, "");

        showAll.appendChild(span);
        showAll.appendChild(showCat);
        cat.push(values);


        const closeCat = document.querySelectorAll(".closeCat");
        const selectedCat = document.querySelectorAll(".selectedCat")

        closeCat[closeCat.length - 1].addEventListener(
          "click", () => {
            tempCat.push(closeCat[closeCat.length - 1].id)
            filteredAry = cat.filter(e => e !== closeCat[closeCat.length - 1].id)
            cat = filteredAry;
            closeCat[closeCat.length - 1].remove();
            selectedCat[closeCat.length - 1].remove();
          });
      }

      button.addEventListener(

        "click", () => {
          let obj = {
            api: 'news-store',
            content: editables[0].innerHTML,
            alt: altText.value,
            imageTitle: newsImageTitle.value,
            title: newsPostTitle.value,
            catTitle: document.getElementById("category-name").value,
            catContent: document.getElementById("category-description").value,
            category: cat
          }

          if (obj.title) {
            readImage.sendImageData(obj);
          } else {
            alert("Not written the title !!!");
          }
        });
    }
  }
}

export default News;
