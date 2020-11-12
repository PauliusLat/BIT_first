<div class="admin-page-div-first" >
    <div class="admin-page-form-group">
        <h3>Pridėkite naują 'page'ą'<h3>
        <label class="admin-label">Įveskite naują 'page'o' pavadinimą</label><br>
        <input type="text" name="page_name" id="page_name" value="<?=$page->post_title?>" placeholder="Įrašykite page'o pavadinimą..." class="admin-input"><br><br>
        <div class="admin-event-buttons">
            <button class = "pageUpdateBtn" type="submit" id="pageUpdate" value = "<?=$page->ID?>">Pakeisti</button>
        </div>
    </div>
</div>