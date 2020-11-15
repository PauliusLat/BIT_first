<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>


<div class="main_news_container" id="startNewsAdmin">
    <div class="news-container">
        
        <button class="collapsible">SUKURTI NAUJIENĄ</button>
        <div class="collapsible-content">
        <div class="news-title">
            <h1>
                NAUJA NAUJIENA
            </h1>
        </div>
        <div class="news-add">
            <input type="file" name="newsImg">
            <div id="editor" name="newsEditor"></div>
            <input class="uplodeBtn" type="button" id="addNews" value='Išsaugoti' enctype="multipart/form-data">
        </div>
        </div>
    </div>
    <br>
    <hr>
    <br>
    <div class="news-container">
        <div class="news-tilte">
            <h1>
                NAUJIENOS
            </h1>
        </div>
        <div class="news-content" id="renderNewsList">
            <!-- render -->
        </div>
    </div>
</div>





<script>
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
</script>