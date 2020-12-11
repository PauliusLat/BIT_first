import Api from './api';

class Pagination {

    constructor(api) {
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
        this.pageSelected;
        this.api = api;
        this.axios = new Api();
        this.hash;  
    }

    async init(hash = null) {

        this.hash = hash;

        if (this.hash === null) {
            this.hash = location.hash.slice(1, 2);
        }

        const test = document.querySelector(".test");

        let axios = new Api();

        let obj = {
            api: this.api,
            hash: this.hash
        }
        return await  this.axios.getPostData(obj);

    }

    paging() {

        const page = document.querySelectorAll(".paging");

        if (page.length) {

            for (let i = 0; i < page.length; i++) {

                let id = page[i].id;

                page[i].addEventListener('click', () => {
                    location.hash = '#' + id;
                });
            }
        }
    }

    async select(hash=1,  pages=5) {

        const select = document.getElementById("items");

        let obj = {
            api: this.api,
            pageSelected: pages,
            hash:hash
        }
console.log(obj);
        return await  this.axios.getPostData(obj);

    }
}


export default Pagination;