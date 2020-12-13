"use strict";

import Api from './api';
import Pagination from './pagination';

class Tag {

    constructor(target) {

        const api = "tag_create";
        this.api = api;
        this.start = true;
        this.target = target;
        this.pages = 5;
        this.page = new Pagination(api);
        this.axios = new Api;
        this.init();

    }

    async init(hash = null, HTML = null) {

        const DOM = document.getElementById(this.target);
        const test = document.querySelector(".test");

        if (DOM) {

            if (this.start) {
                if (HTML == null) {
                    location.hash = 1;
                    let obj = {
                        api: this.api,
                        hash: 1
                    }
                    HTML = await this.axios.getPostData(obj);
                    test.innerHTML = HTML;
                } else {
                    test.innerHTML = HTML;
                    console.log('naujas html 11111111111');
                }
            }

            this.start = false;

            let chechHash = this.page.paging();

            HTML = "";

            let addColor = document.querySelector('.nr-' + location.hash.slice(1, 2));
            addColor.classList.add("active");

            var chages = async () => {
                console.log('hash stebejimas 2222222222222');
                hash = location.hash.slice(1, 2);

                if (hash != undefined &&
                    hash != null &&
                    hash > 0 &&
                    hash != "" &&
                    hash != NaN) {
                    let pages = this.pages;
                    HTML = await this.page.select(hash, pages);
                    this.start = true;
                    this.init(hash, HTML);
                    window.removeEventListener('hashchange', chages);
                }
            }
            window.addEventListener('hashchange', chages); //prikabina kruva addEventListener

            const option = document.getElementById("items");
            option.value = this.pages;

            var selected = () => {
                this.pages = option.value;
                location.hash = 1;
                chages();
                option.removeEventListener('change', selected);
            }
            option.addEventListener('change', selected);
        }

        this.delete();
        this.create();
        this.tagEdit(test);
    }

