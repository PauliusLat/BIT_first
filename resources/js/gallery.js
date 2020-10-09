"use strict";


const uri = document.location.origin;

const gallery = document.getElementById("loadeGallery");

function startGallery() {
    if (gallery) {
        window.addEventListener("load", renderGallery, false);
    }
}

// window.addEventListener('load', renderGallery);
// document.addEventListener("DOMContentLoaded",  renderGallery, false);
function renderGallery() {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

        let filesInput = document.getElementById("files");
        let filesAll = [];

        filesInput.addEventListener("change", function (event) {

            let array = Array.from(event.target.files);
            let imgArray = new Array(array);

            for (let i = 0; i < imgArray.length; i++) {
                filesAll = imgArray[i];
            }

            renderImages(filesAll);
            // console.log(filesAll);

        });
    } else {
        console.log("Your browser does not support File API");
    }
}

function renderImages(filesAll) {
    let arraySend = [];
    // filesAll.forEach(element => console.log(element));
    for (let i = 0; i < filesAll.length; i++) {
        // console.log(filesAll[i]);
        if (filesAll[i].size < 1048576) {

            if (filesAll[i].type.match('image')) {

                const picReader = new FileReader();

                picReader.addEventListener("load", function (event) {

                    const picFile = event.target;
                    const output = document.getElementById("result");
                    const div = document.createElement("div");
                    div.className = "galleryDiv";

                    //console.log(picFile);

                    div.innerHTML = `<img class="uploadeGallery" src=" ${picFile.result} "
                      alt=" "/>
                      <input type="text" id="${filesAll[i].name}+alt" name="altImage">
                      <div class="deleteImd" id="${filesAll[i].name}" >Pasalinti<div/>`;

                    output.insertBefore(div, null);

                    const altText = document.getElementById(filesAll[i].name + '+alt');
                    const imgDeleteBtn = document.getElementById(filesAll[i].name);

                    imgDeleteBtn.addEventListener("click", () => {
                        filesAll.splice(i, 1);
                        div.innerHTML = `<div></div>`;
                    });

                });

                picReader.readAsDataURL(filesAll[i]);

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

    arraySend.push(filesAll);

    const uploadeImg = document.getElementById("submitImg");

    uploadeImg.addEventListener('click', function () {
        sendImageData(arraySend);
    });
}

function sendImageData(filesAll) {
    // filesAll.filter((a, b) => filesAll.indexOf(a) === b)

    let formData = new FormData();

    let file = [];

    for (let i = 0; i < filesAll.length; i++) {
        file = filesAll[i];

        console.log('files[' + i + ']', file)
        formData.append('images[' + i + ']', file);

    }
    // formData.append('text', allText);
    axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=gallery-create-admin', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
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

}

// function getNewArray(array, filesAll) {

//     for (var i = 0; i < array.length; i++) {
//         for (let j = 0; j < filesAll.length; j++) {
//             if (array[i].name == filesAll[j].name) {
//                 delete filesAll[j];
//             }
//         }
//         filesAll.push(array[i]);
//     }

//     filesAll = filesAll.filter(function () {
//         return true;
//     });
//     let newArray = [];
//     for (let i = 0; i < filesAll.length; i++) {
//         newArray.push(filesAll[i]);
//     }
//     //  filesAll =null;
//     // console.log(newArray);
//     return newArray;
// }

export default startGallery();