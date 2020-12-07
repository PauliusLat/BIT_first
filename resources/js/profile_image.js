"use strict";
import Api from './api';

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
        }
      });
    } else {
      console.log("Your browser does not support File API");
    }
  }

  sendImageData(obj) {

    let image = this.file;
    if(image){
      obj.image = image;
    }
   
    let sendData = new Api();
    sendData.formDataApi(obj);
  }

}

export default Profile_image;