    create() {

        const name = document.getElementById("tag-name")
        const slug = document.getElementById("tag-slug");
        const description = document.getElementById("tag-description");
        const submit = document.getElementById("create");
        const api = "tag_store";


        submit.addEventListener("click", () => {
            let obj = {
                api: "tag_store",
                tag_name: name.value,
                tag_slug: slug.value,
                tag_description: description.value
            }
            this.axios.formDataApi(obj);
            this.start = true;

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
                        this.start = true;

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
                        this.start = true;

                        description.value = "";
                        slug.value = "";
                        name.value = "";

                        return setTimeout(() => { this.init() }, (300))
                    });
                });
        }
    }

    // this.init();


    // let hash1 = hash;

    // if (hash1 === null) {
    //     hash1 = location.hash.slice(1, 2);
    //     console.log(hash1);
    // }

    // const api = "tag_create";
    // 

    // let response = await this.axios.getPostData(api, hash1);
    // test.innerHTML = response;
    // const submit = document.getElementById("create");
    // submit.addEventListener("click", () => {
    //     const name = document.getElementById("tag-name").value;
    //     const slug = document.getElementById("tag-slug").value;
    //     const description = document.getElementById("tag-description").value;
    //     tagStore(name, slug, description);
    // });
    // this.paging();


    // init1(pageNo = 1) {

    //     if (typeof pageNo == 'object' && this.hash.length !== 0) {
    //         console.log(pageNo);
    //         this.hasharr = this.hash.split('#')
    //         this.hasarr2 = this.hasharr[1].split('%')
    //         this.hash = hasarr2[0]
    //         // window.addEventListener( "load",
    //         // () =>{
    //         // this.hasharr = this.hash.split('#')
    //         // this.hasarr2 = this.hasharr[1].split('%')
    //         // this.hash = this.hasarr2[0]
    //         // this.hash = location.hash
    //         // this.init();

    //     } else if (typeof pageNo === 'string' && this.hash.length !== 0) {
    //         this.hasharr = this.hash.split('#')
    //         this.hasarr2 = this.hasharr[1].split('%')
    //         this.hash = this.hasarr2[0]
    //     } else {
    //         this.hash = null
    //     }

    //     axios
    //         .post(this.uri + this.path + "tag_create", {
    //             pages: parseInt(pageNo),
    //             pageSelected: this.pageSelected,
    //             hash: this.hash
    //         })

    //         .then((response) => {
    //             const test = document.querySelector(".test");
    //             if (response.status == 200 && response.statusText == "OK") {
    //                 const HTML = response.data.html;
    //                 test.innerHTML = HTML;

    //                 if (pageNo > 0 && typeof pageNo === 'string') {
    //                     let addColor = document.querySelector('.nr-' + pageNo);
    //                     addColor.classList.add("active");
    //                 }


    //                 const submit = document.getElementById("create");
    //                 submit.addEventListener("click", () => {
    //                     const name = document.getElementById("tag-name").value;
    //                     const slug = document.getElementById("tag-slug").value;
    //                     const description = document.getElementById("tag-description").value;
    //                     this.tagStore(name, slug, description);
    //                 });

    //                 const editBtn = document.querySelectorAll(".tag-edit");

    //                 for (let i = 0; i < editBtn.length; i++) {
    //                     let ID = editBtn[i].value;
    //                     let taxonomy = editBtn[i].id;
    //                     editBtn[i].addEventListener(
    //                         "click",
    //                         () => {
    //                             this.tagEdit(ID, taxonomy);
    //                         },
    //                         false
    //                     );
    //                 }


    //                 const deleteBtn = document.querySelectorAll(".tag-delete");
    //                 for (let i = 0; i < deleteBtn.length; i++) {
    //                     let ID = deleteBtn[i].value;
    //                     let taxonomy = deleteBtn[i].id;
    //                     deleteBtn[i].addEventListener(
    //                         "click",
    //                         () => {
    //                             this.tagDelete(ID, taxonomy);
    //                         },
    //                         false
    //                     );
    //                 }

    //                 const pageBtn = document.getElementById("selectpage");
    //                 const select = document.getElementById("items");

    //                 pageBtn.addEventListener(
    //                     "click",
    //                     () => {
    //                         var pageSelected;

    //                         if (select.options[select.selectedIndex] != undefined) {
    //                             pageSelected = select.options[select.selectedIndex].value;

    //                         } else {
    //                             pageSelected = 0;
    //                         }
    //                         this.pageSelected = pageSelected
    //                         this.init(1);
    //                     });


    //                 const page = document.querySelectorAll(".paging");

    //                 for (let i = 0; i < page.length; i++) {
    //                     let pageNo = page[i].id;
    //                     page[i].addEventListener(
    //                         "click",
    //                         () => {
    //                             console.log(pageNo);
    //                             location.hash = '#' + pageNo
    //                             this.hash = location.hash
    //                             this.init(pageNo);
    //                         },
    //                         false
    //                     );
    //                 }

    //             }
    //         })
    //         .catch(function (error) {
    //             if (error.response) {
    //                 console.log(error.response.data);
    //                 console.log(error.response.status);
    //                 console.log(error.response.headers);
    //             } else if (error.request) {
    //                 console.log(error.request);
    //             } else {
    //                 console.log("Error", error.message);
    //             }
    //             console.log(error);
    //         });
    // }


    // tagStore(name, slug, description) {
    //     axios
    //         .post(this.uri + this.path + "tag_store", {
    //             tag_name: name,
    //             tag_slug: slug,
    //             tag_description: description
    //         })
    //         .then((response) => {
    //             console.log(response);
    //             this.init();
    //         })
    //         .catch((err) => {
    //             console.log(err instanceof TypeError);
    //         });
    //     document.getElementById("tag-name").value = "";
    // }

    // tagEdit(editID, taxonomy) {
    //     axios
    //         .post(this.uri + this.path + "tag_edit", {
    //             editID: editID,
    //             taxonomy_type: taxonomy,
    //         })
    //         .then((response) => {
    //             const test = document.querySelector(".test");
    //             if (response.status == 200 && response.statusText == "OK") {
    //                 const HTML = response.data.html;
    //                 test.innerHTML = HTML;
    //             }
    //             const updateBtn = document.getElementById("tagUpdate");
    //             updateBtn.addEventListener("click", () => {
    //                 const updateId = updateBtn.value;
    //                 this.tagUpdate(updateId);
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err instanceof TypeError);
    //         });
    // }

    // tagUpdate(updateId) {
    //     const name = document.getElementById("tag_name").value;
    //     const slug = document.getElementById("tag_slug").value;
    //     const description = document.getElementById("tag_description").value;

    //     axios
    //         .post(this.uri + this.path + "tag_update", {
    //             updateId: updateId,
    //             tag_name: name,
    //             tag_slug: slug,
    //             tag_description: description

    //         })
    //         .then((response) => {
    //             if (response.status == 200 && response.statusText == "OK") {
    //                 console.log(response);
    //                 this.init();
    //                 // setTimeout(call.init(), 500);
    //             }
    //         })

    //         .catch((err) => {
    //             console.log(err instanceof TypeError);
    //         });
    // }

    // tagDelete(ID, taxonomy) {
    //     axios
    //         .post(this.uri + this.path + "tag_destroy", {
    //             deleteID: ID,
    //             taxonomy_type: taxonomy,
    //         })
    //         .then((response) => {
    //             if (response.status == 200 && response.statusText == "OK") {
    //                 console.log(response);
    //                 this.init();
    //                 // setTimeout(init(), 500);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err instanceof TypeError);
    //         });

    // }
}

export default Tag;


// const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
// const uri = document.location.origin;
// const tagStrt = document.getElementById("tagStart");

// function startTag() {
//   if (tagStrt) {
//     window.addEventListener("load", init, false);
//   }
// }

