"use strict";
import Profile_image from './profile_image';

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;
const catStrt = document.getElementById("catStart");
const readImage = new Profile_image();

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

        readImage.image();
        const submit = document.getElementById("create");

        submit.addEventListener("click", () => {
          const name = document.getElementById("category-name").value;
          const slug = document.getElementById("category-slug").value;
          const description = document.getElementById("category-description").value;
          let parent = document.getElementById('cat');
          let select;
          if (parent.options[parent.selectedIndex] != undefined) {
            select = parent.options[parent.selectedIndex].value;
          } else {
            select = 0;
          }

          let selectedPage;
          if (document.querySelector('[name="catPage"]:checked')) {
            selectedPage = 1;
          } else {
            selectedPage = 0;
          }

          catStore(name, select, slug, description, selectedPage);
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


function catStore(name, select, slug, description, selectedPage) {
  console.log(typeof selectedPage)

  let obj = {
    api: "category_store",
    title: name,
    slug: slug,
    page: selectedPage,
    content: description,
    cat_parent: select,

  }


  if (obj) {
    readImage.sendImageData(obj);
  }

  setTimeout(init, 500);
  document.getElementById("category-name").value = "";
}


function catEdit(editID, taxonomy) {

  console.log(name)
  axios
    .post(uri + path + "category_edit&id=" + editID, {
      editID: editID,
      taxonomy_type: taxonomy,
    })
    .then((response) => {
      const test = document.querySelector(".innercat");
      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;
        readImage.image();

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
  const api = "category_update";

  let obj = {
    api: api,
    updateId: updateId,
    cat_name: name,
    cat_slug: slug,
    cat_description: description
  }

  readImage.sendImageData(obj);

  setTimeout(init, 500); //klausti Arvido ka naudoti timesetout ar async ????????

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