"use strict";
import Api from './api'

class ImageUploade {

    constructor(target) {

        this.target = target;
        this.DOM = null;
        this.path = WPURLS.apiUrl;
        this.index = 0;
        this.init();
    }

    init() {
        const DOM = document.getElementById(this.target);
        let filesAll = [];
        if (DOM) {

            if (window.File && window.FileList && window.FileReader) {

                let filesInput = document.getElementById("files");

                filesInput.addEventListener("change", (event) => {

                    let files = event.target.files;

                    for (let i = 0; i < files.length; i++) {
                        if (files[i].size <= 1048576) {
                            if (filesAll[i].type.match("image")) {
                                ((file, i) => {
                                    filesAll.push(file)

                                    const fileReader = new FileReader();

                                    fileReader.onloadend = (e) => {
                                        const imgFile = e.target;
                                        let j = this.index++

                                        let deleteId = this.getID();
                                        let dot = this.getID();
                                        let imageId = this.getID();
                                        let imadeDivId = this.getID();

                                        const tagInput = document.querySelector(".tagInput");
                                        const currentDiv = document.getElementById("message");
                                        const output = document.getElementById("result");
                                        const div = document.createElement("div");

                                        div.className = "galleryDiv";
                                        div.setAttribute("id", imadeDivId);
                                        div.innerHTML = `<img class="uploadeImageGallery galleryCell" data="false" tag="" id="${imageId}" src="${imgFile.result} "
                                      alt=" "/>
                                      <div class="dots" id="${dot}"><div/>`;
                                        output.insertBefore(div, currentDiv);

                                        let deleteDiv = document.querySelectorAll(".galleryDiv");
                                        let dots = document.getElementById(dot);
                                        const actionBtn = document.getElementById("actionBox");
                                        const deleteBtn = document.querySelector(".deleteImd");
                                        const checkBox = document.getElementById("c1");
                                        const image = document.querySelectorAll(".uploadeImageGallery");

                                        // console.log(deleteDiv[j])
                                        // console.log(j);

                                        dots.addEventListener("click", () => {

                                            tagInput.value = "";
                                            deleteDiv[j].setAttribute("id", deleteId);
                                            actionBtn.classList.remove("EventBoxHidden");
                                            actionBtn.classList.add("boxImg");

                                            actionBtn.addEventListener("click", renderActionBtn);

                                            function renderActionBtn() {

                                                actionBtn.removeEventListener("click", renderActionBtn);
                                                const checked = document.querySelector(".albumImage");

                                                if (checkBox.checked && !checked) {
                                                    deleteDiv[j].classList.add("albumImage");
                                                    image[j].setAttribute("data", "true");
                                                   
                                                    deleteDiv[j].removeAttribute("id", deleteId);
                                                } else {
                                                    image[j].setAttribute("data", "false");
                                                    deleteDiv[j].classList.remove("albumImage");
                                                    deleteDiv[j].removeAttribute("id");
                                                   
                                                }
                                                actionBtn.classList.remove("boxImg");
                                                actionBtn.classList.add("EventBoxHidden");
                                                checkBox.checked = false;
                                                image[j].setAttribute("tag", tagInput.value);
                                            }
                                        });
                                        deleteBtn.addEventListener("click", () => {

                                            let deleteImage = document.getElementById(deleteId);
                                            if (deleteImage) {
                                                deleteImage.remove();
                                                filesAll.splice(j, 1);
                                                this.index--;
                                                filesInput.value = "";

                                            }
                                            actionBtn.classList.remove("boxImg");
                                            actionBtn.classList.add("EventBoxHidden");
                                        });

                                    }
                                    fileReader.readAsDataURL(files[i]);
                                })(files[i], i);
                            } else alert("Tai nera paveikslelio tipo formatas");
                        } else alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");

                    }

                });
            }

        }
    }

    getID() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}


export default ImageUploade;