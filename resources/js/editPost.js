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
            const id = document.querySelector('.save').id;
            const image = document.getElementById('image');
            const imageDiv = document.querySelector('.imageDiv');
            const imgBlock = document.querySelector('.galleryContainer');
            const save = document.querySelector('.save');
            const title = document.querySelector('.title');
            const content = document.querySelectorAll("[contenteditable]");
            const getImage = document.querySelector('.getImage');

            const api = "news-update";
            var readImage = new Profile_image();

            var read = () => {
                image.remove();
                imgBlock.classList.remove("hiden");
            }

            var data = () => {
                let obj = {
                    api: api,
                    title: title.value,
                    content: content[0].innerHTML,
                    imageTitle: "",
                    altText: "",
                    id: id
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

    }
}


export default EditPost;