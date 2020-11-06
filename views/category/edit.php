<div class="admin-tag-div-first" >
    <div class="admin-tag-form-group">
        <h3>Koreguokite kategoriją<h3>
        <label class="admin-label">Įveskite naują kategorijos pavadinimą</label><br>
        <input type="text" name="category_name" id="category_name" value="<?=$category->name?>" placeholder="Įrašykite kategorijos pavadinimą..." class="admin-input"><br><br>
        <label class="admin-label">Kategorijos 'slug'</label><br>
                <input type="text" name="category_slug" id="category_slug" value="<?=$category->slug?>" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                <label class="admin-label">Kategorijos aprašymas</label><br>
                <input type="textarea" name="category_description" id="category_description" value="<?=$category->description?>" placeholder="Įrašykite kategorijos aprašymą..." class="admin-input"><br><br>
        <div class="admin-event-buttons">
            <button class = "catUpdateBtn" type="submit" id="catUpdate" value = "<?=$category->term_id?>">Pakeisti</button>
        </div>
    </div>
</div>