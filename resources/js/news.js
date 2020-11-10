/** @format */


"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;

const newsStart = document.getElementById("startNewsAdmin");

function startNews() {
    if (newsStart) {
        window.addEventListener("load", renderNews, false);
    }
}

/*----------------------- edit content axios----------------------------*/

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
    // setTimeout(renderNews, 500);
    
}
function deleteNews(delId) {
    axios
      .post(
        uri + path +
          "news_destroy&id="+delId,
        {
          deleteId: delId,
        }
      )
      .catch((err) => {
        console.log(err instanceof TypeError);
        console.log("Problemos su Delete api");
      });
    setTimeout(renderNews, 500);
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
                const data = response.data.data;

                const dom = document.getElementById("renderNewsList");
                let HTMLString = "";
                let counter = 0;

                let keys = [];
                for (let key in data) {
                  keys.push(key);
                }

                for (let i = keys.length - 1; i >= 0; i--) {
                    let value = data[keys[i]];
                    counter++;

                    HTMLString += 
                    `<div class="news-box"> 
  
                      <div class="news-img">
                        <img src="${value.attachments}" alt="">
                      </div>
                      <div class="news-text">
                        <div class="news-date">
                            <p>${value.post_date}</p>
                        </div>
                        <div class="news-content">
                            <p>${value.post_title}</p>
                        </div>
                      </div>
                      <div class="news-buttons">
                        <button  class="newsBtn deleteBtnNews" id="${value.ID}">
                            Trinti
                        </button> 
                        <button  class="newsBtn editBtnNews" id="${value.ID}">
                            Redaguoti
                        </button> 
                      </div>
                    </div>`;
                }
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





// export default startNews();
