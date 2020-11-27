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

      button.addEventListener(
        "click",
        () => {
          let obj = {
            api: 'news-store',
            content: editables[0].innerHTML,
            alt: altText.value,
            imageTitle: newsImageTitle.value,
            title: newsPostTitle.value
          }
          if (obj) {
            readImage.sendImageData(obj);
          }
        },
      );
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
