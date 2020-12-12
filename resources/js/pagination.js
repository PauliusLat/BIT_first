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

    async start(hash = null) {

        this.hash = hash;

        if (this.hash === null) {
            this.hash = location.hash.slice(1, 2);
        }

        let axios = new Api();

        let obj = {
            api: this.api,
            hash: this.hash
        }
        return await this.axios.getPostData(obj);

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
        return page.length - 4;
    }

    async select(hash = 1, pages) {
       
        let obj = {
            api: this.api,
            pageSelected: pages,
            hash: hash
        }
        return await this.axios.getPostData(obj);

    }
}

export default Pagination;