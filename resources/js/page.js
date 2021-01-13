"use strict";
import Api from './api';
import Pagination from './pagination';
class Pag {
    constructor(target) {
        const api = "page_create";
        this.api = api;
        this.target = target;
        this.pages = 5;
        this.page = new Pagination(api);
        this.axios = new Api;
        this.changes;
        this.init();
    }
    async init(hash = null, HTML = null) {
        console.log(hash);
        const DOM = document.getElementById(this.target);
        const inner = document.querySelector(".innerpage");
        if (DOM) {
            if (HTML == null) {
                location.hash = 1;
                let obj = {
                    api: this.api,
                    hash: 1
                }
                HTML = await this.axios.getPostData(obj);
                inner.innerHTML = HTML;
            } else {
                inner.innerHTML = HTML;
            }
            this.page.paging();
            HTML = "";

            let addColor = document.querySelector('.nr-' + location.hash.slice(1, 2));
            if(addColor){
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
            console.log(option)
            console.log(option.value)
            var selected = () => {
                this.pages = option.value;
                location.hash = 1;
                window.removeEventListener('hashchange', changes);
                changes();
                option.removeEventListener('change', selected);
            }
            option.addEventListener('change', selected);
            console.log(option.value)
            this.delete();
            this.pageStore();
            this.pageEdit(inner);
        }
    }
    pageStore() {
        const title = document.getElementById("page_title");
        let post = document.getElementById('post');
        let select = post.options[post.selectedIndex];
        let stateArray = []
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (let i = 0; i < checkboxes.length; i++) {
          stateArray.push(checkboxes[i].value)
        }
        const api = "page_store";
        const submit = document.getElementById("create");
        submit.addEventListener("click", () => {
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
            slug.value = "";
            description.value = ""
            return setTimeout(() => { this.init() }, (300));
        });
    }
    delete() {
        const api = "page_destroy";
        const deleteBtn = document.querySelectorAll(".page-delete");
        if (deleteBtn) {
            for (let i = 0; i < deleteBtn.length; i++) {
                let ID = deleteBtn[i].value;
                deleteBtn[i].addEventListener(
                    "click",
                    () => {
                        let obj = {
                            api: api,
                            deleteID: ID,
                        }
                        this.axios.formDataApi(obj);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        return setTimeout(() => { this.init() }, (300))
                    });
            }
        }
    }
    pageEdit(inner) {
        const editBtn = document.querySelectorAll(".page-edit");
        for (let i = 0; i < editBtn.length; i++) {
            let ID = editBtn[i].value;
            editBtn[i].addEventListener(
                "click",
                async () => {
                    const api = "page_edit";
                    let obj = {
                        api: api,
                        editID: ID,
                    }
                    let HTML = await this.axios.getPostData(obj);
                    inner.innerHTML = HTML;
                    const title = document.getElementById("page_title");
                    const post = document.getElementById('post');
                    const select = post.options[post.selectedIndex];
                    let stateArray = []
                    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                    for (let i = 0; i < checkboxes.length; i++) {
                      stateArray.push(checkboxes[i].value)
                    }
    
                    const name = document.getElementById("page_name");
                    const updateBtn = document.getElementById("pageUpdate");

                    updateBtn.addEventListener("click", async () => {
                        const api = "page_update";
                        let obj = {
                            api: api,
                            updateId: updateBtn.value,
                            page_title: title.value,
                            page_name: name.value,
                            post_type: select.value,
                            page_state: stateArray
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
export default Pag;