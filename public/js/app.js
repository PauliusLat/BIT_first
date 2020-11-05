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

/***/ "./resources/js/calendar.js":
/*!**********************************!*\
  !*** ./resources/js/calendar.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calendar = /*#__PURE__*/function () {
  function Calendar(target) {
    _classCallCheck(this, Calendar);

    this.target = target;
    this.DOM = null;
    this.date = new Date();
    this.y = this.date.getFullYear(), this.m = this.date.getMonth(), this.d = this.date.getDay();
    this.lastDayM = new Date(this.y, this.m + 1, 0).getDate();
    var days = this.lastDayM;
    this.curentM = new Date(this.y, this.m + 1, 0).getMonth();
    this.curentDay = new Date(this.y, this.curentM, 1).getDay();
    var startDay = this.curentDay;
    this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
    this.uri = document.location.origin;
    this.init(days, startDay);
  }

  _createClass(Calendar, [{
    key: "init",
    value: function init(lastDayM, startDay) {
      var _this = this;

      var DOM = document.querySelector(this.target);

      if (DOM) {
        var a = 1;
        var lastMth = document.getElementById("calendar-month-last");
        var nextMth = document.getElementById("calendar-month-next");
        lastMth.addEventListener("click", function () {
          a = a - 1;

          _this.month(a);
        });
        nextMth.addEventListener("click", function () {
          a = a + 1;

          _this.month(a);
        });
        this.render(lastDayM, startDay);
      }
    }
  }, {
    key: "render",
    value: function render(lastDayM, curentDay, dataDate) {
      var _this2 = this;

      var today = this.date;

      if (curentDay == 0) {
        curentDay = 7;
      }

      var calendarDays = document.getElementById("dates");
      var exisitClassMonth = document.querySelector(".cview__month-current").textContent;

      if (exisitClassMonth == 1) {
        var nowM = new Date(this.y, this.date.getMonth());
        var nowY = nowM.toString().slice(11, -47);
        nowM = nowM.toString().slice(4, -55);
        nowM = this.translate(nowM);
        document.getElementById("calendar-month").innerHTML = nowY + ' ' + nowM;
      }

      var check = document.querySelectorAll(".cview--spacer");
      var check1 = document.querySelectorAll(".cview--date");

      if (check.length == 0 && check1.length == 0) {
        for (var i = 0; i < curentDay - 1; i++) {
          var spacer = document.createElement("div");
          spacer.className = "cview--spacer";
          calendarDays.appendChild(spacer);
        }

        for (var d = 1; d <= lastDayM; d++) {
          var _date = new Date(this.y, this.m, d);

          var day = document.createElement("div");
          day.className = "cview--date";
          day.textContent = d;
          day.setAttribute("data-date", _date);

          if (d == today.getDate() && this.y == today.getFullYear() && this.m == today.getMonth()) {
            day.classList.add("today");
          }

          calendarDays.appendChild(day);
        }
      } else {
        Array.from(document.querySelectorAll('.cview--spacer')).forEach(function (el) {
          return el.remove();
        });
        Array.from(document.querySelectorAll('.cview--date')).forEach(function (el) {
          return el.remove();
        });

        for (var x = 0; x < curentDay - 1; x++) {
          var _spacer = document.createElement("div");

          _spacer.className = "cview--spacer";
          calendarDays.appendChild(_spacer);
        }

        for (var _d = 1; _d <= lastDayM; _d++) {
          dataDate.setDate(_d);

          var _day = document.createElement("div");

          _day.className = "cview--date";
          _day.textContent = _d;

          _day.setAttribute("data-date", dataDate);

          calendarDays.appendChild(_day);
        }

        var aadToday = new Date(this.y, this.m, this.date.getDate());
        var isToday = document.querySelectorAll(".cview--date");

        for (var _i = 0; _i < isToday.length; _i++) {
          if (isToday[_i].dataset.date == aadToday) {
            isToday[_i].classList.add("today");
          }
        }
      }

      var event = document.querySelectorAll(".cview--date");

      var _loop = function _loop(_i2) {
        event[_i2].addEventListener("click", function (e) {
          var day = event[_i2].innerText;
          var action = event[_i2].dataset.date;
          var curentM = action.toString().slice(4, -55);

          var month = _this2.translate(curentM);

          _this2.event(action, month, day);
        });
      };

      for (var _i2 = 0; _i2 < event.length; _i2++) {
        _loop(_i2);
      }

      this.getData();
    }
  }, {
    key: "month",
    value: function month(a) {
      var curentMth = document.getElementById("calendar-month");
      var dataDate = new Date(this.y, this.m + a - 1);
      var y = this.date.getFullYear(),
          m = this.date.getMonth();
      var curentM = new Date(y, this.date.getMonth() + a, 0);
      var curentY = curentM.toString().slice(11, -47);
      curentM = curentM.toString().slice(4, -55);
      var curM = this.translate(curentM);
      curentMth.innerHTML = curentY + ' ' + curM;
      var lastDayM = new Date(y, m + a, 0).getDate();
      var newM = new Date(y, m + a, 0).getMonth();
      var startDay = new Date(curentY, newM, 1).getDay();
      return this.render(lastDayM, startDay, dataDate);
    }
  }, {
    key: "translate",
    value: function translate(curentM) {
      switch (curentM) {
        case 'Jan':
          return curentM = 'Sausis';
          break;

        case 'Feb':
          return curentM = 'Vasaris';
          break;

        case 'Mar':
          return curentM = 'Kovas';
          break;

        case 'Apr':
          return curentM = 'Balandis';
          break;

        case 'May':
          return curentM = 'Gegužė';
          break;

        case 'Jun':
          return curentM = 'Birželis';
          break;

        case 'Jul':
          return curentM = 'Liepa';
          break;

        case 'Aug':
          return curentM = 'Rugpjūtis';
          break;

        case 'Sep':
          return curentM = 'Rugsėjis';
          break;

        case 'Oct':
          return curentM = 'Spalis';
          break;

        case 'Nov':
          return curentM = 'Lapkritis';
          break;

        case 'Dec':
          return curentM = 'Gruodis';
          break;
      }
    }
  }, {
    key: "event",
    value: function event(action, month, day) {
      var _this3 = this;

      this.path;
      this.uri;
      var table = document.querySelector(".eventContainer");
      var HTML = "<div class=\"popup\">\n                <div class=\"content\">\n                  <div class=\"event\">     \n                    <span class=\"closebtn\">&#9932;</span>      \n                    <div class=\"eventTitle\">\n                       <h1>Ivesti nauja \u012Fvyki</h1>\n                    </div>\n                    <div class=\"subscribe\">\n                        <input class=\"newEvent\" type=\"text\" id=\"sendText\" placeholder=\"Naujas \u012Fvykis\">\n                        <input type=\"time\" id=\"appt\" name=\"appt\" value=\"00:00\">\n                      <div class=\"eventBtn\">\n                        Si\u0173sti\n                      </div>\n                    </div>\n                  </div>\n                    <div class=\"eventH2\">\n                        \u012Evykiai - ".concat(month, " ").concat(day, "\n                    </div>\n                    <div id=\"daysEvens\" class=\"eventBox\">\n                    </div>\n                </div>\n              </div>");
      table.innerHTML = HTML;
      this.renderEvents(action);
      var close = document.querySelector(".closebtn");
      var send = document.querySelector(".eventBtn");
      HTML = "";
      close.addEventListener("click", function (e) {
        table.innerHTML = HTML;
      });
      send.addEventListener("click", function (e) {
        var sendE = document.getElementById('sendText').value;
        var time = document.getElementById('appt').value;

        if (sendE.length != 0) {
          axios.post(_this3.uri + _this3.path + "calendar-store-admin", {
            date: action,
            event: sendE,
            time: time
          })["catch"](function (err) {
            console.log(err instanceof TypeError);
          });
          setTimeout(function () {
            _this3.getData(action);
          }, 400);
          setTimeout(function () {
            _this3.renderEvents(action);
          }, 500);
        }

        document.getElementById("sendText").value = "";
      });
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(action) {
      axios.post(this.uri + this.path + 'calendar-create-admin', {}).then(function (response) {
        if (response.status == 200 && response.statusText == 'OK') {
          (function () {
            var call = new Calendar();
            var data = response.data.allData;
            var allEvens = document.getElementById('daysEvens');
            var HTML = "";
            var keys = [];
            var keys1 = [];
            var value = "";
            var value1 = [];
            var newValue = "";

            for (var key in data) {
              keys.push(key);
            }

            for (var i = 0; i < keys.length; i++) {
              value = data[keys[i]];

              if (action == value.event_date) {
                value1[i] = value;
              }
            }

            value1.sort(function (a, b) {
              return a.event_time < b.event_time ? -1 : a.event_time > b.event_time ? 1 : 0;
            });

            for (var key1 in value1) {
              keys1.push(key1);
            }

            if (keys1.length != 0) {
              for (var j = 0; j < keys1.length; j++) {
                newValue = value1[keys1[j]];

                if (action == newValue.event_date) {
                  HTML += "<div class=\"oneEventBtn\">\n                                    <div class=\"oneEvent\">\n                                        ".concat(newValue.event_time, "   ").concat(newValue.event_description, "\n                                    </div>\n                                    <div class=\"myEventBtn\" id=\"").concat(newValue.ID, "\" data-date=\"").concat(action, "\">\n                                        Trinti\n                                    </div>\n                                </div>");
                }

                allEvens.innerHTML = HTML;
              }
            } else {
              HTML = "";
              allEvens.innerHTML = HTML;
            }

            var deleteBtn = document.querySelectorAll(".myEventBtn");

            var _loop2 = function _loop2(_j) {
              deleteBtn[_j].addEventListener("click", function (e) {
                var action = deleteBtn[_j].dataset.date;
                var id = deleteBtn[_j].id;
                call.deleteEvent(id, action);
              });
            };

            for (var _j = 0; _j < deleteBtn.length; _j++) {
              _loop2(_j);
            }

            ;
          })();
        }
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
  }, {
    key: "deleteEvent",
    value: function deleteEvent(id, action) {
      var _this4 = this;

      axios.post(this.uri + this.path + "calendar-delete-admin", {
        eventID: id
      }).then(function (response) {
        if (response.status == 200 && response.statusText == 'OK') {
          var data = response.data.allData;
          var dayEvents = document.querySelectorAll(".daysEvent");
          var keys = [];

          for (var key in data) {
            keys.push(key);
          }

          var counter = 0;
          console.log(action);

          for (var i = 0; i < dayEvents.length; i++) {
            for (var j = 0; j < keys.length; j++) {
              if (data[keys[j]].event_date == action) {
                counter++;
              }

              if (counter < 1 && action == dayEvents[i].dataset.date) {
                dayEvents[i].classList.remove("daysEvent");
              }
            }
          }
        }
      })["catch"](function (err) {
        console.log(err instanceof TypeError);
      });
      return setTimeout(function () {
        _this4.renderEvents(action);
      }, 500);
    }
  }, {
    key: "getData",
    value: function getData() {
      axios.post(this.uri + this.path + 'calendar-create-admin', {}).then(function (response) {
        if (response.status == 200 && response.statusText == 'OK') {
          var data = response.data.allData;
          var dayEvents = document.querySelectorAll(".cview--date");
          var keys = [];

          for (var key in data) {
            keys.push(key);
          }

          for (var i = 0; i < dayEvents.length; i++) {
            for (var j = 0; j < keys.length; j++) {
              if (data[keys[j]].event_date == dayEvents[i].dataset.date && "cview--date today" != dayEvents[i].className) {
                dayEvents[i].classList.add("daysEvent");
              }
            }
          }
        }
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
  }]);

  return Calendar;
}();

/* harmony default export */ __webpack_exports__["default"] = (Calendar);

/***/ }),

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
      var array = Array.from(event.target.files);
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
          var deleteId = getID();
          var deleteBtn = getID();
          var output = document.getElementById("result");
          var div = document.createElement("div");
          div.className = "galleryDiv";
          div.id = deleteId;
          div.innerHTML = "<img class=\"uploadeImageGallery\" src=\" ".concat(picFile.result, " \"\n                      alt=\" \"/>\n                      <label for=\"").concat(deleteBtn, "\">Tag: </label>\n                      <input type=\"text\" id=\"").concat(filesAll[i].name, "\" class=\"altInput\" name=\"altImage\" value=\"\">\n                      <div class=\"deleteImd\" id=\"").concat(deleteBtn, "\">Trinti<div/>");
          output.insertBefore(div, currentDiv);
          var imgDeleteBtn = document.getElementById(deleteBtn);
          var deleteDiv = document.getElementById(deleteId);
          imgDeleteBtn.addEventListener("click", function () {
            filesAll.splice(i, 1);
            deleteDiv.remove();
          });
        });
        picReader.readAsDataURL(filesAll[i]);
      } else {
        alert("Tai nera paveikslelio tipo formatas");
      }
    } else {
      alert("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb"); //  const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
      //   currentDiv.appendChild(newContent);
    }
  };

  for (var i = 0; i < filesAll.length; i++) {
    _loop(i);
  }

  arraySend.push(filesAll);
  var uploadeImg = document.getElementById("submitImg");

  if (isListener) {
    uploadeImg.addEventListener('click', function () {
      arraySend = filter(arraySend);
      sendImageData(arraySend);
    });
    isListener = false;
  }
}

