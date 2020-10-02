  <div class="galleryContainer">
      <div id="message">
      </div>
      <input type="file" id='files' name="img[]" multiple accept="image/*">
      <input type="text" id="altText" name="altImage">
      <input type="button" id="submit" value='Upload'>
      <output id='result' />
  </div>
  <div></div>

  <script language='javascript'>
      window.onload = function() {
          //Check File API support
          if (window.File && window.FileList && window.FileReader) {

              const filesInput = document.getElementById("files");

              filesInput.addEventListener("change", function(event) {

                  let files = event.target.files;
                  const output = document.getElementById("result");
                  let count = 0;

                  for (let i = 0; i < files.length; i++) {

                      let file = files[i];

                      if (file.size < 1048576) {

                          if (file.type.match('image')) {

                              const picReader = new FileReader();
                
                              for (let index = 0; index < picReader.length; index++) {
                                  console.log(picReader[index])
                                  const element = picReader[index];
                                  
                              }
                              const altText = document.getElementById("altText");
                              let baseEncode = [];
                              let altTextExport = [];
                             
                              let altTextValue = altText.value;
  
                              picReader.readAsDataURL(file);

                              picReader.addEventListener("load", function(event) {
                                
                                count++;
                                
                                  const picFile = event.target;                                                           
                                  const div = document.createElement("div");

                                  div.innerHTML = `<img class="uploadeGallery" src=" ${picFile.result} "
                                      alt=" ${altTextValue} "/>
                                      <div class="deleteImd" id="${picFile.result}" >Pasalinti<div/>`;
                                  output.insertBefore(div, null);
                                  altText.value = "";

                                  altTextExport.push(altTextValue);
                                  baseEncode.push(event.target.result);  

                              });
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
  </script>