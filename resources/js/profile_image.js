"use strict";

class Profile_image {

  constructor() {

    this.file = null;

  }

  image() {

    if (window.File && window.FileList && window.FileReader) {

      let filesInput = document.getElementById("files");

      filesInput.addEventListener("change", (event) => {

        let file = filesInput.files[0];

        const currentDiv = document.getElementById("message");

        if (file.size < 1048576 || file.length != 0 && file != undefined && file != null) {

          if (file.type.match('image')) {

            const picReader = new FileReader();

            picReader.addEventListener("load", (event) => {

              const picFile = event.target;
              const output = document.getElementById("result");
              const div = document.createElement("div");
              div.className = "galleryDiv";
              const removeUploade = document.querySelector(".wrapper");
              removeUploade.style.display = "none";
              div.innerHTML = `<img class="uploadeImageGallery" height="200px" width="200px" src="${picFile.result}" alt=" "/>`;

              output.insertBefore(div, currentDiv);

              const changeImage = document.querySelector(".galleryDiv");
              if (changeImage) {
                changeImage.addEventListener("click", () => {
                  removeUploade.style.display = "";
                  changeImage.remove();
                  filesInput.value = '';
                });
              }
            });

            picReader.readAsDataURL(file);

            this.file = file;

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
  }

  sendImageData(obj) {
    console.log(obj);
    const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
    const uri = document.location.origin;

    let formData = new FormData();
    if (obj.api) {
      if (obj.postTitle) {
        formData.append('postTitle', obj.postTitle);
      }
      if (obj.content) {
        formData.append('content', obj.content);
      }
      if (obj.alt) {
        formData.append('altText', obj.alt);
      }
      if (obj.imageTitle) {
        formData.append('imageTitle', obj.imageTitle);
      }

      formData.append('image', this.file);

      console.log(Object.fromEntries(formData))
      axios.post(uri + path + obj.api, formData, {

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
      // location.reload(); // uzkomentuoti jei norite kad nedingtu image
    }else{
      throw 'can not find API';
    }
  }

}

export default Profile_image;