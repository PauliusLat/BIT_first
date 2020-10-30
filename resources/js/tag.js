/** @format */

"use strict";

import axios from "axios";

class Tag {
  constructor(target) {
    this.target = target;
    this.DOM = null;
    this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
    this.uri = document.location.origin;
    this.init();
    // this.tagStore = tagStore();
    // this.tagStore();
  }

  init() {
    const DOM = document.querySelector(this.target);

    // console.log(DOM);
    if (DOM) {
      axios
        .post(this.uri + this.path + "tag_create", {})
        .then(function(response) {
          const test = document.querySelector(".test");
          if (response.status == 200 && response.statusText == "OK") {
            const HTML = response.data.html;
            test.innerHTML = HTML;

            let submit = document.getElementById("create");
            let call = new Tag();

            submit.addEventListener("click", () => {
              let text = document.getElementById("tag-name").value;
              call.tagStore(text);
              console.log(text);
            });
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
  }

  tagStore(text) {
    // let text = document.getElementById("tag_name").value;
    console.log(text);
    console.log(this.uri + this.path + "tag_store");
    axios
      .post(this.uri + this.path + "tag_store", {
        name: text,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch((err) => {
        console.log(err instanceof TypeError);
      });
  }
}

export default Tag;
