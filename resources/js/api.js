"use strict";

class Api {
    constructor() {
        this.path = "/wordpress/wp-content/plugins/BIT_first/api/?route=";
        this.uri = document.location.origin;
        this.html = null;
    }

    delete(api, id) {
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

    async getDAta(api) {
        try {
            let response = await axios.post(this.uri + this.path + api,)

            if (response.status == 200 && response.statusText == "OK") {
                return response.data.html;
            }
        } catch (e) {
            console.error(e);
            console.log("Duomenys is serveverio nepasiekiami !!!");
        }
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
            if (obj.title) {
                formData.append('title', obj.title);
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
            if (obj.slug) {
                formData.append('slug', obj.slug);
            }
            if (obj.category) {
                formData.append('category', obj.category);
            }
            if (obj.catTitle) {
                formData.append('catTitle', obj.catTitle);
            }
            if (obj.catContent) {
                formData.append('catContent', obj.catContent);
            }
            if (obj.cat_parent) {
                formData.append('cat_parent', obj.cat_parent);
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