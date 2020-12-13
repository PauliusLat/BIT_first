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
            for (var key in obj) {
                formData.append(key, obj[key])
            }
            // console.log(Object.fromEntries(formData))
            axios.post(this.uri + this.path + obj.api, formData, {}).then(function (response) { }).catch(function (error) {
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

    async getPostData(obj) {

        if (obj.api) {
            try {
                let formData = new FormData();
                
                for (var key in obj) {
                    formData.append(key, obj[key])
                }
                // console.log(Object.fromEntries(formData))
                let response = await axios.post(this.uri + this.path + obj.api, formData, {});

                if (response.status == 200 && response.statusText == "OK") {
                   
                    return await response.data.html;
                }

            } catch (e) {
                console.error(e);
                console.log("Duomenys is serveverio nepasiekiami !!!");
            }
        }
    }
}

export default Api;