"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;
const pageStrt = document.getElementById("pageStart");
console.log(pageStrt);

function startPage() {
  if (pageStrt) {
    window.addEventListener("load", init, false);
  }
}

function init() {
  axios
    .post(uri + path + "page_create", {})
    .then(function(response) {
      const test = document.querySelector(".innerpage");
      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;

        // const submit = document.getElementById("create");
        // submit.addEventListener("click", () => {
        //   const name = document.getElementById("tag-name").value;
        //   const slug = document.getElementById("tag-slug").value;
        //   const description = document.getElementById("tag-description").value;
        //   tagStore(name, slug, description);
        // });

        // const editBtn = tagStrt.querySelectorAll(".tag-edit");

        // for (let i = 0; i < editBtn.length; i++) {
        //   let ID = editBtn[i].value;
        //   let taxonomy = editBtn[i].id;
        //   editBtn[i].addEventListener(
        //     "click",
        //     function() {
        //       tagEdit(ID, taxonomy);
        //     },
        //     false
        //   );
        // }

        // const deleteBtn = document.querySelectorAll(".tag-delete");
        // for (let i = 0; i < deleteBtn.length; i++) {
        //   let ID = deleteBtn[i].value;
        //   let taxonomy = deleteBtn[i].id;
         
        //   deleteBtn[i].addEventListener(
        //     "click",
        //     function() {
        //       tagDelete(ID, taxonomy);
        //       console.log(ID);
        //       console.log(taxonomy);
        //     },
        //     false
        //   );
        // }
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
  1;
}

// function tagStore(name, slug, description) {
//   axios
//     .post(uri + path + "tag_store", {
//       tag_name: name,
//       tag_slug: slug,
//       tag_description: description
//     })
//     .then(function(response) {
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
//     .then(function(response) {
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
//     .then(function(response) {
//       if (response.status == 200 && response.statusText == "OK") {
//         console.log(response);
//         init();
//         // setTimeout(call.init(), 500);
//         console.log(11111);
//       }
//     })

//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }

// function tagDelete(ID, taxonomy) {
//   console.log(ID)
//   axios
//     .post(uri + path + "tag_destroy", {
//       deleteID: ID,
//       taxonomy_type: taxonomy,
//     })
//     .then(function(response) {
//       if (response.status == 200 && response.statusText == "OK") {
//         console.log(response);
//         init();
//         // setTimeout(init(), 500);
//         // console.log(11111);
//       }
//     })
//     .catch((err) => {
//       console.log(err instanceof TypeError);
//     });
// }

export default startPage();
