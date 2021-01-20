/** @format */
"use strict";
 
import Api from './api';
 
class Calendar {
 
    constructor(target) {
 
        this.target = target;
        this.axios = new Api;
        this.DOM = null;
        this.date = new Date();
        this.y = this.date.getFullYear(), this.m = this.date.getMonth(), this.d = this.date.getDay();
        this.lastDayM = new Date(this.y, this.m + 1, 0).getDate();
        let days = this.lastDayM;
        this.curentM = new Date(this.y, this.m + 1, 0).getMonth();
        this.curentDay = new Date(this.y, this.curentM, 1).getDay();
        let startDay = this.curentDay;
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
        this.months = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'];
        this.init(days, startDay);
    }
 
    init(lastDayM, startDay) {
 
        const DOM = document.querySelector(this.target);
 
        if (DOM) {
            let a = 1;
            const lastMth = document.getElementById("calendar-month-last");
            const nextMth = document.getElementById("calendar-month-next");
 
            lastMth.addEventListener("click", () => {
                a = a - 1;
                this.month(a);
            });
 
            nextMth.addEventListener("click", () => {
                a = a + 1;
                this.month(a);
            });
            this.render(lastDayM, startDay);
        }
    }
 
    render(lastDayM, curentDay, dataDate) {
 
        let today = this.date;
 
        if (curentDay == 0) {
            curentDay = 7;
        }
 
        const calendarDays = document.getElementById("dates");
        const exisitClassMonth = document.querySelector(".cview__month-current").textContent;
 
        if (exisitClassMonth == 1) {
            this.m;
            let nowM = this.m;
            let nowY = this.y;
            nowM = this.months[nowM];
            document.getElementById("calendar-month").innerHTML = nowY + ' ' + nowM;
        }
 
        const check = document.querySelectorAll(".cview--spacer");
        const check1 = document.querySelectorAll(".cview--date");
 
        if (check.length == 0 && check1.length == 0) {
 
            for (let i = 0; i < curentDay - 1; i++) {
 
                const spacer = document.createElement("div");
                spacer.className = "cview--spacer";
                calendarDays.appendChild(spacer);
            }
            for (let d = 1; d <= lastDayM; d++) {
 
                let _date = new Date(this.y, this.m, d);
                // console.log(_date);
                const day = document.createElement("div");
                day.className = "cview--date";
                day.textContent = d;
                day.setAttribute("data-date", _date);
 
                if (d == today.getDate() && this.y == today.getFullYear() && this.m == today.getMonth()) {
                    day.classList.add("today");
                }
                calendarDays.appendChild(day);
            }
        } else {
            Array.from(document.querySelectorAll('.cview--spacer')).forEach(el => el.remove());
            Array.from(document.querySelectorAll('.cview--date')).forEach(el => el.remove());
 
            for (let x = 0; x < curentDay - 1; x++) {
 
                const spacer = document.createElement("div");
                spacer.className = "cview--spacer";
                calendarDays.appendChild(spacer);
            }
 
            for (let d = 1; d <= lastDayM; d++) {
                dataDate.setDate(d);
                const day = document.createElement("div");
                day.className = "cview--date";
                day.textContent = d;
                day.setAttribute("data-date", dataDate);
                calendarDays.appendChild(day);
            }
            const aadToday = new Date(this.y, this.m, this.date.getDate());
            const isToday = document.querySelectorAll(".cview--date");
 
            for (let i = 0; i < isToday.length; i++) {
                if (isToday[i].dataset.date == aadToday) {
                    isToday[i].classList.add("today");
                }
            }
        }
        const event = document.querySelectorAll(".cview--date");
        const month = document.querySelector(".cview__month-current")
        for (let i = 0; i < event.length; i++) {
 
            event[i].addEventListener(
                "click",
                e => {
                    let day = event[i].innerText;
                    let action = event[i].dataset.date;
                    let m = month.innerText
                    this.event(action, m, day);
                });
        }
        this.getData();
    }
 
    month(a) {
 
        const curentMth = document.getElementById("calendar-month");
        let dataDate = new Date(this.y, this.m + a - 1);
        let y = this.date.getFullYear(),
            m = this.date.getMonth();
        let curentY = new Date(y, this.date.getMonth() + a, 0).getFullYear();
        let curM = this.months[new Date(y, this.date.getMonth() + a, 0).getMonth()];
        curentMth.innerHTML = curentY + ' ' + curM;
        let lastDayM = new Date(y, m + a, 0).getDate();
        let newM = new Date(y, m + a, 0).getMonth();
        let startDay = new Date(curentY, newM, 1).getDay();

        return this.render(lastDayM, startDay, dataDate)
    }

    event(action, month, day) {
        this.path;
        this.uri;
        let table = document.querySelector(".eventContainer");
 
        let HTML = `<div class="popup">
                <div class="content">
                  <div class="event">     
                    <span class="closebtn">&#9932;</span>      
                    <div class="eventTitle">
                       <h1>Ivesti nauja įvyki</h1>
                    </div>
                    <div class="subscribe">
                        <input class="newEvent" type="text" id="sendText" placeholder="Naujas įvykis">
                        <input type="time" id="appt" name="appt" value="00:00">
                      <div class="eventBtn">
                        Siųsti
                      </div>
                    </div>
                  </div>
                    <div class="eventH2">
                        Įvykiai - ${month} ${day}
                    </div>
                    <div id="daysEvens" class="eventBox">
                    </div>
                </div>
              </div>`
        table.innerHTML = HTML;
 
        this.renderEvents(action);
 
        let close = document.querySelector(".closebtn");
        const send = document.querySelector(".eventBtn");
 
        HTML = "";
        close.addEventListener(
            "click",
            e => {
                table.innerHTML = HTML;
            });
        send.addEventListener(
            "click",
            e => {
                const sendE = document.getElementById('sendText').value;
                const time = document.getElementById('appt').value;
                if (sendE.length != 0) {
                    const api = "calendar-store-admin";
                    let obj = {
                        api: api,
                        date: action,
                        event: sendE,
                        time: time
                    }
                    this.axios.formDataApi(obj);
                    setTimeout(() => { this.getData(action); }, 400);
                    setTimeout(() => { this.renderEvents(action); }, 500);
                }
                document.getElementById("sendText").value = "";
            });
    }
 
    renderEvents(action) {
        axios.post(
            this.uri + this.path +
            'calendar-create-admin', {}
        )
            .then(function (response) {
 
                if (response.status == 200 && response.statusText == 'OK') {
 
                    let call = new Calendar();
                    const data = response.data.allData;
                    const allEvens = document.getElementById('daysEvens');
 
                    let HTML = "";
                    let keys = [];
                    let keys1 = [];
                    let value = "";
                    let value1 = [];
                    let newValue = "";
 
                    for (let key in data) {
                        keys.push(key);
                    }
 
                    for (let i = 0; i < keys.length; i++) {
                        value = data[keys[i]];
                        if (action == value.event_date) {
                            value1[i] = value;
                        }
                    }
 
                    value1.sort((a, b) => (a.event_time < b.event_time) ? -1 : ((a.event_time > b.event_time) ? 1 : 0));
 
                    for (let key1 in value1) {
                        keys1.push(key1);
                    }
                    if (keys1.length != 0) {
                        for (let j = 0; j < keys1.length; j++) {
                            newValue = value1[keys1[j]];
                            if (action == newValue.event_date) {
 
                                HTML += `<div class="oneEventBtn">
                                    <div class="oneEvent">
                                        ${newValue.event_time}   ${newValue.event_description}
                                    </div>
                                    <div class="myEventBtn" id="${newValue.ID}" data-date="${action}">
                                        Trinti
                                    </div>
                                </div>`
                            }
                            allEvens.innerHTML = HTML;
                        }
                    } else {
                        HTML = "";
                        allEvens.innerHTML = HTML;
                    }
 
                    let deleteBtn = document.querySelectorAll(".myEventBtn");
 
                    for (let j = 0; j < deleteBtn.length; j++) {
 
                        deleteBtn[j].addEventListener(
                            "click",
                            e => {
                                let action = deleteBtn[j].dataset.date;
                                let id = deleteBtn[j].id;
                                call.deleteEvent(id, action);
                            }
                        )
                    };
                }
            }).catch(function (error) {
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
 
    deleteEvent(id, action) {
        axios
            .post(
                this.uri + this.path +
                "calendar-delete-admin&id=" + id, {
                eventID: id,
            }).then(function (response) {
                if (response.status == 200 && response.statusText == 'OK') {
                    const data = response.data.allData;
                    let dayEvents = document.querySelectorAll(".daysEvent");
 
                    let keys = [];
 
                    for (let key in data) {
                        keys.push(key);
                    }
                    let counter = 0;
 
                    for (let i = 0; i < dayEvents.length; i++) {
                        for (let j = 0; j < keys.length; j++) {
 
                            if (data[keys[j]].event_date == action) {
                                counter++
                            }
                            if (counter < 1 &&
                                action == dayEvents[i].dataset.date) {
                                dayEvents[i].classList.remove("daysEvent");
                            }
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err instanceof TypeError);
            });
        return setTimeout(() => { this.renderEvents(action); }, 500);
    }
 
    getData() {
        axios.post(
            this.uri + this.path +
            'calendar-create-admin', {}
        )
            .then(function (response) {
 
                if (response.status == 200 && response.statusText == 'OK') {
                    const data = response.data.allData;
                    let dayEvents = document.querySelectorAll(".cview--date");
                    let keys = [];
 
                    for (let key in data) {
                        keys.push(key);
                    }
 
                    for (let i = 0; i < dayEvents.length; i++) {
                        for (let j = 0; j < keys.length; j++) {
                            if (data[keys[j]].event_date == dayEvents[i].dataset.date &&
                                "cview--date today" != dayEvents[i].className) {
                                dayEvents[i].classList.add("daysEvent");
                            }
                        }
                    }
                }
            }).catch(function (error) {
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
}
 
export default Calendar;