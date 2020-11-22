"use strict";


const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;

const newsStart = document.getElementById("startNewsAdmin");

function startNews() {
  if (newsStart) {

    const parentElement = document.querySelector(".news-add");
    const editor = document.getElementById("editor");
    const title = document.createElement("input");
    title.setAttribute('placeholder', 'Pavadinimas');
    title.className = "titleInput";

    parentElement.insertBefore(title, editor);


    window.addEventListener("load", () => {

      if (window.File && window.FileList && window.FileReader) {

        let filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function (event) {

          let file = filesInput.files[0];

          const currentDiv = document.getElementById("message");

          if (file.size < 1048576 && file.length != 0 && file != undefined && file != null) {

            if (file.type.match('image')) {

              const picReader = new FileReader();

              picReader.addEventListener("load", function (event) {

                const picFile = event.target;
                const output = document.getElementById("result");
                const div = document.createElement("div");
                div.className = "galleryDiv";
                const removeUploade = document.querySelector(".wrapper");
                removeUploade.style.display = "none";
                div.innerHTML = `<img class="uploadeImageGallery" height="200px" width="200px" src=" ${picFile.result} "
                            alt=" "/>`;

                output.insertBefore(div, currentDiv);

                const changeImage = document.querySelector(".galleryDiv");
                if (changeImage) {
                  changeImage.addEventListener("click", () => {
                    removeUploade.style.display = "";
                    changeImage.remove();
                    filesInput.value = ''
                  });
                }
              });

              picReader.readAsDataURL(file);
              
              const newsPostTitle = document.querySelector(".titleInput");
              const editables = document.querySelectorAll("[contenteditable]");
              const button = document.getElementById("submit");
              const newsImageTitle = document.getElementById("newsName");
              const altText = document.getElementById("newsAlt");

              button.addEventListener(
                "click",
                () => {

                  let content = editables[0].innerHTML;
                  let alt = altText.value;
                  let imageTitle = newsImageTitle.value;
                  let postTitle = newsPostTitle.value;
                  storeNews(content, alt, imageTitle, postTitle, file)
                }
              );
            } else {
              alert("Tai nera paveikslelio tipo formatas");
            }
          } else {
            alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
            //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
            //   currentDiv.appendChild(newContent);
          }
        });
      } else {
        console.log("Your browser does not support File API");
      }
    });
  } else {
    throw 'ERROR: header target location was not found.';
  }
}

function storeNews(content, alt, imageTitle, postTitle, file) {

  let formData = new FormData();

  const album = document.getElementById('albumName');

  formData.append('imge', file);
  formData.append('content', content);
  formData.append('altText', alt);
  formData.append('postTitle', postTitle);
  formData.append('imageTitle', imageTitle);
  // console.log(Object.fromEntries(formData))
  axios.post(uri + path + 'news-store', formData, {

  }).then(function (response) {
  }).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
  });
  //location.reload(); // uzkomentuoti jei norite kad nedingtu image

}

// storeNews(content, alt, title, file) {
//   console.log(content, alt, title, file);
//   axios
//     .post(
//       uri + path +
//       "news-store", {

//     });
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//       console.log("Problemos su StoreNews api");
//     });
// }


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




export default startNews();
