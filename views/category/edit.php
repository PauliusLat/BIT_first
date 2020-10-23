
    <div class="admin-category-div-first" >
        <input type="hidden" name="news_new" value="new news">
        <form action="http://localhost:8080/wordpress/wp-content/plugins/BIT_first/api/?route=category_update/<?=$category->term_id?>" method="post" enctype="multipart/form-data">
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