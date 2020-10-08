"use strict";


const uri = document.location.origin;

function startGallery(){
    window.addEventListener("load", renderGallery, false);
}

window.addEventListener('load', renderGallery);
// document.addEventListener("DOMContentLoaded",  renderGallery, false);
 function renderGallery() {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

        let filesInput = document.getElementById("files");
      
        let filesAll  = [];
        filesInput.addEventListener("change", function(event) {
            let files = event.target.files;
         
            const output = document.getElementById("result");
console.log(filesAll.length);
            for (let i = 0; i < files.length; i++) {
                filesAll.push(files) ;
                let file = files[i];

                if (files[i].size < 1048576) {

                    if (files[i].type.match('image')) {

                        const picReader = new FileReader();

                        picReader.addEventListener("load", function(event) {

                            const picFile = event.target;
                            const div = document.createElement("div");
                            div.className = "galleryDiv";

                            div.innerHTML = `<img class="uploadeGallery" src=" ${picFile.result} "
                              alt=" "/>
                              <input type="text" id="${files[i].name}+alt" name="altImage">
                              <div class="deleteImd" id="${files[i].name}" >Pasalinti<div/>`;

                            output.insertBefore(div, null);
                            const altText = document.getElementById(files[i].name + '+alt');

                            const imgDeleteBtn = document.getElementById(files[i].name);

                            imgDeleteBtn.onclick = function() {
                                div.innerHTML = `<div></div>`;

                                return file;
                            }

                            const uploadeImg = document.getElementById("submitImg");
                            uploadeImg.addEventListener('click', function() {
                                let altTextExport = [];
                                let altTextValue = altText.value;
                             //   altTextExport.push(altTextValue);
                               // sendImageData(file, i, altTextValue);
                                filesInput.value = null;
                                altText.value = "";
                                // window.location.reload();
                            });
                        });
                        picReader.readAsDataURL(file);
                    } else {
                        const currentDiv = document.getElementById("message");
                        const newContent = document.createTextNode("Tai nera paveikslelio tipo formatas");
                        currentDiv.appendChild(newContent);
                    }
                } else {
                    const currentDiv = document.getElementById("message");
                    const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
                    currentDiv.appendChild(newContent);
                }
            }
        });
    } else {
        console.log("Your browser does not support File API");
    }
}

// function newFile(file) {
    // console.log(file)

    //   for (let i = 0; i < files.length; i++) {
    //         let file = files[i];
    //  
    //  console.log(imgDeleteBtn)
    //   deleteCall = imgDeleteBtn.onclick = () => {
    //       div.innerHTML = `<div></div>`;
    //      console.log(file)
    //       return file;
    //   }
    //   imgDeleteBtn.addEventListener('click', deleteCall);
    //   const imdToDelete = document.querySelectorAll(".galleryDiv");
    //   const imgDeleteBtn = document.getElementById(file.name);
    //   let b = imgDeleteBtn.onclick = (function() {
    //      // console.log( file)
    //       imdToDelete.innerHTML = `<div></div>`;
    //    return file;
    //   })();
    //   return b;
    //   }

// }

function sendImageData(file, i, altTextValue) {

    let formData = new FormData();

    formData.append('images[' + i + ']', file);

   console.log('files[' + i + ']', file)

    axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=gallery-create-admin', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }).then(function(response) {

    }).catch(function(error) {
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

}

export default startGallery();