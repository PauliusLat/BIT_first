import Api from './api';

class Pagination {

    constructor(api) {
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
        this.pageSelected;
        this.api = api;
    }

    async init(hash = null) {

        let hash1 = hash;

        if (hash1 === null) {
            hash1 = location.hash.slice(1, 2);
        }

        const test = document.querySelector(".test");

        let axios = new Api();

        let api = this.api;

        return await axios.getPostData(api, hash1);

    }

    paging() {
        const page = document.querySelectorAll(".paging");

        for (let i = 0; i < page.length; i++) {
            let id = page[i].id;
            if (i >= 2 && i < page.length - 2) {
                page[i].addEventListener("click", () => {
                    location.hash = '#' + id;
                })
            // }else if(i == 0){
            //     console.log(i);
            //     location.hash = '#' + 1;
            // }else if( page.length-1){
            //     location.hash = '#' +  page.length-1;
            }

        }
    }
}

export default Pagination;