/** @format */

"use strict";

const path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
const uri = document.location.origin;

const ideaStrt = document.getElementById("startIdeaAdmin");

function startIdea() {
  if (ideaStrt) {
    window.addEventListener("load", renderColons, false);
  }
}
/*----------------------- edit content axios----------------------------*/

function editText(editId) {
  const txt = document.getElementById(editId).value;

  if (
    txt != undefined ||
    txt != null ||
    txt.length >= 0 ||
    txt != "" ||
    txt != NaN
  ) {
    let text = txt.split(/\s+/);
    axios
      .post(
        uri + path +
          "idea-edit-admin",
        {
          idea: text,
          editId: editId,
        }
      )
      .catch((err) => {
        console.log(err instanceof TypeError);
      });
    setTimeout(renderColons, 500);
  }
}

/*----------------------- save content axios----------------------------*/

function solutionText(sId, i) {
  const txt1 = document.getElementById(i).value;

  if (
    txt1 != undefined ||
    txt1 != null ||
    txt1.length >= 0 ||
    txt1 != "" ||
    txt1 != NaN
  ) {
    let text1 = txt1.split(/\s+/);
    axios
      .post(
        uri + path +
          "idea-create-admin",
        {
          soliution: text1,
          solutionId: sId,
        }
      )
      .catch((err) => {
        console.log(err instanceof TypeError);
      });
    return setTimeout(renderColons, 500);
  }
}

/*----------------------- delete content axios----------------------------*/

function deleteIdea(delId) {
  axios
    .post(
      uri + path +
        "idea-delete-admin",
      {
        deleteId: delId,
      }
    )
    .catch((err) => {
      console.log(err instanceof TypeError);
      console.log("Problemos su Delete api");
    });
  setTimeout(renderColons, 500);
}

//  /*------------------------------render data  axios-----------------------------------------*/

function renderColons(e) {
  axios
    .get(
      uri + path +
        "idea-render-admin",
      {}
    )
    .then(function(response) {
      if (response.status == 200 && response.statusText == "OK") {
        const data = response.data.allData;

        let keys = [];

        for (let key in data) {
          keys.push(key);
        }

        const rende = document.getElementById("box");
        let HTMLString = "";
        let counter = 0;

        for (let i = keys.length - 1; i >= 0; i--) {
          counter++;
          let value = data[keys[i]];

          HTMLString += `<div class="box"> 

                    <div class="text"><div class="data" >${value.post_date}</div>                 
                    </div>
                    <div class="ideaContent">
                    <div class="ideaTextEdit">
                        <textarea class="ideaText" maxlength="200" name="idea" id="${value.ID}" data-attribute_name="">
                                ${value.idea_content}
                        </textarea>  
                        <button  class="ideaBtn delIdea" id="${value.ID}">
                            Trinti
                        </button> 
                        <button class="ideaBtn edit editButtonIdea" id="${value.ID}">
                            Saugoti
                        </button>
                    </div>
                    <div class="ideaSoliution">
                        <textarea class="ideaTextSoliution" maxlength="200" name="idea" id="${counter}" > 
                            ${value.idea_solution}                     
                        </textarea>
                        <button  class="ideaBtn addButtonIdea" id="${value.ID}">
                            Sprendimas
                        </button> 
                    </div> 
                    <span class="textCount" id="count"></span>
                    </div>  
                        <div class="like" data-custom-id="${value.ID}">
                            <span class="like__number">Like: ${value.idea_like}</span>             
                        </div>            
                    </div>
                </div>`;
        }
        rende.innerHTML = HTMLString;

        const editBtn = document.querySelectorAll(".editButtonIdea");
        const postBtn = document.querySelectorAll(".addButtonIdea");
        const deletetBtn = document.querySelectorAll(".delIdea");

        for (let i = 0; i < postBtn.length; i++) {
          let sId = postBtn[i].id;
          postBtn[i].addEventListener(
            "click",
            function() {
              solutionText(sId, i + 1);
            },
            false
          );
        }
        for (let i = 0; i < editBtn.length; i++) {
          let editId = editBtn[i].id;
          editBtn[i].addEventListener(
            "click",
            function() {
              editText(editId);
            },
            false
          );
        }
        for (let i = 0; i < deletetBtn.length; i++) {
          let delId = deletetBtn[i].id;
          deletetBtn[i].addEventListener(
            "click",
            function() {
              deleteIdea(delId);
            },
            false
          );
        }
      }

      return response;
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
}

export default startIdea();
