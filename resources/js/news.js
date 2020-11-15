/** @format */


"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;

const newsStart = document.getElementById("startNewsAdmin");

function startNews() {
    if (newsStart) {
        window.addEventListener("load", ()=>{
                                          renderNews();
                                          collapseNews();
                                          addNewsListener();
                                        }, false);
    }
}

function addNewsListener(){
  let button = document.getElementById("addNews");
  button.addEventListener(
    "click",
    function() {
      storeNews();
    },
    false
  );
}


function editNews(editId) {
    
    axios
    .get(
        uri + path +
        "news-edit-admin",
        {
        editId: editId
        }
    )
    .catch((err) => {
        console.log(err instanceof TypeError);
    });
    setTimeout(renderNews, 300);
    
}
function deleteNews(delId) {
    axios
      .post(
        uri + path +
          "news-destroy&id="+delId
      )
      .catch((err) => {
        console.log(err instanceof TypeError);
        console.log("Problemos su DeleteNews api");
      });
    setTimeout(renderNews, 100);
}

function storeNews(){
  axios
      .post(
        uri + path +
          "news-store"
      )
      .catch((err) => {
        console.log(err instanceof TypeError);
        console.log("Problemos su StoreNews api");
      });
    setTimeout(renderNews, 100);

}

function collapseNews(){
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function(event) {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
        event.target.innerHTML = 'SUKURTI NAUJIENĄ';
      } else {
        content.style.display = "block";
        event.target.innerHTML = 'PASLĖPTI';
      }
    });
  }
}


function renderNews() {

    axios
    .get(
      uri + path +
      "news-list",
      {}
      )
      .then(function (response) {
              if (response.status == 200 && response.statusText == "OK") {
                const dom = document.getElementById("renderNewsList");
                let HTMLString = response.data.htmlString;
                dom.innerHTML = HTMLString;

                const editBtn = document.querySelectorAll(".editBtnNews");
                const deletetBtn = document.querySelectorAll(".deleteBtnNews");
        
                for (let i = 0; i < editBtn.length; i++) {
                  let editId = editBtn[i].id;
                  editBtn[i].addEventListener(
                    "click", function() {
                      editNews(editId);
                    },
                    false
                  );
                }
                for (let i = 0; i < deletetBtn.length; i++) {
                  let delId = deletetBtn[i].id;
                  deletetBtn[i].addEventListener(
                    "click",
                    function() {
                      deleteNews(delId);
                    },
                    false
                  );
                }
              }
        

            return response;
        })
        .catch(function (error) {
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
}




export default startNews();
