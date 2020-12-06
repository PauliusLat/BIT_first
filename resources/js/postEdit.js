

"use strict";

import Api from './api';

function PostEdit(target) {

    this.target = target;
        this.api = new Api;
        this.init();
}

PostEdit.prototype.init = async function () {
    const DOM = document.getElementById('startNweaList');
    console.log(DOM);
    if (DOM) {
console.log(DOM);
        // const deleteApi = 'news-destroy&id=';
        // const editApi = "news-list";

        // let HTML = await this.api.getDAta(editApi);
        // DOM.innerHTML = HTML;

        // const newsList = document.querySelectorAll(".newsList");
        // const deleteNews = document.querySelectorAll(".btnNews");

        // for (let i = 0; i < newsList.length; i++) {
        //     let deleteId = deleteNews[i].id;
        //     deleteNews[i].addEventListener(
        //         "click",
        //         () => {
        //             this.api.delete(deleteApi, deleteId);
        //             setTimeout(location.reload(), 500);
        //         });
        // }
    }
}

export default PostEdit;