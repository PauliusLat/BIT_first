<?php
// use BIT\app\App;
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
<form action="http://localhost:8080/wordpress/wp-content/plugins/BIT_first/api/?route=category_store" method="post" enctype="multipart/form-data">

	Your Photo: <input type="file" name="derr" size="25" />
	<input type="submit" name="submit" value="Submit" />
</form>

<div class = 'category-container'>

    <div class="admin-category-div-first" >
        <input type="hidden" name="news_new" value="new news">
        <form action="http://localhost:8080/wordpress/wp-content/plugins/BIT_first/api/?route=category_store" method="post" enctype="multipart/form-data">
            <div class="admin-event-form-group">
                <h3>Pridėkite naują kategoriją<h3>
                <label class="admin-label">Kategorijos pavadinimas</label><br>
                <input type="text" name="category-name" id="category-name" value="" placeholder="Įrašykite kategorijos pavadinimą..." class="admin-input"><br><br>
                <label class="admin-label">Kategorijos 'slug'</label><br>
                <input type="text" name="category-slug" id="category-slug" value="" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                <label class="admin-label">'Pasirinkite 'tėvinę' kategoriją</label><br>
                <select class="form-control" name = "tevines-kategorijos">
                    <?php 
                        foreach ($categories as $category){
                        echo '<option value = "'.$category->name.'">'.$category->name.'</option>';
                    }?>
                </select><br><br>
                <label class="admin-label">Kategorijos aprašymas</label><br>
                <input type="textarea" name="category-description" id="category-description" value="" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                
                Your Photo: <input type="file" name="picture" size="25"/><br><br>
                
                <div class="admin-event-buttons">
                    <button type="submit" id="create" class="admin-event-button">Pridėti</button>
                </div>
            </div>
        </form>
    </div> 
<br>

    <div class="admin-category-div">
    <table>
    <tr>
        <th>Pavadinimas</th>
        <th>Aprašymas</th> 
        <th>'Slug'</th>
        <th>'Count'</th>
        <th>Paveiksliukas</th>
    <div>
        <?php
        // _dc($image);
        foreach ($categories as $category) {
            $category->image = get_term_meta(78, "my_term_key");
            _dc($category);
            _dc($category->image);
            // _dc($app);
            // $app = App::start();
            $url = $app->apiUrl.'/resources/img/';
            ?>
                <tr>
                    <td><?=$category->name?></td>
                    <td><?=$category->description?></td>
                    <td><?=$category->slug?></td>
                    <td><?=$category->count?></td>
                    <?php foreach($category->image as $key=>$value){
                        echo '<td><img style = "width: 200px; height: 200px; object-fit: cover;" src="'.$url.$value.'">';
                        echo wp_get_attachment_image ($value);
                    }
                    ?>
                </tr>
        </div>
    <?php
    //   _dc( $_REQUEST);
     
    }
    ?> 
</table>
    </div> 
</div> 
