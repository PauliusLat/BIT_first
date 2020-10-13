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


var path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
var uri = document.location.origin;
var gallery = document.getElementById("loadeGallery");
var arraySend = [];
var isListener = true;

function startGallery() {
  if (gallery) {
    window.addEventListener("load", renderGallery, false);
  }
}

function renderGallery() {
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {
    var filesInput = document.getElementById("files");
    filesInput.addEventListener("change", function (event) {
      // console.log(event.target.files);
      var array = Array.from(event.target.files); // console.log(array);
      // let imgArray = new Array(array);
      // console.log(imgArray);

      renderImages(array);
    });
  } else {
    console.log("Your browser does not support File API");
  }
}

function renderImages(filesAll) {
  var currentDiv = document.getElementById("message");

  var _loop = function _loop(i) {
    if (filesAll[i].size < 1048576) {
      if (filesAll[i].type.match('image')) {
        var picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          var picFile = event.target;
          var altId = getID();
          var deleteId = getID();
          var deleteBtn = getID();
          var output = document.getElementById("result");
          var div = document.createElement("div");
          div.className = "galleryDiv";
          div.id = deleteId;
          div.innerHTML = "<img class=\"uploadeImageGallery\" src=\" ".concat(picFile.result, " \"\n                      alt=\" \"/>\n                      <label for=\"").concat(deleteBtn, "\">Tag: </label>\n                      <input type=\"text\" id=\"").concat(altId, "\" name=\"altImage\">\n                      <div class=\"deleteImd\" id=\"").concat(deleteBtn, "\">Trinti<div/>");
          output.insertBefore(div, currentDiv); // const altText = document.getElementById(altId.name);

          var imgDeleteBtn = document.getElementById(deleteBtn);
          var deleteDiv = document.getElementById(deleteId);
          imgDeleteBtn.addEventListener("click", function () {
            filesAll.splice(i, 1);
            deleteDiv.remove();
          });
        });
        picReader.readAsDataURL(filesAll[i]);
      } else {
        //   const newContent = document.createTextNode("Tai nera paveikslelio tipo formatas");
        alert("Tai nera paveikslelio tipo formatas"); //  currentDiv.appendChild(newContent);
      }
    } else {
      //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
      alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb"); //   currentDiv.appendChild(newContent);
    }
  };

  for (var i = 0; i < filesAll.length; i++) {
    _loop(i);
  }

  arraySend.push(filesAll);
  var uploadeImg = document.getElementById("submitImg"); // console.log(isListener);

  if (isListener) {
    uploadeImg.addEventListener('click', function () {
      // console.log(arraySend);
      filter(arraySend);
    });
    isListener = false;
  }
}

