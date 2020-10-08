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

function startGallery() {
  window.addEventListener("load", renderGallery, false);
}

window.addEventListener('load', renderGallery); // document.addEventListener("DOMContentLoaded",  renderGallery, false);

function renderGallery() {
  //Check File API support
  if (window.File && window.FileList && window.FileReader) {
    var filesInput = document.getElementById("files");
    var filesAll = [];
    filesInput.addEventListener("change", function (event) {
      var files = event.target.files;
      var output = document.getElementById("result");
      console.log(filesAll.length);

      var _loop = function _loop(i) {
        filesAll.push(files);
        var file = files[i];

        if (files[i].size < 1048576) {
          if (files[i].type.match('image')) {
            var picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
              var picFile = event.target;
              var div = document.createElement("div");
              div.className = "galleryDiv";
              div.innerHTML = "<img class=\"uploadeGallery\" src=\" ".concat(picFile.result, " \"\n                              alt=\" \"/>\n                              <input type=\"text\" id=\"").concat(files[i].name, "+alt\" name=\"altImage\">\n                              <div class=\"deleteImd\" id=\"").concat(files[i].name, "\" >Pasalinti<div/>");
              output.insertBefore(div, null);
              var altText = document.getElementById(files[i].name + '+alt');
              var imgDeleteBtn = document.getElementById(files[i].name);

              imgDeleteBtn.onclick = function () {
                div.innerHTML = "<div></div>";
                return file;
              };

              var uploadeImg = document.getElementById("submitImg");
              uploadeImg.addEventListener('click', function () {
                var altTextExport = [];
                var altTextValue = altText.value; //   altTextExport.push(altTextValue);
                // sendImageData(file, i, altTextValue);

                filesInput.value = null;
                altText.value = ""; // window.location.reload();
              });
            });
            picReader.readAsDataURL(file);
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

      for (var i = 0; i < files.length; i++) {
        _loop(i);
      }
    });
  } else {
    console.log("Your browser does not support File API");
  }
} // function newFile(file) {
// console.log(file)
//   for (let i = 0; i < files.length; i++) {
//         let file = files[i];
//  
//  console.log(imgDeleteBtn)
//   deleteCall = imgDeleteBtn.onclick = () => {
//       div.innerHTML = `<div></div>`;
//      console.log(file)
//       return file;
//   }
//   imgDeleteBtn.addEventListener('click', deleteCall);
//   const imdToDelete = document.querySelectorAll(".galleryDiv");
//   const imgDeleteBtn = document.getElementById(file.name);
//   let b = imgDeleteBtn.onclick = (function() {
//      // console.log( file)
//       imdToDelete.innerHTML = `<div></div>`;
//    return file;
//   })();
//   return b;
//   }
// }


function sendImageData(file, i, altTextValue) {
  var formData = new FormData();
  formData.append('images[' + i + ']', file);
  console.log('files[' + i + ']', file);
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
}

/* harmony default export */ __webpack_exports__["default"] = (startGallery());

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gallery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gallery.js */ "./resources/js/gallery.js");
// import startIdea from './idea.js';
 // import Header from "./test.js"
// (async () => {
//     if (startI) {
//       // import module for side effects
//       await import('./idea.js');
//     }
//   })();

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

__webpack_require__(/*! D:\xampp\htdocs\wordpress\wp-content\plugins\BIT_first\resources\js\main.js */"./resources/js/main.js");
module.exports = __webpack_require__(/*! D:\xampp\htdocs\wordpress\wp-content\plugins\BIT_first\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });