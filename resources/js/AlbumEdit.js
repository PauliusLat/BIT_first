"use strict";

import Api from './api'

class AlbumEdit {

    constructor(target) {
        this.target = target;
        this.DOM = null;
        this.init();
    }

    async init() {

        const DOM = document.querySelector(this.target);
        if (DOM) {
            this.save();
        }
    }

    save() {

        const save = document.querySelector(".saveAlbum");
        const title = document.querySelector(".albumTitle");
        let id;
        let axios = new Api;
        const api = 'gallery-update-admin';
        let obj;

        save.addEventListener("click", () => {
            id = this.check();

            if (!id) {
                id = save.id
            }

            obj = {
                api: api,
                title: title.value,
                profileImgID: id
            }
            axios.formDataApi(obj)
        })
    }

    check() {

        const remove = document.querySelectorAll(".removeBtn");
        const select = document.querySelectorAll(".checkbox");
        let id = null;

        for (let i = 0; i < remove.length; i++) {

            if (select[i].checked) {
                id = remove[i].id;
            }
        }
        return id;
    }
}

export default AlbumEdit;