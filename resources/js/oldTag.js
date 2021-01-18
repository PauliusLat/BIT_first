"use strict";

// class Tag {

//     constructor(target) {
//         this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
//         this.uri = document.location.origin;
//         this.pageSelected;
//         this.hash = location.hash;
//         this.hasharr;
//         this.hasarr2;
//         this.target = target;
//         this.startTag();
//     }

//     startTag() {
//         const DOM = document.getElementById(this.target);
//         if (DOM) {
//             this.init();
//         }
//     }

//     init(pageNo = 1) {

//         if (typeof pageNo == 'object' && this.hash.length !== 0) {
//             console.log(pageNo);
//             this.hasharr = this.hash.split('#')
//             this.hasarr2 = this.hasharr[1].split('%')
//             this.hash = hasarr2[0]

//         } else if (typeof pageNo === 'string' && this.hash.length !== 0) {
//             this.hasharr = this.hash.split('#')
//             this.hasarr2 = this.hasharr[1].split('%')
//             this.hash = this.hasarr2[0]
//         } else {
//             this.hash = null
//         }

//         axios
//             .post(this.uri + this.path + "tag_create", {
//                 pages: parseInt(pageNo),
//                 pageSelected: this.pageSelected,
//                 hash: this.hash
//             })

//             .then((response) => {
//                 const test = document.querySelector(".test");
//                 if (response.status == 200 && response.statusText == "OK") {
//                     const HTML = response.data.html;
//                     test.innerHTML = HTML;
//                     if (pageNo > 0 && typeof pageNo === 'string') {
//                         let addColor = document.querySelector('.nr-' + pageNo);
//                         addColor.classList.add("active");
//                     }

//                     const submit = document.getElementById("create");
//                     submit.addEventListener("click", () => {
//                         const name = document.getElementById("tag-name").value;
//                         const slug = document.getElementById("tag-slug").value;
//                         const description = document.getElementById("tag-description").value;
//                         this.tagStore(name, slug, description);
//                     });

//                     const editBtn = document.querySelectorAll(".tag-edit");

//                     for (let i = 0; i < editBtn.length; i++) {
//                         let ID = editBtn[i].value;
//                         let taxonomy = editBtn[i].id;
//                         editBtn[i].addEventListener(
//                             "click",
//                             () => {
//                                 this.tagEdit(ID, taxonomy);
//                             },
//                             false
//                         );
//                     }

//                     const deleteBtn = document.querySelectorAll(".tag-delete");
//                     for (let i = 0; i < deleteBtn.length; i++) {
//                         let ID = deleteBtn[i].value;
//                         let taxonomy = deleteBtn[i].id;
//                         deleteBtn[i].addEventListener(
//                             "click",
//                             () => {
//                                 this.tagDelete(ID, taxonomy);
//                             },
//                             false
//                         );
//                     }

//                     const pageBtn = document.getElementById("selectpage");
//                     const select = document.getElementById("items");

//                     pageBtn.addEventListener(
//                         "click",
//                         () => {
//                             var pageSelected;

//                             if (select.options[select.selectedIndex] != undefined) {
//                                 pageSelected = select.options[select.selectedIndex].value;
                           
//                             }else {
//                                 pageSelected = 0;
//                               }
//                             this.pageSelected = pageSelected
//                             this.init(1);
//                         });

//                     const page = document.querySelectorAll(".paging");
//                     for (let i = 0; i < page.length; i++) {
//                         let pageNo = page[i].id;
//                         page[i].addEventListener(
//                             "click",
//                             () => {
//                                 // console.log(pageNo);
//                                 location.hash = '#' + pageNo
//                                 this.hash = location.hash
//                                 this.init(pageNo);
//                             },
//                             false
//                         );
//                     }

//                 }
//             })
//             .catch(function (error) {
//                 if (error.response) {
//                     console.log(error.response.data);
//                     console.log(error.response.status);
//                     console.log(error.response.headers);
//                 } else if (error.request) {
//                     console.log(error.request);
//                 } else {
//                     console.log("Error", error.message);
//                 }
//                 console.log(error);
//             });
//     }


//     tagStore(name, slug, description) {
//         axios
//             .post(this.uri + this.path + "tag_store", {
//                 tag_name: name,
//                 tag_slug: slug,
//                 tag_description: description
//             })
//             .then((response) => {
//                 console.log(response);
//                 this.init();
//             })
//             .catch((err) => {
//                 console.log(err instanceof TypeError);
//             });
//         document.getElementById("tag-name").value = "";
//     }

//     tagEdit(editID, taxonomy) {
//         axios
//             .post(this.uri + this.path + "tag_edit", {
//                 editID: editID,
//                 taxonomy_type: taxonomy,
//             })
//             .then((response) => {
//                 const test = document.querySelector(".test");
//                 if (response.status == 200 && response.statusText == "OK") {
//                     const HTML = response.data.html;
//                     test.innerHTML = HTML;
//                 }
//                 const updateBtn = document.getElementById("tagUpdate");
//                 updateBtn.addEventListener("click", () => {
//                     const updateId = updateBtn.value;
//                     this.tagUpdate(updateId);
//                 });
//             })
//             .catch((err) => {
//                 console.log(err instanceof TypeError);
//             });
//     }

//     tagUpdate(updateId) {
//         const name = document.getElementById("tag_name").value;
//         const slug = document.getElementById("tag_slug").value;
//         const description = document.getElementById("tag_description").value;

//         axios
//             .post(this.uri + this.path + "tag_update", {
//                 updateId: updateId,
//                 tag_name: name,
//                 tag_slug: slug,
//                 tag_description: description

//             })
//             .then((response) => {
//                 if (response.status == 200 && response.statusText == "OK") {
//                     console.log(response);
//                     this.init();
//                 }
//             })

//             .catch((err) => {
//                 console.log(err instanceof TypeError);
//             });
//     }

//     tagDelete(ID, taxonomy) {
//         axios
//             .post(this.uri + this.path + "tag_destroy", {
//                 deleteID: ID,
//                 taxonomy_type: taxonomy,
//             })
//             .then((response) => {
//                 if (response.status == 200 && response.statusText == "OK") {
//                     console.log(response);
//                     this.init();
//                 }
//             })
//             .catch((err) => {
//                 console.log(err instanceof TypeError);
//             });

//     }
// }

// export default Tag;