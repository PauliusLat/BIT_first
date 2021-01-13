"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;
const pageStrt = document.getElementById("pageStart");


// console.log(pageStrt);

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
        const submit = document.getElementById("create");
        submit.addEventListener("click", () => {
          const title = document.getElementById("page_title").value;
          let post = document.getElementById('post');
          let select = post.options[post.selectedIndex].value;
          let stateArray = []
          let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
          for (let i = 0; i < checkboxes.length; i++) {
            stateArray.push(checkboxes[i].value)
          }
          console.log(stateArray);
          // let pageState = document.getElementById('pageState');
          // let selectpageState = pageState.options[pageState.selectedIndex].value;
          // console.log(select);  
        pageStore(title, select, stateArray);
        });

        const editBtn = pageStrt.querySelectorAll(".page-edit");

        for (let i = 0; i < editBtn.length; i++) {
          let ID = editBtn[i].value;
        //   console.log(ID);
        //   let page = editBtn[i].id;
          editBtn[i].addEventListener(
            "click",
            function() {
              pageEdit(ID);
            },
            false
          );
        }

        const deleteBtn = document.querySelectorAll(".page-delete");
        for (let i = 0; i < deleteBtn.length; i++) {
          let ID = deleteBtn[i].value;
          deleteBtn[i].addEventListener(
            "click",
            function() {
              pageDelete(ID);
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

function pageStore(title, select, stateArray) {
  console.log(stateArray);
  axios
    .post(uri + path + "page_store", {
      page_title: title,
      // page_name: name,
      post_type: select,
      page_state: stateArray
    })
    .then(function(response) {
      console.log(response);
      init();
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
  document.getElementById("page_title").value = "";
}

function pageEdit(ID) {
  axios
    .post(uri + path + "page_edit&id="+ID, {
      editID: ID,

    })
    .then(function(response) {
      const test = document.querySelector(".innerpage");
      if (response.status == 200 && response.statusText == "OK") {
        const HTML = response.data.html;
        test.innerHTML = HTML;
      }
      const updateBtn = document.getElementById("pageUpdate");
      // console.log(updateBtn)
      const updateId = updateBtn.value;
      // console.log(updateId)
      updateBtn.addEventListener("click", () => {
        pageUpdate(updateId);
      });
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

function pageUpdate(updateId) {
  // console.log(updateId)
  const title = document.getElementById("page_title").value;
  const post = document.getElementById('post');
  const select = post.options[post.selectedIndex].value;

  let stateArray = []
  let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  for (let i = 0; i < checkboxes.length; i++) {
    stateArray.push(checkboxes[i].value)
  }
  console.log(stateArray);
  // console.log(selectpageState);
  const name = document.getElementById("page_name").value;
  // console.log(name);

  axios
    .post(uri + path + "page_update&id="+updateId, {
      updateId: updateId,
      page_title: title,
      page_name: name,
      post_type: select,
      page_state: stateArray
    })
    .then(function(response) {
      if (response.status == 200 && response.statusText == "OK") {
        init();
      }
    })

    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

function pageDelete(ID) {
  axios
    .post(uri + path + "page_destroy&id="+ID, {
      deleteID: ID,
    })
    .then(function(response) {
      if (response.status == 200 && response.statusText == "OK") {
        console.log(response);
        init();
      }
    })
    .catch((err) => {
      console.log(err instanceof TypeError);
    });
}

export default startPage();
