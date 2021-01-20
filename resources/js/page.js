"use strict";
import Api from './api';
import Pagination from './pagination';

class Pag extends Pagination {
    constructor(target) {
        super();
        this.api = "page_create";
        this.target = target;
        this.pages = 5;
         this.axios = new Api;
        this.changes;
        this.watch = document.querySelector(".innerpage");
        this.init();
    }
    init() {
        const DOM = document.getElementById(this.target);

        if (DOM) {

            this.hashChange();
            this.paging();
        }
    }

    addAction() {
        const watch = this.watch
        this.create();
        this.delete();
        this.edit(watch);
    }

    create() {
        const title = document.getElementById("page_title");
        const api = "page_store";
        const submit = document.getElementById("create");

        submit.addEventListener("click", () => {
            let post = document.getElementById('post');
            let select = post.options[post.selectedIndex];
            let stateArray = []
            let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
            for (let i = 0; i < checkboxes.length; i++) {
                stateArray.push(checkboxes[i].value)
            }
            let obj = {
                api: api,
                page_title: title.value,
                post_type: select.value,
                page_state: stateArray
            }
            this.axios.formDataApi(obj);
            let changes = this.changes;
            window.removeEventListener('hashchange', changes);
            title.value = "";
            console.log(obj)
            return setTimeout(() => { this.init() }, (300));
        });
    }
    delete() {
        const deleteApi = "page_destroy&id=";
        const deleteBtn = document.querySelectorAll(".page-delete");
        if (deleteBtn) {
            for (let i = 0; i < deleteBtn.length; i++) {
                let deleteId = deleteBtn[i].value;
                deleteBtn[i].addEventListener(
                    "click",
                    () => {
                        this.axios.delete(deleteApi, deleteId);
                        // setTimeout(location.reload(), 500);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        return setTimeout(() => { this.init() }, (300))
                    });
            }
        }
    }
    edit(inner) {
        const editBtn = document.querySelectorAll(".page-edit");
        for (let i = 0; i < editBtn.length; i++) {
            let ID = editBtn[i].value;
            editBtn[i].addEventListener(
                "click",
                async () => {
                    const api = "page_edit&id=";
                    let obj = {
                        api: api + ID,
                        editID: ID,
                    }
                    let HTML = await this.axios.getPostData(obj);
                    inner.innerHTML = HTML;
                    const title = document.getElementById("page_title");
                    const name = document.getElementById("page_name");
                    const updateBtn = document.getElementById("pageUpdate");
                    updateBtn.addEventListener("click", async () => {
                        let stateArray = []
                        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                        for (let i = 0; i < checkboxes.length; i++) {
                            stateArray.push(checkboxes[i].value)
                        }
                        let post = document.getElementById('post');
                        let select = post.options[post.selectedIndex];
                        const api = "page_update&id=";
                        let obj = {
                            api: api + ID,
                            // updateId: updateBtn.value,
                            page_title: title.value,
                            page_name: name.value,
                            post_type: select.value,
                            page_state: stateArray
                        }
                        console.log(select.value)
                        this.axios.formDataApi(obj);
                        console.log(stateArray);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        // description.value = "";
                        // slug.value = "";
                        name.value = "";
                        return setTimeout(() => { this.init() }, (300))
                    });
                });
        }
    }
}
export default Pag;