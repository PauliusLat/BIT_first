/** @format */

"use strict";
import Pagination from './pagination';


class Tag extends Pagination {
    constructor(target) {
        super();
        this.api = 'tag_create';
        this.pages = 5;
        this.target = target;
        this.changes;
        this.watch = document.querySelector(".tagCreateList");
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
        this.create();
        this.delete();
        this.edit();
    }

    create() {
        const name = document.getElementById("tag-name")
        const slug = document.getElementById("tag-slug");
        const description = document.getElementById("tag-description");
        const storeTag = document.getElementById("create");
        storeTag.addEventListener("click", async () => {
            let obj = {
                api: 'tag_store',
                tag_name: name.value,
                tag_slug: slug.value,
                tag_description: description.value
            }
            let response = await this.axios.getResponseData(obj);
            let changes = this.changes;
            window.removeEventListener('hashchange', changes);
            name.value = ""
            slug.value = ""
            description.value = ""
            if (response) {
                return this.init();
            } else {
                throw console.error("Api do not return response !!!");
            }
        });
    }
    delete() {
        const api = "tag_destroy";
        const deleteBtn = document.querySelectorAll(".tag-delete");
        if (deleteBtn) {
            for (let i = 0; i < deleteBtn.length; i++) {
                let ID = deleteBtn[i].value;
                let taxonomy = deleteBtn[i].id;
                deleteBtn[i].addEventListener(
                    "click", async () => {
                        let obj = {
                            api: api,
                            deleteID: ID,
                            taxonomy_type: taxonomy
                        }
                        let response = await this.axios.getResponseData(obj);
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
        const editBtn = document.querySelectorAll(".tag-edit");
        for (let i = 0; i < editBtn.length; i++) {
            let ID = editBtn[i].value;
            let taxonomy = editBtn[i].id;
            editBtn[i].addEventListener(
                "click", async () => {
                    const api = "tag_edit";
                    let obj = {
                        api: api,
                        editID: ID,
                        taxonomy_type: taxonomy,
                    }
                    let response;
                    let HTML = await this.axios.getPostData(obj);
                    let editInsert = document.querySelector('.tagEdit');
                    editInsert.innerHTML = HTML;
                    editInsert.style.display = 'flex';
                    let close = document.querySelector('.close');
                    close.addEventListener('click', function () {
                        return editInsert.style.display = 'none';
                    })
                    const name = document.getElementById("tag_name");
                    const slug = document.getElementById("tag_slug");
                    const description = document.getElementById("tag_description");
                    const updateBtn = document.getElementById("tagUpdate");
                    updateBtn.addEventListener("click", async () => {
                        const api = "tag_update";
                        let obj = {
                            api: api,
                            updateId: updateBtn.value,
                            tag_name: name.value,
                            tag_slug: slug.value,
                            tag_description: description.value
                        }
                        let response = await this.axios.getResponseData(obj);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        description.value = "";
                        slug.value = "";
                        name.value = "";
                        close.removeEventListener('click', function () {
                            return editInsert.style.display = 'none';
                        })
                        editInsert.style.display = 'none';

                        if (response) {
                            return this.init();
                        } else {
                            throw console.error("Api do not return response !!!");
                        }
                    });
                });
        }
    }
}
export default Tag;