"use strict";

import axios from 'axios';
import Api from './api'

class Album {

    constructor(target) {
        this.target = target;
        this.DOM = null;
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
        this.init();
    }

    async init() {
        const DOM = document.querySelector(this.target);
        if (DOM) {
            const container = document.getElementById("galleryContainer");
            const api = 'album-create-admin';
            let axios = new Api;
            let HTML = await axios.getDAta(api);
            container.innerHTML = HTML;
        }

    }
}

export default Album;