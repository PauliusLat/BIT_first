<div class='tagCreate grid-container'>
    <div class="sm-1">
        <h2 class='tcp'>koreguokite'tag'ą'</h2>
    </div>
    <div class="sm-1-2">
        <div class='label'>
            <label class="tcp-label">Įveskite naują 'tag'o' pavadinimą</label>
        </div>
        <input type="text" name="tag_name" id="tag_name" value="<?= $tag->name ?>" placeholder="Įrašykite tag'o pavadinimą..." class="tcp-input">
        <div class='label'>
            <label class="tcp_label">Įveskite naują 'tag'o''slug'</label>
        </div>
        <input type="text" name="tag_slug" id="tag_slug" value="<?= $tag->slug ?>" placeholder="Įrašykite tag'o slug..." class="tcp-input">
        <div class='label'>
            <label class="tcp-label">Įveskine naują 'tag'o' aprašymas</label>
        </div>
        <textarea name="tag_description" id="tag_description" value="<?= $tag->description ?>" placeholder="Įrašykite tag'o aprašymą..." class="tcp-input"></textarea>
        <div class="buttons">
            <button class="tagUpdateBtn btn-blue" type="submit" id="tagUpdate" value="<?= $tag->term_id ?>">Pakeisti</button>
        </div>
    </div>
</div>