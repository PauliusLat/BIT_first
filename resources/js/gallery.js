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
            console.log(event.target.files);
            let array = Array.from(event.target.files);
            console.log(array);
            // let imgArray = new Array(array);
            // console.log(imgArray);

            // for (let i = 0; i < imgArray.length; i++) {
            //     filesAll = imgArray[i];
            // }
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
                    let altId = getID();
                    let deleteId = getID();
                    let deleteBtn = getID();
                    const output = document.getElementById("result");
                    const div = document.createElement("div");
                    div.className = "galleryDiv";
                    div.id = deleteId;

                    div.innerHTML = `<img class="uploadeImageGallery" src=" ${picFile.result} "
                      alt=" "/>
                      <label for="${deleteBtn}">Tag: </label>
                      <input type="text" id="${altId}" name="altImage">
                      <div class="deleteImd" id="${deleteBtn}">Trinti<div/>`;

                    output.insertBefore(div, currentDiv);

                    // const altText = document.getElementById(altId.name);
                    const imgDeleteBtn = document.getElementById(deleteBtn);
                    const deleteDiv = document.getElementById(deleteId);

                    imgDeleteBtn.addEventListener("click", () => {
                        filesAll.splice(i, 1);
                        deleteDiv.remove();
                    });

                });

                picReader.readAsDataURL(filesAll[i]);

            } else {
             //   const newContent = document.createTextNode("Tai nera paveikslelio tipo formatas");
                alert("Tai nera paveikslelio tipo formatas");
              //  currentDiv.appendChild(newContent);
            }
        } else {
          //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
            alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
         //   currentDiv.appendChild(newContent);
        }
    }

    arraySend.push(filesAll);

    const uploadeImg = document.getElementById("submitImg");
    console.log(isListener);

    if (isListener){
        uploadeImg.addEventListener('click', function () {
            console.log(arraySend);
            sendImageData(arraySend);
        });
        isListener = false;
    }
}

function sendImageData(filesAll) {
    // filesAll.filter((a, b) => filesAll.indexOf(a) === b)
    let formData = new FormData();

    let file = [];

    for (let i = 0; i < filesAll.length; i++) {
        for (let j = 0; j < filesAll[i].length; j++) {
            file.push(filesAll[i][j]);
        }
    }
    console.log(file);
    formData.append('images', file);

    // formData.append('text', allText);
    axios.post(uri + path + 'gallery-create-admin', formData, {
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

function getID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

export default startGallery();