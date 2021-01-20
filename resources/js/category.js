"use strict";
import Pagination from './pagination';
import Profile_image from './profile_image';

class Category extends Pagination {
    constructor(target) {
        super();

        const api = "category_create";
        this.api = api;
        this.pages = 5;
        this.target = target;
        this.watch = document.querySelector(".innercat");
        this.changes;
        this.readImage = new Profile_image();
        this.init();
    }
    async init() {
        const DOM = document.getElementById(this.target);
        if (DOM) {
            this.hashChange();
            this.paging();
        }
    }

    addAction() {

        this.readImage.image();
        this.create();
        this.delete();
        this.edit();
    }

    create() {
        const name = document.getElementById("category-name");
        const slug = document.getElementById("category-slug");
        const description = document.getElementById("category-description");
        let selectedPage;
        if (document.querySelector('[name="catPage"]:checked')) {
            selectedPage = 1;
        } else {
            selectedPage = 0;
        }
        const submit = document.getElementById("create");
        const api = 'category_store';

        submit.addEventListener("click", () => {
            let parent = document.getElementById('cat');
            let select;
            if (parent.options[parent.selectedIndex] != undefined) {
                select = parent.options[parent.selectedIndex];
            } else {
                select = 0;
            }

            let obj = {
                api: api,
                title: name.value,
                slug: slug.value,
                page: selectedPage,
                content: description.value,
                cat_parent: description.value,
            }
            if (obj) {
                this.readImage.sendImageData(obj);
            }

            this.axios.formDataApi(obj);
            let changes = this.changes;
            window.removeEventListener('hashchange', changes);

            name.value = "";
            slug.value = ""
            description.value = ""

            return setTimeout(() => { this.init() }, (300))
        });
    }

    delete() {
        const api = "category_destroy";
        const deleteBtn = document.querySelectorAll(".category-delete");
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

    edit() {
        const editBtn = document.querySelectorAll(".category-edit");
        for (let i = 0; i < editBtn.length; i++) {
            let editID = editBtn[i].value;
            let taxonomy = editBtn[i].id;
            editBtn[i].addEventListener(
                "click",
                async () => {
                    const api = "category_edit";
                    let obj = {
                        api: api,
                        editID: editID,
                        taxonomy_type: taxonomy,
                    }
                    let HTML = await this.axios.getPostData(obj);
                    this.watch.innerHTML = HTML;
                    this.readImage.image();

                    const name = document.getElementById("category_name");
                    const slug = document.getElementById("category_slug");
                    const description = document.getElementById("category_description");
                    let parent = document.getElementById('cat');
                
                    let select;

                    if (parent.options[parent.selectedIndex] != undefined) {
                        select = parent.options[parent.options.selectedIndex].value;
                    } else {
                        select = 0;
                    }

                    const updateBtn = document.getElementById("catUpdate");
                    updateBtn.addEventListener("click", async () => {
                        let api = "category_update";
                        let obj = {
                            api: api,
                            updateId: updateBtn.value,
                            cat_parent: select,
                            cat_name: name.value,
                            cat_slug: slug.value,
                            cat_description: description.value
                        }
                        this.readImage.sendImageData(obj);
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
export default Category;