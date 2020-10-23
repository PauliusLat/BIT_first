<?php

use BIT\models\NewsPost;


    
?>
<style>
.category-container{
    width: 100%;
    display: flex;
}

.admin-category-div-first{
    width: 40%;
}

table {
  font-family: "Montserrat", sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 100px;
}

table td,
table th {
  font-family: "Montserrat", sans-serif;
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  font-family: "Montserrat", sans-serif;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #284646;
  color: white;
}

</style>
    

<!-- //nukreipti i store per action-->


<!-- echo '<br>
            <div class="lenteles">
            <form class="forma" method="POST" action="" enctype="multipart/form-data">
                <input type="hidden" name="news_update" value="update news">
                <input type="hidden" name="news_id" value="' . $post->ID . '">
                <div class="form-group">
                    <label class="admin-label">Data</label><br>
                    <input type="text" name="date" value="' . $metas['date'][0] . '" class="admin-input">
                </div>
                <div class="form-group">
                    <label class="admin-label">Įrašas</label><br>
                    <input type="text" name="record" value="' . $metas['content'][0] . '" class="admin-input">
                </div>
                <div class="mygtukai">
                    <button type="submit" class="admin-button">Redaguoti</button>
                    </form>
                    <form method="POST" action="">
                    <div class="mygtukai">
                            <input type="hidden" name="news_delete" value="news_id">
                            <input type="hidden" name="news_id" value="' . $post->ID . '">
                            <button type="submit" class="admin-button">Trinti</button>
                        </div>
                    </form>
                </div>
        </div>
        <br>';

} -->
<div>
<table>
    <tr>
        <th>Turinys</th>
        <th>Data</th>
        <th>ID</th>
        
    <div>
<?php

$news = NewsPost::all()->all();

foreach($news as $key){
    // _dc($key->ID);
    ?>
    <tr>
                    <td><?=$key->content?></td>
                    <td><?=$key->date?></td>
                    <td><?=$key->ID?></td>
                    <td>
                        <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=news_edit&id=<?=$key->ID?>" method="post"> 
                        <button type="submit" name="edit" value="<?=$key->ID?>">Edit</button> 
                        </form>
                        <form action="" method="post">
                            <input type="hidden" name="ID" value="'<?=$key->ID?>'"readonly>    
                            <button type="submit" name="inesti">Delete</button>
                        </form>
                    <td>
                </tr>
        </div>
    <?php
    }
    ?> 
</table>


</div>
        
            <div class="lenteles">
                <form class="forma" method="POST" action="http://localhost:8080/wordpress/wp-content/plugins/BIT_first/api/?route=news_store" enctype="multipart/form-data">
                    <input type="hidden" name="news_new" value="new news">
                    <div class="form-group">
                        <label class="admin-label">Data</label><br>
                        <input type="text" name="date" value="date" class="admin-input">
                    </div>
                    <div class="form-group">
                        <label class="admin-label">Įrašas</label><br>
                        <input type="text" name="content" value="content" class="admin-input">
                    </div>
</div>
                    <div class="mygtukai">
                        <button type="submit" class="admin-button">Pridėti</button>
                </form>
                    </div>
            </div>
        <br>
     

<!-- 
        <div class="admin-event-div">
        <form class="admin-event-forms" method="POST" action="">
            <input type="hidden" name="event_update" value="update event">
            <input type="hidden" name="event_id" value="' . $post->ID . '">
            <div class="admin-event-form-group">
                <label class="admin-label">Keisti įvykio pavadinimą:</label><br>
                <input class="admin-input" type="text" name="title" value="' . $metas['title'][0] . '">
            </div>
            <div class="admin-event-form-group">
                <label class="admin-label">Redaguoti tekstą:</label><br>
                <input name="text" type="text" class="admin-input" value="' . $metas['text'][0] . '">
            </div>
            <div class="admin-event-form-group">
                <label class="admin-label">Data:</label><br>
                <input class="admin-input" type="datetime-local" value="' . $metas['date'][0] . '" name="date">
            </div>
            <div class="admin-event-buttons">
                <button type="submit" class="admin-event-button">Redaguoti</button>
            </div>
        </form>
        <form method="POST" action="">
            <div class="admin-event-buttons">
                <input type="hidden" name="event_delete" value="event_id">
                <input type="hidden" name="event_id" value="' . $post->ID . '">
                <button type="submit" class="admin-event-button">Trinti</button>
            </div>
        </form>
        <!--<div>
            <select name="cars">
            <option value="' . $metas['title'][0] . '">' . $metas['title'][0] . '</option>
            </select>
        </div>-->
    </div> -->
