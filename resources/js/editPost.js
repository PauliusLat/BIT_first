"use strict";

import Api from './api';
import Profile_image from './profile_image';

class EditPost {

    constructor(target) {
        this.target = target;
        this.api = new Api;
        this.init();
    }

    init() {
        const DOM = document.querySelector(this.target);
        if (DOM) {
            const id = document.querySelector('.newsBtnSend').id;
            const image = document.getElementById('image');
            const imageDiv = document.querySelector('.imageDiv');
            const imgBlock = document.querySelector('.galleryContainer');
            const save = document.querySelector('.newsBtnSend');
            const title = document.querySelector('.postTitle');
            const content = document.querySelectorAll("[contenteditable]");
            const getImage = document.querySelector('.getImage');
            const altText = document.getElementById('alt');
            const pavTtitle = document.getElementById('pavTtitle');
            const newsCat = document.querySelector('.newsCat');
            const catUp = document.querySelector('.catUp');
            const catDown = document.querySelector('.catDown')

            const api = "news-update";
            var readImage = new Profile_image();

            var read = () => {
                image.remove();
                imgBlock.classList.remove("hiden");
            }
            catDown.addEventListener("click", () => {
                newsCat.classList.remove("hiden");
                catUp.classList.remove("hiden");
                catDown.classList.add("hiden");
            })

            catUp.addEventListener("click", () => {
                newsCat.classList.add("hiden");
                catUp.classList.add("hiden");
                catDown.classList.remove("hiden");
            })

            function getCheckedValues() {
                return Array.from(document.querySelectorAll('input[type="checkbox"]'))
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.value);
            }

            var data = () => {
                let obj = {
                    api: api,
                    title: title.value,
                    content: content[0].innerHTML,
                    imageTitle: pavTtitle.value,
                    altText: altText.value,
                    id: id,
                    category: getCheckedValues()
                }
                readImage.sendImageData(obj);
            }

            if (getImage) {
                imageDiv.addEventListener("click", read);
                save.addEventListener("click", data)
                readImage.image();
            } else {
                imgBlock.classList.remove("hiden");
                readImage.image();
                save.addEventListener("click", data)
            }
        }
        // window.location.reload();
    }
}


export default EditPost;