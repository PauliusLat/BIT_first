/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/gallery.js":
/*!*********************************!*\
  !*** ./resources/js/gallery.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


var uri = document.location.origin;
var gallery = document.getElementById("loadeGallery");

function startGallery() {
  if (gallery) {
    window.addEventListener("load", renderGallery, false);
  }
} // window.addEventListener('load', renderGallery);
// document.addEventListener("DOMContentLoaded",  renderGallery, false);


function renderGallery() {
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {
    var filesInput = document.getElementById("files");
    var filesAll = [];
    filesInput.addEventListener("change", function (event) {
      var array = Array.from(event.target.files);
      var imgArray = new Array(array);

      for (var i = 0; i < imgArray.length; i++) {
        filesAll = imgArray[i];
      }

      renderImages(filesAll); // console.log(filesAll);
    });
  } else {
    console.log("Your browser does not support File API");
  }
}

function renderImages(filesAll) {
  var arraySend = []; // filesAll.forEach(element => console.log(element));

  var _loop = function _loop(i) {
    // console.log(filesAll[i]);
    if (filesAll[i].size < 1048576) {
      if (filesAll[i].type.match('image')) {
        var picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          var picFile = event.target;
          var output = document.getElementById("result");
          var div = document.createElement("div");
          div.className = "galleryDiv"; //console.log(picFile);

          div.innerHTML = "<img class=\"uploadeGallery\" src=\" ".concat(picFile.result, " \"\n                      alt=\" \"/>\n                      <input type=\"text\" id=\"").concat(filesAll[i].name, "+alt\" name=\"altImage\">\n                      <div class=\"deleteImd\" id=\"").concat(filesAll[i].name, "\" >Pasalinti<div/>");
          output.insertBefore(div, null);
          var altText = document.getElementById(filesAll[i].name + '+alt');
          var imgDeleteBtn = document.getElementById(filesAll[i].name);
          imgDeleteBtn.addEventListener("click", function () {
            filesAll.splice(i, 1);
            div.innerHTML = "<div></div>";
          });
        });
        picReader.readAsDataURL(filesAll[i]);
      } else {
        var currentDiv = document.getElementById("message");
        var newContent = document.createTextNode("Tai nera paveikslelio tipo formatas");
        currentDiv.appendChild(newContent);
      }
    } else {
      var _currentDiv = document.getElementById("message");

      var _newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");

      _currentDiv.appendChild(_newContent);
    }
  };

  for (var i = 0; i < filesAll.length; i++) {
    _loop(i);
  }

  arraySend.push(filesAll);
  var uploadeImg = document.getElementById("submitImg");
  uploadeImg.addEventListener('click', function () {
    sendImageData(arraySend);
  });
}

function sendImageData(filesAll) {
  // filesAll.filter((a, b) => filesAll.indexOf(a) === b)
  var formData = new FormData();
  var file = [];

  for (var i = 0; i < filesAll.length; i++) {
    file = filesAll[i];
    console.log('files[' + i + ']', file);
    formData.append('images[' + i + ']', file);
  } // formData.append('text', allText);


  axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=gallery-create-admin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(function (response) {})["catch"](function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }

    console.log(error);
  });
} // function getNewArray(array, filesAll) {
//     for (var i = 0; i < array.length; i++) {
//         for (let j = 0; j < filesAll.length; j++) {
//             if (array[i].name == filesAll[j].name) {
//                 delete filesAll[j];
//             }
//         }
//         filesAll.push(array[i]);
//     }
//     filesAll = filesAll.filter(function () {
//         return true;
//     });
//     let newArray = [];
//     for (let i = 0; i < filesAll.length; i++) {
//         newArray.push(filesAll[i]);
//     }
//     //  filesAll =null;
//     // console.log(newArray);
//     return newArray;
// }


/* harmony default export */ __webpack_exports__["default"] = (startGallery());

/***/ }),

/***/ "./resources/js/idea.js":
/*!******************************!*\
  !*** ./resources/js/idea.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


var uri = document.location.origin;
var ideaStrt = document.getElementById("startIdeaAdmin");

function startIdea() {
  if (ideaStrt) {
    window.addEventListener("load", renderColons, false);
  }
}
/*----------------------- edit content axios----------------------------*/


function editText(editId) {
  var txt = document.getElementById(editId).value;

  if (txt != undefined || txt != null || txt.length >= 0 || txt != "" || txt != NaN) {
    var text = txt.split(/\s+/);
    axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=idea-edit-admin', {
      idea: text,
      editId: editId
    })["catch"](function (err) {
      console.log(err instanceof TypeError);
    });
    setTimeout(renderColons, 500);
  }
}
/*----------------------- save content axios----------------------------*/


