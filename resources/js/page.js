"use strict";
import Pagination from './pagination';
class Pag extends Pagination{
    constructor(target) {
        super();

        const api = "page_create";
        this.api = api;
        this.target = target;
        this.pages = 5;
        this.changes;
        this.watch = document.querySelector(".innerpage");
        this.init();
    }
    async init(hash = null, HTML = null) {
        const DOM = document.getElementById(this.target);
        if (DOM) {
            if (HTML == null) {
                location.hash = 1;
                let obj = {
                    api: this.api,
                    hash: 1
                }
                HTML = await this.axios.getPostData(obj);
                this.watch.innerHTML = HTML;
            } else {
                this.watch.innerHTML = HTML;
            }
            this.paging();
            HTML = "";

            let addColor = document.querySelector('.nr-' + location.hash.slice(1, 2));
            if(addColor){
                addColor.classList.add("active");
            }         

            this.hashChange();
            this.paging();
        }
        
    }
    addAction(){
        this.delete();
        this.pageStore();
        this.pageEdit(this.watch);
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
    pageEdit(watch) {
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
                    watch.innerHTML = HTML;
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