"use strict";
import Pagination from './pagination';

class Page extends Pagination {
    constructor(target) {
        super();
        this.api = "page_create";
        this.target = target;
        this.pages = 5;
        this.changes;
        this.watch = document.querySelector(".pageCreateList");
        this.init();
    }

    init() {
        const DOM = document.getElementById(this.target);
        if (DOM) {
            let hash = location.hash.split('#')[1];
            if (hash) {
                this.hashChange(hash);
            } else {
                this.hashChange();
            }
            this.paging();
        }
    }

    addAction() {
        this.delete();
        this.create();
        this.edit();
    }

    create() {
        const title = document.getElementById("page_title");
        const api = "page_store";
        const submit = document.getElementById("create");

        submit.addEventListener("click", async () => {
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

            let response = await this.axios.getResponseData(obj);
            let changes = this.changes;
            window.removeEventListener('hashchange', changes);
            title.value = "";

            if (response) {
                return this.init();
            } else {
                throw console.error("Api do not return response !!!");
            }
        });
    }
    delete() {
        const deleteApi = "page_destroy&id=";
        const deleteBtn = document.querySelectorAll(".page-delete");
        if (deleteBtn) {
            for (let i = 0; i < deleteBtn.length; i++) {
                let deleteId = deleteBtn[i].value;
                deleteBtn[i].addEventListener(
                    "click", async () => {
                        let response = await this.axios.delete(deleteApi, deleteId);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        if (response) {
                            return this.init();
                        } else {
                            throw console.error("Api do not return response !!!");
                        }
                    });
            }
        }
    }
    edit() {
        const editBtn = document.querySelectorAll(".page-edit");

        for (let i = 0; i < editBtn.length; i++) {
            let ID = editBtn[i].value;
            editBtn[i].addEventListener("click", async () => {
                const api = "page_edit&id=";
                let obj = {
                    api: api + ID,
                    editID: ID,
                }
            
                    let HTML = await this.axios.getPostData(obj);
                    let editInsert = document.querySelector('.pageEdit');
                    editInsert.innerHTML = HTML;
                    editInsert.style.display = 'inline-block';
                    let close = document.querySelector('.close');
                    close.addEventListener('click', function () {
                        return editInsert.style.display = 'none';
                    })
                    const title = document.getElementById("page_title_edit");
                    const name = document.getElementById("page_name_edit");
                    const updateBtn = document.getElementById("pageUpdate");

                    updateBtn.addEventListener("click", async () => {
                        let stateArray = []
                        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                        for (let i = 0; i < checkboxes.length; i++) {
                            stateArray.push(checkboxes[i].value)
                        }
                        let post = document.getElementById('post_edit');
                        let select = post.options[post.selectedIndex];
                        console.log(select);
                        const api = "page_update&id=";
                        let obj = {
                            api: api + ID,
                            page_title: title.value,
                            page_name: name.value,
                            post_type: select.value,
                            page_state: stateArray
                        }

                        let response = await this.axios.getResponseData(obj);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        close.removeEventListener('click', function () {
                            return editInsert.style.display = 'none';
                        })
                        editInsert.style.display = 'none';
                        name.value = "";
                         if (response) {
                        return this.init();
                    } else {
                        throw console.error("Api do not return response !!!");
                    }
                    });
                });
            // });
        }
    }
}
export default Page;