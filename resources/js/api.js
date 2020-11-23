"use strict";

class Api {
    constructor() {
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
    }

    delete(id, api) {

        axios
            .post(
                this.uri + this.path +
                api + id,
                {
                    deleteId: id,
                }
            )

            .catch(function (error) {
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

    save(id, api) {

        axios
            .post(
                this.uri + this.path + api,
                {
                    id: id,
                }
            )

            .catch(function (error) {
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

    saveContent(api, id, content) {

        axios
            .post(
                this.uri + this.path + api,
                {
                    id: id,
                    content: content,
                }
            )

            .catch(function (error) {
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

    formDataApi(obj) {

        let formData = new FormData();
        if (obj.api) {
            if (obj.postTitle) {
                formData.append('postTitle', obj.postTitle);
            }
            if (obj.content) {
                formData.append('content', obj.content);
            }
            if (obj.alt) {
                formData.append('altText', obj.alt);
            }
            if (obj.imageTitle) {
                formData.append('imageTitle', obj.imageTitle);
            }
            if (obj.image) {
                formData.append('image', obj.image);
            }
            console.log(Object.fromEntries(formData))
            axios.post(this.uri + this.path + obj.api, formData, {

            }).then(function (response) {
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
        } else {
            throw 'can not find API';
        }

    }
}

export default Api;