"use strict";


// import Pagination from './pagination';

// class Tag {

//     constructor(target) {
//         // this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
//         // this.uri = document.location.origin;
//         // this.pageSelected;

//         const api = "tag_create";
//         this.start = true;
//         this.target = target;
//         this.pages;
//         this.page = new Pagination(api);
//         this.init();
//     }

//     async init(hash = null, HTML = null) {

//         const DOM = document.getElementById(this.target);
//         if (DOM) {


//             const test = document.querySelector(".test");

//             if (this.start && HTML == null) {
//                 HTML = await this.page.init();
//                 test.innerHTML = HTML;
//             } else {
//                 test.innerHTML = HTML;
//             }
//             this.start = false;
//             this.page.paging();

//             HTML = "";

//             if (hash != null) {
//                 let addColor = document.querySelector('.nr-' + hash);
//                 addColor.classList.add("active");
//             }

//             HTML = "";

//             var chages = async () => {
//                 hash = location.hash.slice(1, 2);
//                 if (hash != undefined &&
//                     hash != null &&
//                     hash > 0 &&
//                     hash != "" &&
//                     hash != NaN) {
//                     let pages = this.pages;
//                     if (pages) {
//                         hash = 1;
//                         HTML = await this.page.select(hash, pages);
//                     } else {
//                         HTML = await this.page.select(hash, pages);
//                     }
//                     this.init(hash, HTML);
//                     window.removeEventListener('hashchange', chages);

//                 }
//             }
//             window.addEventListener('hashchange', chages);

//             const option = document.getElementById("items");
//             option.addEventListener('change', () => {
//                 this.pages = option.value;
//                 chages();
//             });
//         }
//     }


//     edit() {
//         const editBtn = document.querySelectorAll(".tag-edit");

//         for (let i = 0; i < editBtn.length; i++) {
//             let ID = editBtn[i].value;
//             let taxonomy = editBtn[i].id;
//             editBtn[i].addEventListener(
//                 "click",
//                 () => {
//                     this.tagEdit(ID, taxonomy);
//                 });
//         }

//         const deleteBtn = document.querySelectorAll(".tag-delete");
//         for (let i = 0; i < deleteBtn.length; i++) {
//             let ID = deleteBtn[i].value;
//             let taxonomy = deleteBtn[i].id;
//             deleteBtn[i].addEventListener(
//                 "click",
//                 () => {
//                     this.tagDelete(ID, taxonomy);
//                 });
//         }

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


//     // this.init();


//     // let hash1 = hash;

//     // if (hash1 === null) {
//     //     hash1 = location.hash.slice(1, 2);
//     //     console.log(hash1);
//     // }

//     // const api = "tag_create";
//     // 

//     // let response = await this.axios.getPostData(api, hash1);
//     // test.innerHTML = response;
//     // const submit = document.getElementById("create");
//     // submit.addEventListener("click", () => {
//     //     const name = document.getElementById("tag-name").value;
//     //     const slug = document.getElementById("tag-slug").value;
//     //     const description = document.getElementById("tag-description").value;
//     //     tagStore(name, slug, description);
//     // });
//     // this.paging();


//     // init1(pageNo = 1) {

//     //     if (typeof pageNo == 'object' && this.hash.length !== 0) {
//     //         console.log(pageNo);
//     //         this.hasharr = this.hash.split('#')
//     //         this.hasarr2 = this.hasharr[1].split('%')
//     //         this.hash = hasarr2[0]
//     //         // window.addEventListener( "load",
//     //         // () =>{
//     //         // this.hasharr = this.hash.split('#')
//     //         // this.hasarr2 = this.hasharr[1].split('%')
//     //         // this.hash = this.hasarr2[0]
//     //         // this.hash = location.hash
//     //         // this.init();

//     //     } else if (typeof pageNo === 'string' && this.hash.length !== 0) {
//     //         this.hasharr = this.hash.split('#')
//     //         this.hasarr2 = this.hasharr[1].split('%')
//     //         this.hash = this.hasarr2[0]
//     //     } else {
//     //         this.hash = null
//     //     }

//     //     axios
//     //         .post(this.uri + this.path + "tag_create", {
//     //             pages: parseInt(pageNo),
//     //             pageSelected: this.pageSelected,
//     //             hash: this.hash
//     //         })

//     //         .then((response) => {
//     //             const test = document.querySelector(".test");
//     //             if (response.status == 200 && response.statusText == "OK") {
//     //                 const HTML = response.data.html;
//     //                 test.innerHTML = HTML;

//     //                 if (pageNo > 0 && typeof pageNo === 'string') {
//     //                     let addColor = document.querySelector('.nr-' + pageNo);
//     //                     addColor.classList.add("active");
//     //                 }