function sendImageData(filesAll) {
  var tagInput;
  var formData = new FormData();
  var album = document.getElementById('albumName');

  for (var i = 0; i < filesAll.length; i++) {
    tagInput = document.getElementById(filesAll[i].name);
    formData.append('files' + i, filesAll[i]);
    formData.append('tag' + i, tagInput.value + ' ');
  }

  formData.append('album', album.value);
  console.log(Object.fromEntries(formData));
  axios.post(uri + path + 'gallery-store-admin', formData, {
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
  }); //  location.reload();
}

function getID() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function filter(filesAll) {
  var file = [];

  for (var i = 0; i < filesAll.length; i++) {
    for (var j = 0; j < filesAll[i].length; j++) {
      if (filesAll[i][j] != undefined && filesAll[i][j] != null && filesAll[i][j] != "" && filesAll[i][j] != NaN && filesAll[i][j].size < 1048576) {
        file.push(filesAll[i][j]);
      }
    }
  }

  file = file.filter(function (power, toThe, yellowVests) {
    return yellowVests.map(function (updateDemocracy) {
      return updateDemocracy['name'];
    }).indexOf(power['name']) === toThe;
  });
  return file;
}

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

  if (txt != undefined && txt != null && txt.length >= 0 && txt != "" && txt != NaN) {
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

  if (txt1 != undefined && txt1 != null && txt1.length >= 0 && txt1 != "" && txt1 != NaN) {
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
/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendar.js */ "./resources/js/calendar.js");
/* harmony import */ var _news_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news.js */ "./resources/js/news.js");




