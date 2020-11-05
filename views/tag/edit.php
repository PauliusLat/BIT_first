<div class="admin-tag-div-first" >
    <div class="admin-tag-form-group">
        <h3>Pridėkite naują 'tag'ą'<h3>
        <label class="admin-label">Įveskite naują 'Tag'o' pavadinimą</label><br>
        <input type="text" name="tag_name" id="tag_name" value="<?=$tag->name?>" placeholder="Įrašykite tag'o pavadinimą..." class="admin-input"><br><br>
        <label class="admin-label">'Tag'o' 'slug'</label><br>
                <input type="text" name="tag_slug" id="tag_slug" value="<?=$tag->slug?>" placeholder="Įrašykite tag'o slug..." class="admin-input"><br><br>
                <label class="admin-label">'Tag'o' aprašymas</label><br>
                <input type="textarea" name="tag_description" id="tag_description" value="<?=$tag->description?>" placeholder="Įrašykite tag'o aprašymą..." class="admin-input"><br><br>
        <div class="admin-event-buttons">
            <button class = "tagUpdateBtn" type="submit" id="tagUpdate" value = "<?=$tag->term_id?>">Pakeisti</button>
        </div>
    </div>
</div>