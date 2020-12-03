<div class="grid-container">
    <div class="sm-1-2">
        <h2 class='tcp'>Koreguokite kategoriją</h2>
        <div class='label'>
            <label class="tcp-label">Įveskite naują kategorijos pavadinimą</label>
        </div>
        <input type="text" name="category_name" id="category_name" value="<?= $category->name ?>" placeholder="Įrašykite kategorijos pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Kategorijos 'slug'</label>
        </div>
        <input type="text" name="category_slug" id="category_slug" value="<?= $category->slug ?>" placeholder="Įrašykite kategorijos slug..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Kategorijos aprašymas</label>
        </div>
        <input type="textarea" name="category_description" id="category_description" value="<?= $category->description ?>" placeholder="Įrašykite kategorijos aprašymą..." class="tcp-input"><br><br>
        <div class="buttons">
            <button class="catUpdateBtn btn-blue" type="submit" id="catUpdate" value="<?= $category->term_id ?>">Pakeisti</button>
        </div>
    </div>
</div>