//     //                 const submit = document.getElementById("create");
//     //                 submit.addEventListener("click", () => {
//     //                     const name = document.getElementById("tag-name").value;
//     //                     const slug = document.getElementById("tag-slug").value;
//     //                     const description = document.getElementById("tag-description").value;
//     //                     this.tagStore(name, slug, description);
//     //                 });

//     //                 const editBtn = document.querySelectorAll(".tag-edit");

//     //                 for (let i = 0; i < editBtn.length; i++) {
//     //                     let ID = editBtn[i].value;
//     //                     let taxonomy = editBtn[i].id;
//     //                     editBtn[i].addEventListener(
//     //                         "click",
//     //                         () => {
//     //                             this.tagEdit(ID, taxonomy);
//     //                         },
//     //                         false
//     //                     );
//     //                 }


//     //                 const deleteBtn = document.querySelectorAll(".tag-delete");
//     //                 for (let i = 0; i < deleteBtn.length; i++) {
//     //                     let ID = deleteBtn[i].value;
//     //                     let taxonomy = deleteBtn[i].id;
//     //                     deleteBtn[i].addEventListener(
//     //                         "click",
//     //                         () => {
//     //                             this.tagDelete(ID, taxonomy);
//     //                         },
//     //                         false
//     //                     );
//     //                 }

//     //                 const pageBtn = document.getElementById("selectpage");
//     //                 const select = document.getElementById("items");

//     //                 pageBtn.addEventListener(
//     //                     "click",
//     //                     () => {
//     //                         var pageSelected;

//     //                         if (select.options[select.selectedIndex] != undefined) {
//     //                             pageSelected = select.options[select.selectedIndex].value;

//     //                         } else {
//     //                             pageSelected = 0;
//     //                         }
//     //                         this.pageSelected = pageSelected
//     //                         this.init(1);
//     //                     });


//     //                 const page = document.querySelectorAll(".paging");

//     //                 for (let i = 0; i < page.length; i++) {
//     //                     let pageNo = page[i].id;
//     //                     page[i].addEventListener(
//     //                         "click",
//     //                         () => {
//     //                             console.log(pageNo);
//     //                             location.hash = '#' + pageNo
//     //                             this.hash = location.hash
//     //                             this.init(pageNo);
//     //                         },
//     //                         false
//     //                     );
//     //                 }

//     //             }
//     //         })
//     //         .catch(function (error) {
//     //             if (error.response) {
//     //                 console.log(error.response.data);
//     //                 console.log(error.response.status);
//     //                 console.log(error.response.headers);
//     //             } else if (error.request) {
//     //                 console.log(error.request);
//     //             } else {
//     //                 console.log("Error", error.message);
//     //             }
//     //             console.log(error);
//     //         });
//     // }


//     // tagStore(name, slug, description) {
//     //     axios
//     //         .post(this.uri + this.path + "tag_store", {
//     //             tag_name: name,
//     //             tag_slug: slug,
//     //             tag_description: description
//     //         })
//     //         .then((response) => {
//     //             console.log(response);
//     //             this.init();
//     //         })
//     //         .catch((err) => {
//     //             console.log(err instanceof TypeError);
//     //         });
//     //     document.getElementById("tag-name").value = "";
//     // }

//     // tagEdit(editID, taxonomy) {
//     //     axios
//     //         .post(this.uri + this.path + "tag_edit", {
//     //             editID: editID,
//     //             taxonomy_type: taxonomy,
//     //         })
//     //         .then((response) => {
//     //             const test = document.querySelector(".test");
//     //             if (response.status == 200 && response.statusText == "OK") {
//     //                 const HTML = response.data.html;
//     //                 test.innerHTML = HTML;
//     //             }
//     //             const updateBtn = document.getElementById("tagUpdate");
//     //             updateBtn.addEventListener("click", () => {
//     //                 const updateId = updateBtn.value;
//     //                 this.tagUpdate(updateId);
//     //             });
//     //         })
//     //         .catch((err) => {
//     //             console.log(err instanceof TypeError);
//     //         });
//     // }

//     // tagUpdate(updateId) {
//     //     const name = document.getElementById("tag_name").value;
//     //     const slug = document.getElementById("tag_slug").value;
//     //     const description = document.getElementById("tag_description").value;

//     //     axios
//     //         .post(this.uri + this.path + "tag_update", {
//     //             updateId: updateId,
//     //             tag_name: name,
//     //             tag_slug: slug,
//     //             tag_description: description

//     //         })
//     //         .then((response) => {
//     //             if (response.status == 200 && response.statusText == "OK") {
//     //                 console.log(response);
//     //                 this.init();
//     //                 // setTimeout(call.init(), 500);
//     //             }
//     //         })

//     //         .catch((err) => {
//     //             console.log(err instanceof TypeError);
//     //         });
//     // }