function sendImageData(filesAll) {
  var formData = new FormData();

  for (var i = 0; i < filesAll.length; i++) {
    formData.append('files' + i, filesAll[i]);
    console.log(filesAll[i]);
  }

  axios.post(uri + path + 'gallery-create-admin', formData, {
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
}

function getID() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function filter(filesAll) {
  var file = [];

  for (var i = 0; i < filesAll.length; i++) {
    for (var j = 0; j < filesAll[i].length; j++) {
      file.push(filesAll[i][j]);
    }
  }

  file = file.filter(function (power, toThe, yellowVests) {
    return yellowVests.map(function (updateDemocracy) {
      return updateDemocracy['name'];
    }).indexOf(power['name']) === toThe;
  });
  sendImageData(file);
}


throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/resources/js/gallery.js: Identifier 'formData' has already been declared (111:8)\n\n\u001b[0m \u001b[90m 109 | \u001b[39m    let formData \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mFormData\u001b[39m()\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 110 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 111 | \u001b[39m    let formData \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mFormData\u001b[39m()\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 112 | \u001b[39m    \u001b[36mconst\u001b[39m dataTrans \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mDataTransfer\u001b[39m()\u001b[0m\n\u001b[0m \u001b[90m 113 | \u001b[39m    let itemList \u001b[33m=\u001b[39m dataTrans\u001b[33m.\u001b[39mitems\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 114 | \u001b[39m\u001b[0m\n    at Parser._raise (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:766:17)\n    at Parser.raiseWithData (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:759:17)\n    at Parser.raise (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:753:17)\n    at ScopeHandler.checkRedeclarationInScope (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:4873:12)\n    at ScopeHandler.declareName (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:4839:12)\n    at Parser.checkLVal (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:9422:22)\n    at Parser.parseVarId (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:12118:10)\n    at Parser.parseVar (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:12093:12)\n    at Parser.parseVarStatement (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11905:10)\n    at Parser.parseStatementContent (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11497:21)\n    at Parser.parseStatement (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11430:17)\n    at Parser.parseBlockOrModuleBlockBody (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:12012:25)\n    at Parser.parseBlockBody (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11998:10)\n    at Parser.parseBlock (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11982:10)\n    at Parser.parseFunctionBody (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:10962:24)\n    at Parser.parseFunctionBodyAndFinish (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:10945:10)\n    at /Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:12152:12\n    at Parser.withTopicForbiddingContext (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11271:14)\n    at Parser.parseFunction (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:12151:10)\n    at Parser.parseFunctionStatement (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11778:17)\n    at Parser.parseStatementContent (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11468:21)\n    at Parser.parseStatement (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11430:17)\n    at Parser.parseBlockOrModuleBlockBody (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:12012:25)\n    at Parser.parseBlockBody (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11998:10)\n    at Parser.parseTopLevel (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:11361:10)\n    at Parser.parse (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:13044:10)\n    at parse (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/parser/lib/index.js:13097:38)\n    at parser (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/core/lib/parser/index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/core/lib/transformation/normalize-file.js:99:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/core/lib/transformation/index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/@babel/core/lib/transform.js:27:41)\n    at transform.next (<anonymous>)\n    at step (/Applications/MAMP/htdocs/wordpress/wp-content/plugins/BIT_first/node_modules/gensync/index.js:254:32)");

/***/ }),

/***/ "./resources/js/idea.js":
/*!******************************!*\
  !*** ./resources/js/idea.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** @format */


var path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
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
    axios.post(uri + path + "idea-edit-admin", {
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
    axios.post(uri + path + "idea-create-admin", {
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
  axios.post(uri + path + "idea-delete-admin", {
    deleteId: delId
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
    console.log("Problemos su Delete api");
  });
  setTimeout(renderColons, 500);
} //  /*------------------------------render data  axios-----------------------------------------*/


function renderColons(e) {
  axios.get(uri + path + "idea-render-admin", {}).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      var data = response.data.allData;
      var keys = [];

      for (var key in data) {
        keys.push(key);
      }

      var rende = document.getElementById("box");
      var HTMLString = "";
      var counter = 0;

      for (var i = keys.length - 1; i >= 0; i--) {
        counter++;
        var value = data[keys[i]];
        HTMLString += "<div class=\"box\"> \n\n                    <div class=\"text\"><div class=\"data\" >".concat(value.post_date, "</div>                 \n                    </div>\n                    <div class=\"ideaContent\">\n                    <div class=\"ideaTextEdit\">\n                        <textarea class=\"ideaText\" maxlength=\"200\" name=\"idea\" id=\"").concat(value.ID, "\" data-attribute_name=\"\">\n                                ").concat(value.idea_content, "\n                        </textarea>  \n                        <button  class=\"ideaBtn delIdea\" id=\"").concat(value.ID, "\">\n                            Trinti\n                        </button> \n                        <button class=\"ideaBtn edit editButtonIdea\" id=\"").concat(value.ID, "\">\n                            Saugoti\n                        </button>\n                    </div>\n                    <div class=\"ideaSoliution\">\n                        <textarea class=\"ideaTextSoliution\" maxlength=\"200\" name=\"idea\" id=\"").concat(counter, "\" > \n                            ").concat(value.idea_solution, "                     \n                        </textarea>\n                        <button  class=\"ideaBtn addButtonIdea\" id=\"").concat(value.ID, "\">\n                            Sprendimas\n                        </button> \n                    </div> \n                    <span class=\"textCount\" id=\"count\"></span>\n                    </div>  \n                        <div class=\"like\" data-custom-id=\"").concat(value.ID, "\">\n                            <span class=\"like__number\">Like: ").concat(value.idea_like, "</span>             \n                        </div>            \n                    </div>\n                </div>");
      }

      rende.innerHTML = HTMLString;
      var editBtn = document.querySelectorAll(".editButtonIdea");
      var postBtn = document.querySelectorAll(".addButtonIdea");
      var deletetBtn = document.querySelectorAll(".delIdea");

      var _loop = function _loop(_i) {
        var sId = postBtn[_i].id;

        postBtn[_i].addEventListener("click", function () {
          solutionText(sId, _i + 1);
        }, false);
      };

      for (var _i = 0; _i < postBtn.length; _i++) {
        _loop(_i);
      }

      var _loop2 = function _loop2(_i2) {
        var editId = editBtn[_i2].id;

        editBtn[_i2].addEventListener("click", function () {
          editText(editId);
        }, false);
      };

      for (var _i2 = 0; _i2 < editBtn.length; _i2++) {
        _loop2(_i2);
      }

      var _loop3 = function _loop3(_i3) {
        var delId = deletetBtn[_i3].id;

        deletetBtn[_i3].addEventListener("click", function () {
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
      console.log("Error", error.message);
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