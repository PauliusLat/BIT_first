<!-- 

<style>
    .collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

/* Style the collapsible content. Note: hidden by default */
.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
<script>
    var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>

<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

</style>
<div class="main_news_container" id="startNewsAdmin">
    <div class="news-container">
        <div class="news-title">
            <h1>
                NAUJA NAUJIENA
            </h1>
        </div>
        <div class="news-add">
            <form action="http://localhost/wordpress/wp-admin/admin.php?page=news_store&id=" method="post" enctype="multipart/form-data">
                <input type="file" name="newsImg">

                    <div id="editor">   
                    </div>

                <input class="uplodeBtn" type="button" id="addNews" value='Sukurti'>
            </form>
        </div>
    </div>
</div>

<script>
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
</script> -->
