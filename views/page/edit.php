<div class=" class='catCreate grid-container'">
    <div class="sm-1-2">
        <h2 class='tcp'>Koreguokite puslapį</h2>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio antraštę</label>
        </div>
        <input type="text" name="page_title" id="page_title" value="<?= $page->post_title ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio adresą ('slug')</label>
        </div>
        <input type="text" name="page_name" id="page_name" value="<?= $page->post_name ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Pasirinkite kitą post'o tipą</label>
        </div>
        <select class="form-control" name="post-type" id="post">s
            <option value="<?= $shortcode ?>" selected><?= $shortcode ?></option>>
            <?php
            foreach ($post_types as $post => $args) : ?>
                <option value="<?= $post ?>"><?= $post ?></option>
            <?php endforeach; ?>
        </select>

        <div class='label'>
            <label class="tcp-label">Pasirinkite kitą puslapio rūšį</label>
        </div>

        <?php foreach ($menu_page_state as $value) :
            $turi = false;
            foreach ($page->pageState as $state) :
                if ($state == $value) {
                    $turi = true;
                }
            endforeach; ?>
            <input type="checkbox" name="pageState" value="<?= $value ?>" <?= $turi ? 'checked' : '' ?>>
            <label for="pageState"> <?= $value ?></label><br><br>
        <?php endforeach; ?>

        <div class="buttons">
            <button class="pageUpdateBtn btn-blue" type="submit" id="pageUpdate" value=" <?= $ID ?>">Pakeisti</button>
        </div>
    </div>
</div>