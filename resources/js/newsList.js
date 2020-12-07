"use strict";

import Api from './api';

class NewsList {

    constructor(target) {
        this.target = target;
        this.api = new Api;
        this.init();

    }

    async init() {
        const DOM = document.getElementById(this.target);

        if (DOM) {

            const deleteApi = 'news-destroy&id=';
            const listApi = "news-list";

            let HTML = await this.api.getDAta(listApi);
            DOM.innerHTML = HTML;

            const deleteNews = document.querySelectorAll(".deleteNews");
            const editNews = document.querySelectorAll(".edit");

            for (let i = 0; i < deleteNews.length; i++) {

                let deleteId = deleteNews[i].id;
                deleteNews[i].addEventListener(
                    "click",
                    () => {
                        this.api.delete(deleteApi, deleteId);
                        setTimeout(location.reload(), 500);
                    });
            }
        }
    }
}


export default NewsList;
