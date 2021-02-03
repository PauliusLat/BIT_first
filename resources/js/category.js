"use strict";
import Pagination from './pagination';
import Profile_image from './profile_image';


class Category extends Pagination {

    constructor(target) {
        super();
        this.api = "category_create";
        this.pages = 5;
        this.target = target;
        this.watch = document.querySelector(".catCreateList");
        this.changes;
        this.readImage = new Profile_image();
        this.init();
    }
    init() {
        const DOM = document.getElementById(this.target);
        if (DOM) {
            let hash = location.hash.split('#')[1];
            if ( hash) {
                this.hashChange(hash);
            }else{
                this.hashChange();
            }      
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
        let response;

        submit.addEventListener("click", async () => {

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
                cat_parent: select.value,
            }
            if (obj) {
                response = await this.readImage.sendImageData(obj);
              }

            let changes = this.changes;
            window.removeEventListener('hashchange', changes);
            name.value = "";
            slug.value = ""
            description.value = ""

            window.removeEventListener('hashchange', changes);
            if (response) {
                return this.init();
            }else{
                throw console.error("Api do not return response !!!");
            }
        });
    }

    delete() {
        const api = "category_destroy";
        const deleteBtn = document.querySelectorAll(".category-delete");
        let response;

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

                        response = await this.axios.getResponseData(obj);
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);

                        if (response) {
                            return this.init();
                        }else{
                            throw console.error("Api do not return response !!!");
                        }
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
                    let editInsert = document.querySelector('.catEdit');
                    editInsert.innerHTML = HTML;
                    editInsert.style.display = 'flex';
                    let close = document.querySelector('.close');
                    close.addEventListener('click', function () {
                        return editInsert.style.display = 'none';
                    })
                    this.readImage.image();
                    const name = document.getElementById("category_name");
                    const slug = document.getElementById("category_slug");
                    const description = document.getElementById("category_description");
                    let parent = document.getElementById('catEdit');
                    let select;
                    const updateBtn = document.getElementById("catUpdate");
                    updateBtn.addEventListener("click", async () => {
                        let api = "category_update";
                        let response;
                        if (parent.options[parent.selectedIndex] != undefined) {
                            select = parent.options[parent.options.selectedIndex].value;
                        } else {
                            select = 0;
                        }
                        let obj = {
                            api: api,
                            updateId: updateBtn.value,
                            cat_parent: select,
                            cat_name: name.value,
                            cat_slug: slug.value,
                            cat_description: description.value
                        }
                        if (obj) {

                            response = await this.readImage.sendImageData(obj);
                            console.log(response);
                        }
                        let changes = this.changes;
                        window.removeEventListener('hashchange', changes);
                        close.removeEventListener('click', function () {
                            return editInsert.style.display = 'none';
                        })
                        editInsert.style.display = 'none';
                        description.value = "";
                        slug.value = "";
                        name.value = "";
                        if (response) {
                            return this.init();
                        }else{
                            throw console.error("Api do not return response !!!");
                        }
                    });
                });
        }
    }
}
export default Category;