<?php

use BIT\app\App;

$app = App::start();

?>
<div class="innermenu" id="menuStart1">
    <h1 class="menu main" id="">
        Sukurkite pagrindinį Meniu
    </h1>
    <div class="sm-1-1 menuMessage">

    </div>
    <div class="cont sm-17-24">
        <div class="draggable parent" id="addDrag" draggable="true">
            <div class="menuName">
                <label for="">
                </label>
                <input name="menu" class="menuText menu" placeholder="Pavadinimas" type="text">
            </div>
            <div class="menuSelect">
                <label for="standard-select">
                </label>
                <select class="select-css mainSelect" id="standard-select">
                    <option value="" selected>Pasirinkite kategorijos puslapį</option>
                    <?php
                    foreach ($pages as $value) {
                    ?>
                        <option class="option" id="<?= $value->ID ?>" value="<?= $value->getLink() ?>"><?= $value->post_title ?></option>
                    <?php
                    }
                    ?>
                </select>
            </div>
            <div class="menuLinkAdd">
                <label for="link">
                </label>
                <input class="menuLink menuLink" placeholder="Prideti išorinę nuoroda" type="text">
            </div>
            <div class="addSubmenu">
                <svg>
                    <use xlink:href="#plus"></use>
                </svg>
            </div>
            <div class="manuDelete delete">
                <svg>
                    <use xlink:href="#menu_delete"></use>
                </svg>

            </div>
            <div class="menuDrag">
                <svg>
                    <use xlink:href="#menu_drag"></use>
                </svg>
            </div>
        </div>
    </div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/plus.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/menu_delete.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/menu_drag.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/save.svg')) ?>
</svg>