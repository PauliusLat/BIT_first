"use strict";

import Profile_image from './profile_image';
import Api from './api';

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



// function editNews(editId) {

//   axios
//     .get(
//       uri + path +
//       "news-edit-admin",
//       {
//         editId: editId
//       }
//     )
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
//   setTimeout(renderNews, 300);

// }

// function deleteNews(delId) {
//   axios
//     .post(
//       uri + path +
//       "news-destroy&id=" + delId
//     )
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//       console.log("Problemos su DeleteNews api");
//     });
//   setTimeout(renderNews, 100);
// }



// function collapseNews() {
//   var coll = document.getElementsByClassName("collapsible");
//   var i;

//   for (i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function (event) {
//       this.classList.toggle("active");
//       var content = this.nextElementSibling;
//       if (content.style.display === "block") {
//         content.style.display = "none";
//         event.target.innerHTML = 'SUKURTI NAUJIENĄ';
//       } else {
//         content.style.display = "block";
//         event.target.innerHTML = 'PASLĖPTI';
//       }
//     });
//   }
// }


// function renderNews() {

//   axios
//     .get(
//       uri + path +
//       "news-list",
//       {}
//     )
//     .then(function (response) {
//       if (response.status == 200 && response.statusText == "OK") {
//         const dom = document.getElementById("renderNewsList");
//         let HTMLString = response.data.htmlString;
//         dom.innerHTML = HTMLString;

//         const editBtn = document.querySelectorAll(".editBtnNews");
//         const deletetBtn = document.querySelectorAll(".deleteBtnNews");

//         for (let i = 0; i < editBtn.length; i++) {
//           let editId = editBtn[i].id;
//           editBtn[i].addEventListener(
//             "click", function () {
//               editNews(editId);
//             },
//             false
//           );
//         }
//         for (let i = 0; i < deletetBtn.length; i++) {
//           let delId = deletetBtn[i].id;
//           deletetBtn[i].addEventListener(
//             "click",
//             function () {
//               deleteNews(delId);
//             },
//             false
//           );
//         }
//       }


//       return response;
//     })
//     .catch(function (error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//       }
//       console.log(error);
//     });
// }




export default News;
