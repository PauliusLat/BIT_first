<!-- <div class="admin-category-div-first" >
        <input type="hidden" name="news_new" value="new news">
        <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=category_update&id=<?= $category->term_id ?>" method="post" enctype="multipart/form-data">
            <div class="admin-event-form-group">
               
                <label class="admin-label">Įveskite naują kategorijos pavadinimą</label><br>
                <input type="text" name="category-name" id="category-name" value="<?= $category->name ?>" placeholder="Įrašykite kategorijos pavadinimą..." class="admin-input"><br><br>
                <label class="admin-label">Įveskite naują kategorijos 'slug'</label><br>
                <input type="text" name="category-slug" id="category-slug" value="<?= $category->slug ?>" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                <label class="admin-label">'Pasirinkite naują 'tėvinę' kategoriją</label><br>
                <select class="form-control" name = "tevines-kategorijos"> -->
<?php
// foreach ($categories as $cat){
// echo '<option value = "'.$cat->name.'">'.$cat->name.'</option>';
// }
?>
<!-- </select><br><br>
                <label class="admin-label">Įveskite naują kategorijos aprašymą</label><br>
                <input type="textarea" name="category-description" id="category-description" value="<?= $category->description ?>" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                 -->
<?php
// $category->image = get_term_meta($category->term_id, "my_term_key");
// $url = $app->apiUrl.'/resources/img/';
?>
<br>

<!-- <img style = "width: 200px; height: 200px; object-fit: cover;" src="<?= $url . $category->image[0] ?>"> -->

<!-- Padaryti veikianciu su JS -->
<!-- <button type="submit" id="edit" class="admin-event-button">Ištrinti nuotrauką</button><br><br> 

                <label class="admin-label">Pasirinkite naują kategorijos nuotrauką</label><br>
                Your Photo: <input type="file" name="picture" size="25"/><br><br>
                
                <div class="admin-event-buttons">
                    <button type="submit" id="edit" class="admin-event-button">Pakeisti</button>
                </div>
            </div>
        </form>
    </div> 
<br> -->