//     // tagDelete(ID, taxonomy) {
//     //     axios
//     //         .post(this.uri + this.path + "tag_destroy", {
//     //             deleteID: ID,
//     //             taxonomy_type: taxonomy,
//     //         })
//     //         .then((response) => {
//     //             if (response.status == 200 && response.statusText == "OK") {
//     //                 console.log(response);
//     //                 this.init();
//     //                 // setTimeout(init(), 500);
//     //             }
//     //         })
//     //         .catch((err) => {
//     //             console.log(err instanceof TypeError);
//     //         });

//     // }
// }

// export default Tag;


const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;
const tagStrt = document.getElementById("tagStart");

function startTag() {
  if (tagStrt) {
    window.addEventListener("load", init, false);
  }
}

let pageSelected;
let hash = location.hash
let hasharr
let hasarr2

function init(pageNo){

if (typeof pageNo == 'object' &&  hash.length !== 0){
  hasharr = hash.split('#')
  hasarr2 = hasharr[1].split('%')
  hash = hasarr2[0]


}else if(typeof pageNo === 'string' && hash.length !== 0){
  hasharr = hash.split('#')
  hasarr2 = hasharr[1].split('%')
  hash = hasarr2[0]
}else{
  hash = null
}

  axios
    .post(uri + path + "tag_create",{
      pages: parseInt(pageNo),
      pageSelected: pageSelected,
      hash: hash
    })

    .then((response)=> {
      const test = document.querySelector(".test");
      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;

        if(pageNo >0 && typeof pageNo === 'string' ){
          let addColor = document.querySelector('.nr-'+pageNo);
          addColor.classList.add("active");
        }


        const submit = document.getElementById("create");
        submit.addEventListener("click", () => {
          const name = document.getElementById("tag-name").value;
          const slug = document.getElementById("tag-slug").value;
          const description = document.getElementById("tag-description").value;
          tagStore(name, slug, description);
        });

        const editBtn = tagStrt.querySelectorAll(".tag-edit");

        for (let i = 0; i < editBtn.length; i++) {
          let ID = editBtn[i].value;
          let taxonomy = editBtn[i].id;
          editBtn[i].addEventListener(
            "click",
            () =>{
              tagEdit(ID, taxonomy);
            },
            false
          );
        }


        const deleteBtn = document.querySelectorAll(".tag-delete");
        for (let i = 0; i < deleteBtn.length; i++) {
          let ID = deleteBtn[i].value;
          let taxonomy = deleteBtn[i].id;
          deleteBtn[i].addEventListener(
            "click",
            ()=> {
              tagDelete(ID, taxonomy);
            },
            false
          );
        }

        const pageBtn = document.getElementById("selectpage");
        const select = document.getElementById("items");
        if (pageSelected != undefined) {
          select.value = pageSelected
        }
        pageBtn.addEventListener(
          "click",
          ()=> {
            pageSelected = select.options[select.selectedIndex].value;
            select.value = pageSelected
            init(1);
          },

          false
        );


        const page = document.querySelectorAll(".paging");
        for (let i = 0; i < page.length; i++){
          let pageNo = page[i].id;
          page[i].addEventListener(
            "click",
            ()=> {
              location.hash = '#' + pageNo
              hash = location.hash
              init(pageNo);
            },
            false
          );
        }

      }
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error);
    });
  ;
}


function tagStore(name, slug, description) {
  axios
    .post(uri + path + "tag_store", {
      tag_name: name,
      tag_slug: slug,
      tag_description: description
    })
    .then((response) => {
      console.log(response);
      init();
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
  document.getElementById("tag-name").value = "";
}

function tagEdit(editID, taxonomy) {
  axios
    .post(uri + path + "tag_edit", {
      editID: editID,
      taxonomy_type: taxonomy,
    })
    .then((response)=> {
      const test = document.querySelector(".test");
      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;
      }
      const updateBtn = document.getElementById("tagUpdate");
      updateBtn.addEventListener("click", () => {
        const updateId = updateBtn.value;
        tagUpdate(updateId);
      });
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

function tagUpdate(updateId) {
  const name = document.getElementById("tag_name").value;
  const slug = document.getElementById("tag_slug").value;
  const description = document.getElementById("tag_description").value;

  axios
    .post(uri + path + "tag_update", {
      updateId: updateId,
      tag_name: name,
      tag_slug: slug,
      tag_description: description

    })
    .then((response)=> {
      if (response.status == 200 && response.statusText == "OK") {
        console.log(response);
        init();
        // setTimeout(call.init(), 500);
      }
    })

    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

function tagDelete(ID, taxonomy) {
  axios
    .post(uri + path + "tag_destroy", {
      deleteID: ID,
      taxonomy_type: taxonomy,
    })
    .then((response)=> {
      if (response.status == 200 && response.statusText == "OK") {
        console.log(response);
        init();
        // setTimeout(init(), 500);
      }
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}


export default startTag();

