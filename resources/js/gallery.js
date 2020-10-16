"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;

const gallery = document.getElementById("loadeGallery");
let arraySend = [];
let isListener = true;

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

            let array = Array.from(event.target.files);

            renderImages(array);
        });
    } else {
        console.log("Your browser does not support File API");
    }
}

function renderImages(filesAll) {

    const currentDiv = document.getElementById("message");

    for (let i = 0; i < filesAll.length; i++) {

        if (filesAll[i].size < 1048576) {

            if (filesAll[i].type.match('image')) {

                const picReader = new FileReader();

                picReader.addEventListener("load", function (event) {

                    const picFile = event.target;
                    let deleteId = getID();
                    let deleteBtn = getID();
                    const output = document.getElementById("result");
                    const div = document.createElement("div");
                    div.className = "galleryDiv";
                    div.id = deleteId;

                    div.innerHTML = `<img class="uploadeImageGallery" src=" ${picFile.result} "
                      alt=" "/>
                      <label for="${deleteBtn}">Tag: </label>
                      <input type="text" id="${filesAll[i].name}" class="altInput" name="altImage" value="">
                      <div class="deleteImd" id="${deleteBtn}">Trinti<div/>`;

                    output.insertBefore(div, currentDiv);

                    const imgDeleteBtn = document.getElementById(deleteBtn);
                    const deleteDiv = document.getElementById(deleteId);

                    imgDeleteBtn.addEventListener("click", () => {
                        filesAll.splice(i, 1);
                        deleteDiv.remove();
                    });
                });

                picReader.readAsDataURL(filesAll[i]);

            } else {
                alert("Tai nera paveikslelio tipo formatas");
            }
        } else {
            alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
            //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
            //   currentDiv.appendChild(newContent);
        }
    }

    arraySend.push(filesAll);

    const uploadeImg = document.getElementById("submitImg");

    if (isListener) {
        uploadeImg.addEventListener('click', function () {

            arraySend = filter(arraySend);
            sendImageData(arraySend);

        });
        isListener = false;
    }
}

function sendImageData(filesAll) {

    let tagInput;
    let formData = new FormData();
    const album = document.getElementById('albumName');

    for (let i = 0; i < filesAll.length; i++) {
        tagInput = document.getElementById(filesAll[i].name);
        formData.append('files' + i, filesAll[i]);
        formData.append('tag' + i, tagInput.value + ' ');
    }

    formData.append('album', album.value);

    axios.post(uri + path + 'gallery-store-admin', formData, {
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
    // location.reload();
}

function getID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function filter(filesAll) {

    let file = [];
    for (let i = 0; i < filesAll.length; i++) {
        for (let j = 0; j < filesAll[i].length; j++) {
            if (filesAll[i][j] != undefined &&
                filesAll[i][j] != null &&
                filesAll[i][j] != "" &&
                filesAll[i][j] != NaN &&
                filesAll[i][j].size < 1048576) {

                file.push(filesAll[i][j]);
            }
        }
    }
    file = file.filter((power, toThe, yellowVests) => yellowVests.map(updateDemocracy => updateDemocracy['name']).indexOf(power['name']) === toThe)

    return file;
}

export default startGallery();