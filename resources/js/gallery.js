"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;

const gallery = document.getElementById("loadeGallery");

function startGallery() {
    if (gallery) {
        window.addEventListener("load", renderGallery, false);
    }
}

function renderGallery() {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

        let filesInput = document.getElementById("files");

        filesInput.addEventListener("change", function (event) {

            let array = filesInput.files[0];

            renderImages(array);
        });
    } else {
        console.log("Your browser does not support File API");
    }
}

function renderImages(file) {

    const currentDiv = document.getElementById("message");

    if (file.size < 1048576) {

        if (file.type.match('image')) {

            const picReader = new FileReader();

            picReader.addEventListener("load", function (event) {

                const picFile = event.target;
                const output = document.getElementById("result");
                const div = document.createElement("div");
                div.className = "galleryDiv";
                const removeUploade = document.querySelector(".wrapper");
                removeUploade.remove();
                div.innerHTML = `<img class="uploadeImageGallery" height="200px" width="200px" src=" ${picFile.result} "
                      alt=" "/>`;

                output.insertBefore(div, currentDiv);
            });

            picReader.readAsDataURL(file);

            const uploadeImg = document.getElementById("submitImg");

            uploadeImg.addEventListener('click', function () {

                sendImageData(file);

            });


        } else {
            alert("Tai nera paveikslelio tipo formatas");
        }
    } else {
        alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
        //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
        //   currentDiv.appendChild(newContent);
    }

}

function sendImageData(file) {

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
     location.reload();

}
export default startGallery();