"use strict";
import Api from './api';
import Pagination from './pagination';

class Tag {
    constructor(target) {
        const api = "tag_create";
        this.api = api;
        this.target = target;
        this.pages = 5;
        this.page = new Pagination(api);
        this.axios = new Api;
        this.changes;
        this.init();

        // if (condition) {
        //     location.hash
        // }
       
    }

    async init(hash = null, HTML = null) {
        const DOM = document.getElementById(this.target);
        const test = document.querySelector(".test");

        hash = parseInt(hash)
       
        if (typeof hash != "string") {
            location.hash = hash
        }
        // if(HTML == null && location.hash)
        if (DOM) {
            if (HTML == null && hash == null) { //suveikia kai nera HTML todel neskaito liko, kol nera HTML nepasileidzia JS ir nevyksta stebejimas
                location.hash = 1;
                let obj = {
                    api: this.api,
                    hash: 1
                }
                HTML = await this.axios.getPostData(obj);
                test.innerHTML = HTML;
            } else {
                test.innerHTML = HTML;
            }
            this.page.paging();
            HTML = "";

            let addColor = document.querySelector('.nr-' + location.hash.slice(1, 2));
            if (addColor) {
                addColor.classList.add("active");
            }

            var changes = async () => {

                hash = location.hash.slice(1, 2);

                if (hash != undefined &&
                    hash != null &&
                    hash > 0 &&
                    hash != "" &&
                    hash != NaN &&
                    hash != Infinity) {
                    let pages = this.pages;
                    HTML = await this.page.select(hash, pages);
                    window.removeEventListener('hashchange', changes);
                    this.init(hash, HTML);
                }
            }
            window.addEventListener('hashchange', changes);
            this.changes = changes;
            const option = document.getElementById("items");
            option.value = this.pages;
            var selected = () => {
                this.pages = option.value;
                location.hash = 1;
                window.removeEventListener('hashchange', changes);
                changes();
                option.removeEventListener('change', selected);
            }
            option.addEventListener('change', selected);
            this.delete();
            this.createTag();
            this.tagEdit(test);
        }
    }

    createTag() {
        const name = document.getElementById("tag-name")
        const slug = document.getElementById("tag-slug");
        const description = document.getElementById("tag-description");
        const storeTag = document.getElementById("create");
        storeTag.addEventListener("click", () => {
            let obj = {
                api:  'tag_store',
                tag_name: name.value,
                tag_slug: slug.value,
                tag_description: description.value
            }
            this.axios.formDataApi(obj);
            let changes = this.changes;
            window.removeEventListener('hashchange', changes);
            name.value = ""
            slug.value = ""
            description.value = ""
            return setTimeout(() => { this.init() }, (300))
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
                    "click",
                    () => {
                        let obj = {
                            api: api,
                            deleteID: ID,
                            taxonomy_type: taxonomy
                        }
                        this.axios.formDataApi(obj);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        return setTimeout(() => { this.init() }, (300))
                    });
            }
        }
    }

    tagEdit(test) {
        const editBtn = document.querySelectorAll(".tag-edit");
        for (let i = 0; i < editBtn.length; i++) {
            let ID = editBtn[i].value;
            let taxonomy = editBtn[i].id;
            editBtn[i].addEventListener(
                "click",
                async () => {
                    const api = "tag_edit";
                    let obj = {
                        api: api,
                        editID: ID,
                        taxonomy_type: taxonomy,
                    }
                    let HTML = await this.axios.getPostData(obj);
                    test.innerHTML = HTML;
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
                        this.axios.formDataApi(obj);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        description.value = "";
                        slug.value = "";
                        name.value = "";
                        return setTimeout(() => { this.init() }, (300))
                    });
                });
        }
    }
}
export default Tag;