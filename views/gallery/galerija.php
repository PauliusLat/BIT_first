<div class="galleryContainer" id="loadeGallery">
    <div id="message">
    </div>
    <input type="file" id='files' name="img" multiple accept="image/*">
    <input type="button" id="submitImg" value='Upload'>
    <output id='result' />
</div>
<div></div>

<script language='javascript'>
    const uri = document.location.origin;

    window.onload = function() {
        //Check File API support
        if (window.File && window.FileList && window.FileReader) {

            let filesInput = document.getElementById("files");

            filesInput.addEventListener("change", function(event) {
                let files = event.target.files;

                const output = document.getElementById("result");

                for (let i = 0; i < files.length; i++) {

                    let file = files[i];

                    if (file.size < 1048576) {

                        if (file.type.match('image')) {

                            const picReader = new FileReader();

                            picReader.addEventListener("load", function(event) {

                                const picFile = event.target;
                                const div = document.createElement("div");
                                div.className = "galleryDiv";

                                div.innerHTML = `<img class="uploadeGallery" src=" ${picFile.result} "
                                  alt=" "/>
                                  <input type="text" id="${file.name}+alt" name="altImage">
                                  <div class="deleteImd" id="${file.name}" >Pasalinti<div/>`;
                                output.insertBefore(div, null);
                                const altText = document.getElementById(file.name + '+alt');

                                const imgDeleteBtn = document.getElementById(file.name);

                                imgDeleteBtn.onclick = function() {
                                    div.innerHTML = `<div></div>`;

                                    return file;
                                }

                                const uploadeImg = document.getElementById("submitImg");
                                uploadeImg.addEventListener('click', function() {
                                    let altTextExport = [];
                                    let altTextValue = altText.value;
                                    altTextExport.push(altTextValue);
                                    sendImageData(file, i, altTextValue);
                                    filesInput.value = null;
                                    altText.value = "";
                                    // window.location.reload();
                                });
                            });
                            picReader.readAsDataURL(file);
                        } else {
                            const currentDiv = document.getElementById("message");
                            const newContent = document.createTextNode("Tai nera paveikslelio tipo formatas");
                            currentDiv.appendChild(newContent);
                        }
                    } else {
                        const currentDiv = document.getElementById("message");
                        const newContent = document.createTextNode("Paveikslelio dydis virsija 1MB, rekomneduojamas dydis yra iki 200kb");
                        currentDiv.appendChild(newContent);
                    }
                }
            });
        } else {
            console.log("Your browser does not support File API");
        }
    }

    // function newFile(file) {
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

        let formData = new FormData();

        formData.append('images[' + i + ']', file,
            'alttext[' + i + ']', altTextValue);
        // console.log('files[' + i + ']', file,
        //     'alttext[' + i + ']', altTextValue)

        axios.post(uri + '/wordpress/wp-content/plugins/BIT_first/api/?route=gallery-create-admin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then(function(response) {

        }).catch(function(error) {
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
</script>