function solutionText(sId, i) {
  var txt1 = document.getElementById(i).value;

  if (txt1 != undefined || txt1 != null || txt1.length >= 0 || txt1 != "" || txt1 != NaN) {
    var text1 = txt1.split(/\s+/);
    axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=idea-create-admin', {
      soliution: text1,
      solutionId: sId
    })["catch"](function (err) {
      console.log(err instanceof TypeError);
    });
    return setTimeout(renderColons, 500);
  }
}
/*----------------------- delete content axios----------------------------*/


function deleteIdea(delId) {
  axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=idea-delete-admin', {
    deleteId: delId
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
    console.log('Problemos su Delete api');
  });
  setTimeout(renderColons, 500);
} //  /*------------------------------render data  axios-----------------------------------------*/


function renderColons(e) {
  axios.get(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=idea-render-admin', {}).then(function (response) {
    if (response.status == 200 && response.statusText == 'OK') {
      var data = response.data.allData;
      var keys = [];

      for (var key in data) {
        keys.push(key);
      }

      var rende = document.getElementById('box');
      var HTMLString = '';
      var counter = 0;

      for (var i = keys.length - 1; i >= 0; i--) {
        counter++;
        var value = data[keys[i]];
        HTMLString += "<div class=\"box\"> \n                    <div class=\"text\"><div class=\"data\" >".concat(value.post_date, "</div>                 \n                    </div>\n                    <div class=\"ideaContent\">\n                    <div class=\"ideaTextEdit\">\n                        <textarea class=\"ideaText\" maxlength=\"200\" name=\"idea\" id=\"").concat(value.ID, "\" data-attribute_name=\"\">\n                                ").concat(value.idea_content, "\n                        </textarea>  \n                        <button  class=\"ideaBtn delIdea\" id=\"").concat(value.ID, "\">\n                            Trinti\n                        </button> \n                        <button class=\"ideaBtn edit editButtonIdea\" id=\"").concat(value.ID, "\">\n                            Saugoti\n                        </button>\n                    </div>\n                    <div class=\"ideaSoliution\">\n                        <textarea class=\"ideaTextSoliution\" maxlength=\"200\" name=\"idea\" id=\"").concat(counter, "\" > \n                            ").concat(value.idea_solution, "                     \n                        </textarea>\n                        <button  class=\"ideaBtn addButtonIdea\" id=\"").concat(value.ID, "\">\n                            Sprendimas\n                        </button> \n                    </div> \n                    <span class=\"textCount\" id=\"count\"></span>\n                    </div>  \n                        <div class=\"like\" data-custom-id=\"").concat(value.ID, "\">\n                            <span class=\"like__number\">Like: ").concat(value.idea_like, "</span>             \n                        </div>            \n                    </div>\n                </div>");
      }

      rende.innerHTML = HTMLString;
      var editBtn = document.querySelectorAll(".editButtonIdea");
      var postBtn = document.querySelectorAll(".addButtonIdea");
      var deletetBtn = document.querySelectorAll(".delIdea");

      var _loop = function _loop(_i) {
        var sId = postBtn[_i].id;

        postBtn[_i].addEventListener('click', function () {
          solutionText(sId, _i + 1);
        }, false);
      };

      for (var _i = 0; _i < postBtn.length; _i++) {
        _loop(_i);
      }

      var _loop2 = function _loop2(_i2) {
        var editId = editBtn[_i2].id;

        editBtn[_i2].addEventListener('click', function () {
          editText(editId);
        }, false);
      };

      for (var _i2 = 0; _i2 < editBtn.length; _i2++) {
        _loop2(_i2);
      }

      var _loop3 = function _loop3(_i3) {
        var delId = deletetBtn[_i3].id;

        deletetBtn[_i3].addEventListener('click', function () {
          deleteIdea(delId);
        }, false);
      };

      for (var _i3 = 0; _i3 < deletetBtn.length; _i3++) {
        _loop3(_i3);
      }
    }

    return response;
  })["catch"](function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }

    console.log(error);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (startIdea());

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _idea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idea.js */ "./resources/js/idea.js");
/* harmony import */ var _gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gallery.js */ "./resources/js/gallery.js");

 // import Header from "./test.js"

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**************************************************************!*\
  !*** multi ./resources/js/main.js ./resources/sass/app.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/resources/js/main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });