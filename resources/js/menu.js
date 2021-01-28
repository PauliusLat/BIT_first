"use strict";
import Api from './api';
class Menu {
  constructor(target) {
    this.target = target;
    this.parent;
    this.child;
    this.parentString;
    this.currentElemet;
    this.axios = new Api();
    this.init();
  }

  async init() {
    const DOM = document.querySelector(this.target);
    if (DOM) {
      const menuDB = document.getElementById('menuStart2');

      if (!menuDB) {
        let api = "menu_create";
        let HTML = await this.axios.getDAta(api);

        DOM.innerHTML = HTML;

        const a = document.querySelector('.parent');
        this.parent = document.createRange().createContextualFragment(a.outerHTML).querySelector(".parent");
        let b = document.createRange().createContextualFragment(a.outerHTML).querySelector(".parent");
        b.classList.remove("parent");
        b.classList.add("submenu");
        b.childNodes[7].remove();
        this.child = b;
        this.currentElemet = document.createRange().createContextualFragment(a.outerHTML).querySelector(".addSubmenu");
      }

      this.cloning();
      this.drag();
      this.delete();
      this.store();
      this.addAction();
    }
  }

  addAction() {
    const sub = document.querySelectorAll(".addSubmenu");
    for (let i = 0; i < sub.length; i++) {
      sub[i].addEventListener("click", () => {
        let el = sub[i].parentNode;
        this.createNewElemet(el);
      })
    }
  }

  drag() {
    const draggables = document.querySelectorAll('.draggable')
    const container = document.querySelector('.cont')
    const controlRect = container.getBoundingClientRect().left;

    let start;
    let position;
    let rect;
    let element;
    let addPlusButton;
    let addSub = false;

    draggables.forEach(draggable => {

      draggable.addEventListener('dragstart', e => {
        draggable.classList.add('dragging')
        rect = draggable.getBoundingClientRect();
        start = e.clientX - rect.left;

        let dargEl = [...draggable.childNodes];
        addSub = dargEl.find(n => n.classList == "addSubmenu");
      })
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        if (controlRect + 80 <= (rect.left + position) && addSub) {
          draggable.classList.remove("parent");
          draggable.classList.add("submenu");
          for (let j = 0; j < draggable.childNodes.length; j++) {
            if (draggable.childNodes[j].classList == "addSubmenu") {
              if (element) {
                element.removeEventListener("click", addPlusButton);
              }
              draggable.childNodes[j].remove();
            }
          }
        } else if (controlRect + 80 >= (rect.left + position)) {
          draggable.classList.remove("submenu");
          draggable.classList.add("parent");
          for (let i = 0; i < draggable.childNodes.length; i++) {
            if (draggable.childNodes[i].classList == "menuLinkAdd" &&
              draggable.childNodes.length == 12) {
              const clon = this.currentElemet.cloneNode(true);
              draggable.childNodes[i].insertAdjacentElement('afterend', clon);  ///sukuria add button
              element = draggable.childNodes[6];

              addPlusButton = () => {
                this.createNewElemet(draggable);
              }
              element.addEventListener("click", addPlusButton)
            }
          }
        }
      })
    })

    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      position = e.clientX - controlRect - start;

      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element
    }
  }
  cloning() {

    const element = this.parent;
    if (element) {
      const addParent = document.querySelector(".addNew");
      const container = document.querySelector(".cont");
      let parent = () => {
        const clon = element.cloneNode(true);
        let myObj = new Object;
        myObj.html = clon;
        let el = [...myObj.html.children];
        let addSub = el.find(n => n.classList == "addSubmenu");

        myObj.html.children[3].addEventListener("click", () => {
          if (addSub) {
            let curentEl = myObj.html;
            this.createNewElemet(curentEl)
          }
        })
        container.insertAdjacentElement('beforeend', clon);
        this.delete();
        this.drag();
      }
      addParent.addEventListener("click", parent);

    }
  }
  createNewElemet(el) {
    let subCat = this.child
    const clon = subCat.cloneNode(true);
    el.insertAdjacentElement('afterend', clon);
    this.drag();
    this.delete();
  }
  getID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }
  delete() {
    let id;
    const remove = document.querySelectorAll(".manuDelete");
    for (let i = 0; i < remove.length; i++) {
      id = this.getID();
      remove[i].setAttribute("id", id);
      let removeDiv = document.getElementById(id);
      removeDiv.addEventListener("click", function () {
        let currentDiv = remove[i].parentNode;
        currentDiv.remove();
      })
    }
  }
  store() {
    const save = document.querySelector(".save");

    let obj;

    save.addEventListener("click", () => {
      const menuid = document.querySelector(".menuText").id;
    const api = "menu_store";
    // console.log(menuid);

      const elements = document.querySelectorAll(".draggable");
      const parent = document.querySelectorAll(".parent");
      const child = document.querySelectorAll(".submenu");
      const select = document.querySelectorAll(".mainSelect");
      const text = document.querySelectorAll(".menuText");
      const link = document.querySelectorAll(".menuLink");


      if (!elements || elements[0].className != "draggable parent") {
        alert("Neteisingai suformuotas meniu")
      } else {
        const opts = [...select].map(el => el.options);
        let a = [], b = [], c = [], d = [], e = [];

        parent.forEach(element => element.setAttribute("data", true));
        child.forEach(element => element.setAttribute("data", false));
        for (let i = 0; i < opts.length; i++) {

          a.push(opts[i][opts[i].selectedIndex].text)
          b.push(text[i].value)
          c.push(link[i].value)
          d.push(elements[i].getAttribute('data'))
          e.push(opts[i][opts[i].selectedIndex].value)

          obj = {
            id: menuid,
            api: api,
            all: d,
            select: a,
            text: b,
            textLink: e,
            link: c
          }
        }
        // console.log(obj);
        this.axios.formDataApi(obj);
      }
    })
  }
}

export default Menu;