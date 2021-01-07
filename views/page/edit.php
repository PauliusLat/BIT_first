<div class=" class='catCreate grid-container'">
    <div class="sm-1-2">
        <h2 class='tcp'>Koreguokite puslapį</h2>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio antraštę</label>
        </div>
        <input type="text" name="page_title" id="page_title" value="<?= $page->post_title ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio adresą</label>
        </div>
        <input type="text" name="page_name" id="page_name" value="<?= $page->post_name ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Pasirinkite kitą post'o tipą</label>
        </div>
        <select class="form-control" name="post-type" id="post">
            <?php

            // $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
            if ($post_types) {
            ?>
                <option value="<?= $shortcode ?>" selected><?= $shortcode ?></option>>
                <?php
                foreach ($post_types as $post => $args) {
                ?>
                    <option value="<?= $post ?>"><?= $post ?></option>
            <?php
                }
            }
            ?>
        </select>

        <div class='label'>
            <label class="tcp-label">Pasirinkite kitą puslapio rūšį</label>
        </div>

        <select class="form-control" name="page-state" id="pageState">
            <?php

            if ($menu_page_state) {
            ?>
                <option value="<?= $page->pageState[1] ?>" selected><?= $page->pageState[1] ?></option>>
                <?php
                foreach ($menu_page_state as $page => $args) {
                ?>
                    <option value="<?= $args ?>"><?= $args ?></option>
            <?php
                }
            }
            ?>
        </select>
        <div class="buttons">
            <button class="pageUpdateBtn btn-blue" type="submit" id="pageUpdate" value=" <?= $ID ?>">Pakeisti</button>
        </div>
    </div>
</div>