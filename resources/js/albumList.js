"use strict";

import Api from './api';

class AlbumList {

    constructor(target) {
        this.target = target;
        this.api = new Api;
        this.init();

    }

    async init() {
        const DOM = document.getElementById(this.target);

        if (DOM) {

            const deleteApi = 'album-destroy&id=';
            const listApi = 'album-list';

            let HTML = await this.api.getDAta(listApi);
            DOM.innerHTML = HTML;

            const deleteAlbum = document.querySelectorAll(".deleteAlbum");

            for (let i = 0; i < deleteAlbum.length; i++) {

                let deleteId = deleteAlbum[i].id;
                deleteAlbum[i].addEventListener(
                    "click",
                    () => {
                        this.api.delete(deleteApi, deleteId);
                        setTimeout(location.reload(), 500);
                    });
            }
        }
    }
}

export default AlbumList;