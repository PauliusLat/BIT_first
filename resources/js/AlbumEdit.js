"use strict";

import Api from './api'

class AlbumEdit {

    constructor(target) {
        this.target = target;
        this.DOM = null;
        this.axios = new Api;
        this.array;
        this.add;
        this.init();
    }

    async init() {

        const DOM = document.querySelector(this.target);

        if (DOM) {
            const array = [...document.querySelectorAll(".imgePosition")];
            this.array = array;
            this.save();
            this.delete();
        }
    }

    save() {

        this.add = document.querySelector(".saveAlbum");
        const albumID = this.add.getAttribute('data');
        const title = document.querySelector(".albumTitle");
        const api = 'gallery-update-admin&id=';

        let id;
        let obj;   

        this.add.addEventListener("click", () => {
            id = this.check();

            if (!id) {
                id = this.add.id
            }
            obj = {
                api: api + albumID,
                title: title.value,
                profileImgID: id,
            }
            let response = this.axios.getResponseData(obj);
            if (response) {
                window.location.href = WPURLS.adminUrl+'galerija';
            }
           
        })
    }

    check() {

        const remove = document.querySelectorAll(".removeBtn");
        const select = document.querySelectorAll(".checkbox");
        let id = [];

        for (let i = 0; i < remove.length; i++) {

            if (select[i].checked) {
                id.push(remove[i].id);
            }
        }
        if (id.length > 1) {
            alert("Galima pasirinkite tik 1 albumo paveiksleli !!!")
        } else {
            return id[0]
        }
    }

    delete() {

        let check = true
        let response;

        for (let i = 0; i < this.array.length; i++) {
            let remove = this.array[i].children[1].children[0];
            let newRemove = async () => {
                if (check) {
                    if (this.add.id != remove.id) {
                        const api = 'album-image-destroy&id='
                        let id = remove.id;
                        this.array[i].remove();
                        this.array.splice(i, 1);
                        response = await this.axios.delete(api, id)
                        if (response) {
                            this.delete()
                            check = false;
                        }
                    } else {
                        alert("Albumo paveikslelio trinti negalima !!!")
                    }
                }
            }
            remove.addEventListener("click", newRemove);
        }
    }
}

export default AlbumEdit;