<div class=" class='catCreate grid-container'">
    <div class="sm-1-2">
        <h2 class='tcp'>Pridėkite naują puslapį</h2>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio antraštę</label>
        </div>
        <input type="text" name="page_title" id="page_title" value="<?= $page->post_title ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio pavadinimą</label>
        </div>
        <input type="text" name="page_name" id="page_name" value="<?= $page->post_name ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class="buttons">
            <button class="pageUpdateBtn btn-blue" type="submit" id="pageUpdate" value="<?= $page->ID ?>">Pakeisti</button>
        </div>
    </div>
</div>