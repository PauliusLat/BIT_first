/** @format */

"use strict";
import Pagination from './pagination';
class Tag extends Pagination{
    constructor(target) {
        super();
    
        this.api = 'tag_create';
        this.pages = 5;
        this.target = target;
        this.changes;
        this.watch = document.querySelector(".startWatch");
        this.init();
    }
    async init() {
        const DOM = document.getElementById(this.target);
        if (DOM) {
        
            this.hashChange();
            this.paging();
        }
      };
      window.addEventListener("hashchange", changes);
      this.changes = changes;
      const option = document.getElementById("items");
      option.value = this.pages;
      var selected = () => {
        this.pages = option.value;
        location.hash = 1;
        window.removeEventListener("hashchange", changes);
        changes();
        option.removeEventListener("change", selected);
      };
      option.addEventListener("change", selected);
      this.delete();
      this.createTag();
      this.tagEdit(test);
    }
  }

    addAction(){
        this.create();
        this.delete();
        this.edit(this.wach);
    }


    create() {
        const name = document.getElementById("tag-name")
        const slug = document.getElementById("tag-slug");
        const description = document.getElementById("tag-description");
        const storeTag = document.getElementById("create");
        storeTag.addEventListener("click", () => {
            let obj = {
                api: 'tag_store',
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
    edit(test) {
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
}
export default Tag;
