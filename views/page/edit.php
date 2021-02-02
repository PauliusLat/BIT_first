<div class="pageCreate grid-container">
    <svg class='close'>
        <use xlink:href="#Capa_1"></use>
    </svg>
    <div class="sm-1">
        <h2 class='tcp'>Koreguokite puslapį</h2>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio antraštę</label>
        </div>
        <input type="text" name="page_title" id="page_title_edit" value="<?= $page->post_title ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Įveskite naują puslapio adresą ('slug')</label>
        </div>
        <input type="text" name="page_name" id="page_name_edit" value="<?= $page->post_name ?>" placeholder="Įrašykite page'o pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Pasirinkite kitą post'o tipą</label>
        </div>
        <select class="form-control" name="post-type" id="post_edit">

            <?php

            foreach ($post_types as $post => $args) : ?>
                <option value="<?= $post ?>" <?= $post == $shortcode ? 'selected = "selected"' : ''; ?>><?= $post ?></option>

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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/cancel.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/menu_delete.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/menu_drag.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/save.svg')) ?>
</svg>