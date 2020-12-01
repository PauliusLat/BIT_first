"use strict";

import Api from './api';

class newsList {

    constructor(target) {
        this.target = target;
        this.api = new Api;
        this.init();

    }

   async init() {
        const DOM = document.getElementById(this.target);

        if (DOM) {
  
            const deleteApi = 'news-destroy&id=';
            const editApi = "news-edit";
            
            let HTML = await this.api.getDAta(editApi);
            DOM.innerHTML = HTML;

            const newsList = document.querySelectorAll(".newsList");
            const deleteNews = document.querySelectorAll(".deleteNews");

            for (let i = 0; i < newsList.length; i++) {
                let deleteId = deleteNews[i].id;
                deleteNews[i].addEventListener(
                    "click",
                    () => {
                        console.log(deleteApi, deleteId);
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
