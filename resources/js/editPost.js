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
            const deleteApi = 'news-destroy&id=';
            const listApi = "news-list";
            const image = document.getElementById('image');
            const imageDiv = document.querySelector('.imageDiv');
            const imgBlock = document.querySelector('.galleryContainer');
            const save = document.querySelector('.save');
            const title = document.querySelector('.title');
            const content = document.querySelectorAll("[contenteditable]");
            const api = "news-update";

            var readImage = new Profile_image();

            imageDiv.addEventListener("click", () => {
                image.remove();
                imgBlock.classList.remove("hiden");                
                readImage.image();
            });
            save.addEventListener("click", () => {
                let obj = {
                    api:api,
                    title: title.value,
                    content: content[0].innerHTML,
                    imageTitle:"",
                    altText:""                
                }
                readImage.sendImageData(obj);
            })
        }
    }
}


export default EditPost;