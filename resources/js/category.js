"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;
const catStrt = document.getElementById("catStart");
function startCat() {
  if (catStrt) {
    window.addEventListener("load", init, false);
  }
}

function init() {
  axios
    .post(uri + path + "category_create", {})
    .then(function (response) {
      const test = document.querySelector(".innercat");


      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;

        const submit = document.getElementById("create");

        submit.addEventListener("click", () => {
          const name = document.getElementById("category-name").value;
          const slug = document.getElementById("category-slug").value;
          const description = document.getElementById("category-description").value;
          let parent = document.getElementById('cat');
          // console.log(parent.value)
          let select = parent.options[parent.selectedIndex].value;
          
          // console.log(select)
          catStore(name, select, slug, description);
        });

        const editBtn = catStrt.querySelectorAll(".category-edit");


        for (let i = 0; i < editBtn.length; i++) {
          let ID = editBtn[i].value;

          let taxonomy = editBtn[i].id;
          editBtn[i].addEventListener(
            "click",
            function () {
              catEdit(ID, taxonomy);

            },
            false
          );
        }

        const deleteBtn = document.querySelectorAll(".category-delete");
        for (let i = 0; i < deleteBtn.length; i++) {
          let ID = deleteBtn[i].value;
          let taxonomy = deleteBtn[i].id;

          deleteBtn[i].addEventListener(
            "click",
            function () {
              catDelete(ID, taxonomy);
            },
            false
          );
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
      } else if (error.request) {
      } else {
        console.log("Error", error.message);
      }
      console.log(error);
    });
  1;
}

function catStore(name, select, slug, description) {

  axios
    .post(uri + path + "category_store", {
      cat_name: name,
      cat_slug: slug,
      cat_description: description,
      cat_parent: select
    })
    .then(function (response) {
      console.log(response);
      init();
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
  document.getElementById("category-name").value = "";
}

function catEdit(editID, taxonomy) {

  axios
    .post(uri + path + "category_edit", {
      editID: editID,
      taxonomy_type: taxonomy,
    })
    .then(function (response) {
      const test = document.querySelector(".innercat");
      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;
      }
      const updateBtn = document.getElementById("catUpdate");
      updateBtn.addEventListener("click", () => {
        const updateId = updateBtn.value;
        catUpdate(updateId);
      });
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

function catUpdate(updateId) {
  const name = document.getElementById("category_name").value;
  const slug = document.getElementById("category_slug").value;
  const description = document.getElementById("category_description").value;

  axios
    .post(uri + path + "category_update", {
      updateId: updateId,
      cat_name: name,
      cat_slug: slug,
      cat_description: description

    })
    .then(function (response) {
      if (response.status == 200 && response.statusText == "OK") {
        // console.log(response);
        init();
        // setTimeout(call.init(), 500);
      }
    })

    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

function catDelete(ID, taxonomy) {
  // console.log(ID)
  axios
    .post(uri + path + "category_destroy", {
      deleteID: ID,
      taxonomy_type: taxonomy,
    })
    .then(function (response) {
      if (response.status == 200 && response.statusText == "OK") {
        console.log(response);
        init();
        // setTimeout(init(), 500);
        // console.log(11111);
      }
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

export default startCat();