new _calendar_js__WEBPACK_IMPORTED_MODULE_2__["default"]('.calendar');

/***/ }),

/***/ "./resources/js/news.js":
/*!******************************!*\
  !*** ./resources/js/news.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/** @format */


var path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
var uri = document.location.origin;
var newsStart = document.getElementById("startNewsAdmin");

function startNews() {
  if (newsStart) {
    window.addEventListener("load", renderNews, false);
  }
}
/*----------------------- edit content axios----------------------------*/


function editNews(editId) {
  axios.get(uri + path + "news-edit-admin", {
    editId: editId
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
  }); // setTimeout(renderNews, 500);
}

function deleteNews(delId) {
  axios.post(uri + path + "news_destroy&id=" + delId, {
    deleteId: delId
  })["catch"](function (err) {
    console.log(err instanceof TypeError);
    console.log("Problemos su Delete api");
  });
  setTimeout(renderNews, 500);
}

function renderNews() {
  axios.get(uri + path + "news-list", {}).then(function (response) {
    if (response.status == 200 && response.statusText == "OK") {
      var data = response.data.data;
      var dom = document.getElementById("renderNewsList");
      var HTMLString = "";
      var counter = 0;
      var keys = [];

      for (var key in data) {
        keys.push(key);
      }

      for (var i = keys.length - 1; i >= 0; i--) {
        var value = data[keys[i]];
        counter++;
        HTMLString += "<div class=\"news-box\"> \n  \n                      <div class=\"news-img\">\n                        <img src=\"".concat(value.attachments, "\" alt=\"\">\n                      </div>\n                      <div class=\"news-text\">\n                        <div class=\"news-date\">\n                            <p>").concat(value.post_date, "</p>\n                        </div>\n                        <div class=\"news-content\">\n                            <p>").concat(value.post_title, "</p>\n                        </div>\n                      </div>\n                      <div class=\"news-buttons\">\n                        <button  class=\"newsBtn deleteBtnNews\" id=\"").concat(value.ID, "\">\n                            Trinti\n                        </button> \n                        <button  class=\"newsBtn editBtnNews\" id=\"").concat(value.ID, "\">\n                            Redaguoti\n                        </button> \n                      </div>\n                    </div>");
      }

      dom.innerHTML = HTMLString;
      var editBtn = document.querySelectorAll(".editBtnNews");
      var deletetBtn = document.querySelectorAll(".deleteBtnNews");

      var _loop = function _loop(_i) {
        var editId = editBtn[_i].id;

        editBtn[_i].addEventListener("click", function () {
          editNews(editId);
        }, false);
      };

      for (var _i = 0; _i < editBtn.length; _i++) {
        _loop(_i);
      }

      var _loop2 = function _loop2(_i2) {
        var delId = deletetBtn[_i2].id;

        deletetBtn[_i2].addEventListener("click", function () {
          deleteNews(delId);
        }, false);
      };

      for (var _i2 = 0; _i2 < deletetBtn.length; _i2++) {
        _loop2(_i2);
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

/* harmony default export */ __webpack_exports__["default"] = (startNews());

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