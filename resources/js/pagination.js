import Api from './api';

class Pagination {

    constructor(api) {
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
        this.lenght;
        this.api = api;
        this.axios = new Api();
        this.hash;
    }

    paging() {

        const page = document.querySelectorAll(".paging");

        let hash = window.location.hash.replace(/^#!?/, '').slice(0, 1);

        if (page.length) {

            var nextPage

            for (let i = 0; i < page.length; i++) {
                nextPage = () => {
                    let id = page[i].id;
                    location.hash = '#' + id;
                    page[i].removeEventListener("click", nextPage);
                }
                page[i].addEventListener('click', nextPage);
            }
        }
        this.lenght = page.length - 4;
    }

    async select(hash = 1, pages) {
        if (this.lenght < hash) {
            hash = 1;
        } else {
            let obj = {
                api: this.api,
                pageSelected: pages,
                hash: hash
            }
            console.log(obj.page);
            console.log(obj.pageSelected);
            return await this.axios.getPostData(obj);
        }

    }
}

export default Pagination;