"use strict";

class Api {
    constructor() {
        this.path = WPURLS.apiUrl;
        this.html = null;
        this.isRespose = false;
    }

    async delete(api, id) {
        try {
            let response = await axios.post(this.path + api + id, { deleteId: id, })
            if (response.status == 200 && response.statusText == "OK") {
                return response;
            }
        } catch (e) {
            console.error(e);
            console.log("Data from the server is not available !!!");
        }
    }

    async getDAta(api) {
        try {
            let response = await axios.post(this.path + api,)
            if (response.status == 200 && response.statusText == "OK") {
                return response.data.html;
            }
        } catch (e) {
            console.error(e);
            console.log("Data from the server is not available !!!");
        }
    }

    saveContent(api, id, content) {
        axios
            .post(
                this.path + api,
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
                console.log("Data from the server is not available !!!");
            });
    }

    formDataApi(obj) {
        let formData = new FormData();
        if (obj.api) {
            for (var key in obj) {
                formData.append(key, obj[key])
            }
            // console.log(Object.fromEntries(formData))
            axios.post(this.path + obj.api, formData, {}).then(function (response) {

            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); s
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                    console.log("Data from the server is not available !!!");
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
                let response = await axios.post(this.path + obj.api, formData, {});

                if (response.status == 200 && response.statusText == "OK") {
                    return await response.data.html;
                }
            } catch (e) {
                console.error(e);
                console.log("Data from the server is not available !!!");
            }
        } else {
            throw 'can not find API';
        }
    }

    async getResponseData(obj) {
        if (obj.api) {
            try {
                let formData = new FormData();
                for (var key in obj) {
                    formData.append(key, obj[key])
                }
                // console.log(Object.fromEntries(formData))
                let response = await axios.post(this.path + obj.api, formData, {});

                if (response.status == 200 && response.statusText == "OK") {
                    return await response;
                }
            } catch (e) {
                console.error(e);
                console.log("Data from the server is not available !!!");
            }
        } else {
            throw 'can not find API';
        }
    }
}

export default Api;