// let pageSelected;
// let hash = location.hash
// let hasharr
// let hasarr2

// function init(pageNo){

// if (typeof pageNo == 'object' &&  hash.length !== 0){
//   hasharr = hash.split('#')
//   hasarr2 = hasharr[1].split('%')
//   hash = hasarr2[0]


// }else if(typeof pageNo === 'string' && hash.length !== 0){
//   hasharr = hash.split('#')
//   hasarr2 = hasharr[1].split('%')
//   hash = hasarr2[0]
// }else{
//   hash = null
// }

//   axios
//     .post(uri + path + "tag_create",{
//       pages: parseInt(pageNo),
//       pageSelected: pageSelected,
//       hash: hash
//     })

//     .then((response)=> {
//       const test = document.querySelector(".test");
//       if (response.status == 200 && response.statusText == "OK") {
//         const HTML = response.data.html;
//         test.innerHTML = HTML;

//         if(pageNo >0 && typeof pageNo === 'string' ){
//           let addColor = document.querySelector('.nr-'+pageNo);
//           addColor.classList.add("active");
//         }


//         const submit = document.getElementById("create");
//         submit.addEventListener("click", () => {
//           const name = document.getElementById("tag-name").value;
//           const slug = document.getElementById("tag-slug").value;
//           const description = document.getElementById("tag-description").value;
//           tagStore(name, slug, description);
//         });

//         const editBtn = tagStrt.querySelectorAll(".tag-edit");

//         for (let i = 0; i < editBtn.length; i++) {
//           let ID = editBtn[i].value;
//           let taxonomy = editBtn[i].id;
//           editBtn[i].addEventListener(
//             "click",
//             () =>{
//               tagEdit(ID, taxonomy);
//             },
//             false
//           );
//         }


//         const deleteBtn = document.querySelectorAll(".tag-delete");
//         for (let i = 0; i < deleteBtn.length; i++) {
//           let ID = deleteBtn[i].value;
//           let taxonomy = deleteBtn[i].id;
//           deleteBtn[i].addEventListener(
//             "click",
//             ()=> {
//               tagDelete(ID, taxonomy);
//             },
//             false
//           );
//         }

//         const pageBtn = document.getElementById("selectpage");
//         const select = document.getElementById("items");
//         if (pageSelected != undefined) {
//           select.value = pageSelected
//         }
//         pageBtn.addEventListener(
//           "click",
//           ()=> {
//             pageSelected = select.options[select.selectedIndex].value;
//             select.value = pageSelected
//             init(1);
//           },

//           false
//         );


//         const page = document.querySelectorAll(".paging");
//         for (let i = 0; i < page.length; i++){
//           let pageNo = page[i].id;
//           page[i].addEventListener(
//             "click",
//             ()=> {
//               location.hash = '#' + pageNo
//               hash = location.hash
//               init(pageNo);
//             },
//             false
//           );
//         }

//       }
//     })
//     .catch(function(error) {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log("Error", error.message);
//       }
//       console.log(error);
//     });
//   ;
// }


// function tagStore(name, slug, description) {
//   axios
//     .post(uri + path + "tag_store", {
//       tag_name: name,
//       tag_slug: slug,
//       tag_description: description
//     })
//     .then((response) => {
//       console.log(response);
//       init();
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
//   document.getElementById("tag-name").value = "";
// }

// function tagEdit(editID, taxonomy) {
//   axios
//     .post(uri + path + "tag_edit", {
//       editID: editID,
//       taxonomy_type: taxonomy,
//     })
//     .then((response)=> {
//       const test = document.querySelector(".test");
//       if (response.status == 200 && response.statusText == "OK") {
//         const HTML = response.data.html;
//         test.innerHTML = HTML;
//       }
//       const updateBtn = document.getElementById("tagUpdate");
//       updateBtn.addEventListener("click", () => {
//         const updateId = updateBtn.value;
//         tagUpdate(updateId);
//       });
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }

// function tagUpdate(updateId) {
//   const name = document.getElementById("tag_name").value;
//   const slug = document.getElementById("tag_slug").value;
//   const description = document.getElementById("tag_description").value;

//   axios
//     .post(uri + path + "tag_update", {
//       updateId: updateId,
//       tag_name: name,
//       tag_slug: slug,
//       tag_description: description

//     })
//     .then((response)=> {
//       if (response.status == 200 && response.statusText == "OK") {
//         console.log(response);
//         init();
//         // setTimeout(call.init(), 500);
//       }
//     })

//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }

// function tagDelete(ID, taxonomy) {
//   axios
//     .post(uri + path + "tag_destroy", {
//       deleteID: ID,
//       taxonomy_type: taxonomy,
//     })
//     .then((response)=> {
//       if (response.status == 200 && response.statusText == "OK") {
//         console.log(response);
//         init();
//         // setTimeout(init(), 500);
//       }
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }


// export default startTag();