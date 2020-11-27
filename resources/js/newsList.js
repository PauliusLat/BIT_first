"use strict";

import Api from './api';

class newsList {

    constructor(target) {
        this.target = target;
        this.api = new Api;
        this.init();
    }

    init() {
        const DOM = document.getElementById(this.target);

        if (DOM) {
            const deleteApi = 'news-destroy&id=';
            const newsList = document.querySelectorAll(".newsList");
            const deleteNews = document.querySelectorAll(".deleteNews");
            const editApi = "news-edit";
            let HTML = this.api.getDAta(editApi);
console.log(HTML);
            for (let i = 0; i < newsList.length; i++) {
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


    delete() {

        console.log(deleteNews);

        for (let i = 0; i < deleteNews.length; i++) {

            let deleteId = deleteNews[i].id;
            postBtn[i].addEventListener(

                "click",
                () => {
                    this.api.delete(deleteApi, deleteId);
                });
        }
    }
}


export default newsList;
