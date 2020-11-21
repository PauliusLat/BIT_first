"use strict";
import News from './news';

class Profile_image {

    constructor() {
   
    }

    image() {
    
        if (window.File && window.FileList && window.FileReader) {

            let filesInput = document.getElementById("files");

            filesInput.addEventListener("change", function (event) {

                let file = filesInput.files[0];
                
                const currentDiv = document.getElementById("message");

                if (file.size < 1048576 || file.length != 0 && file != undefined && file != null) {

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

                        const uploadeImg = document.getElementById("submit");

                        uploadeImg.addEventListener('click', () => {
                            // console.log(file);
                            let cal = new Profile_image();
                            cal.sendImageData(file)
                           
                        });

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

    sendImageData(file) {

        let formData = new FormData();

        const album = document.getElementById('albumName');

        formData.append('imge', file);

        formData.append('album', album.value);
        console.log(Object.fromEntries(formData))
        axios.post(uri + path + 'gallery-store-admin', formData, {

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
        location.reload(); // uzkomentuoti jei norite kad nedingtu image

    }
}



export default Profile_image;


class News {

    constructor(target) {
      this.target = target;
  
      this.image();
    }
  
    image() {
  
      const DOM = document.getElementById(this.target);
  
      if (DOM) {
  
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
  
                const editables = document.querySelectorAll("[contenteditable]");
                const button = document.getElementById("submit");
                const newsImageTitle = document.getElementById("newsName");
                const altText = document.getElementById("newsAlt");
  
                button.addEventListener(
                  "click",
                  () => {
                    let cal = new News();
                    let content = editables[0].innerHTML;
                    let alt = altText.value;
                    let title = newsImageTitle.value;
                    cal.storeNews(content, alt, title, file)
                  },
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
      } else {
        throw 'ERROR: header target location was not found.';
      }
    }
  
    storeNews(content, alt, title, file) {
      console.log(content, alt, title, file);
      axios
        .post(
          uri + path +
          "news-store", {
    
        }
        )
        .catch((err) => {
          console.log(err instanceof TypeError);
          console.log("Problemos su StoreNews api");
        });
    }
  }