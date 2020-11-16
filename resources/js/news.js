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
                                          renderImg();
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

function renderImg() {
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {

      let fileInput = document.getElementById("newsImg");

      fileInput.addEventListener("change", function(event) {

          let array = Array.from(event.target.files);
  console.log(array);
          renderImage(array[0]);
      });
  } else {
      console.log("Your browser does not support File API");
  }
}


function renderImage(file) {

  const currentDiv = document.getElementById("news-add");

    if (file.size < 1048576) {
        if (file.type.match('image')) {
            const picReader = new FileReader();
            picReader.addEventListener("load", function(event) {
                const picFile = event.target;
                // let deleteId = getID();
                // let deleteBtn = getID();
                // const output = document.getElementById("result");
                // const div = document.createElement("div");
                // div.className = "galleryDiv";
                // div.id = deleteId;

                div.innerHTML = `<img class="uploadeImageGallery" src=" ${picFile.result} "
                  alt=" "/>
                  <label for="${deleteBtn}">Tag: </label>
                  <input type="text" id="${filesAll[i].name}" class="altInput" name="altImage" value="">
                  <div class="deleteImd" id="${deleteBtn}">Trinti<div/>`;

                output.insertBefore(div, currentDiv);

                const imgDeleteBtn = document.getElementById(deleteBtn);
                const deleteDiv = document.getElementById(deleteId);

                imgDeleteBtn.addEventListener("click", () => {
                    filesAll.splice(i, 1);
                    deleteDiv.remove();
                });
            });

            picReader.readAsDataURL(filesAll[i]);

        } else {
            alert("Tai nera paveikslelio tipo formatas");
        }
    } else {
        alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
        //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
        //   currentDiv.appendChild(newContent);
    }

  arraySend.push(filesAll);

  const uploadeImg = document.getElementById("submitImg");

  if (isListener) {
      uploadeImg.addEventListener('click', function() {

          arraySend = filter(arraySend);
          sendImageData(arraySend);

      });
      isListener = false;
  }
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

function storeNews() {

  const txt1 = document.getElementById(i).value;
  console.log(txt1);

  if (
    txt1 != undefined &&
    txt1 != null &&
    txt1.length >= 0 &&
    txt1 != "" &&
    txt1 != NaN
  ) {
    let text1 = txt1.split(/\s+/);
    axios
      .post(uri + path + "idea-create-admin", {
        soliution: text1,
        solutionId: sId,
      })
      .catch((err) => {
        console.log(err instanceof TypeError);
      });
    return setTimeout(renderColons, 500);
  }



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

function collapseNews() {
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
