"use strict";

import Api from './api';

class AlbumList {

    constructor(target) {

        this.target = target;
        this.axios = new Api;
        this.array = [...document.querySelectorAll(".deleteAlbum")];
        this.delete();
    }

    delete() {
        const DOM = document.getElementById(this.target);

        if (DOM) {

            let check = true

            for (let i = 0; i < this.array.length; i++) {
                let remove = this.array[i].parentElement.parentElement.parentElement;

                let newRemove = e => {
                    if (check) {
                        e.stopPropagation();
                        // console.log(this.array[i]);
                        const api = 'album-destroy&id='
                        let id = this.array[i].id;
                        remove.remove();
                        this.array.splice(i, 1);
                        this.axios.delete(api, id);
                        this.delete()
                        check = false;
                    }
                }
                remove.addEventListener("click", newRemove);
                document.getElementsByTagName("form")[i].addEventListener("click", e => {
                    e.stopPropagation();
                })
            }           
        }
    }
}

export default AlbumList;