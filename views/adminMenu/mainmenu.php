<?php

use BIT\app\Page;
use BIT\app\App;

$app = App::start();
?>

<div class="innermenu" id="menuStart2">
    <h1 class="menu main" id="<?= $menu->ID ?>">
        Koreguokite pagrindinį Meniu
    </h1>
    <div class="sm-1-1 menuMessage">
        <?php
        if ($message) {
        ?>
            <div class='message'><?= $message ?></div>
        <?php
        } else {
        ?>
            <div class='success_message'><?= $success_message ?></div>
        <?php
        }
        ?>
    </div>

    <div class="cont sm-17-24">
        <?php
        foreach ($menu->menuElements as $index => $menuElement) {
        ?>
            <div class="draggable parent" id="addDrag" draggable="true">
                <?php
                $wpPage = Page::get($menuElement['page_ID']);
                if ($wpPage) {
                    $link = $wpPage->getLink();
                    $name = $menuElement['menu_name'];
                }
                ?>
                <div class="menuName">
                    <label for="">
                    </label>
                    <input name="menu" class="menuText menu" placeholder="Pavadinimas" value='<?= $name ?>' type="text" required>
                </div>

                <div class="menuSelect">
                    <label for="standard-select">
                    </label>
                    <select class="select-css mainSelect" id="standard-select">
                        <?php
                        foreach ($pages as $page) {
                        ?>
                            <option id="<?= $page->ID ?>" value="<?= $link ?>" <?= $wpPage->ID == $page->ID ? 'selected = "selected"' : ''; ?>><?= $page->post_title ?></option>
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

                <div class="manuDelete">
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

            <?php
            if ($menuElement['submenus']) {
                foreach ($menuElement['submenus'] as $key => $subMenuElement) {
            ?>
                    <div class="draggable submenu" id="addDrag" draggable="true">
                        <?php
                        $wpPage = Page::get($subMenuElement['page_ID']);
                        $sublink = $wpPage->getLink();
                        $subname = $subMenuElement['menu_name'];
                        ?>
                        <div class="menuName">
                            <label for="">
                            </label>
                            <input name="menu" class="menuText menu" value='<?= $subname ?>' placeholder="Pavadinimas" type="text">
                        </div>
                        <div class="menuSelect">
                            <label for="standard-select">
                            </label>
                            <select class="select-css mainSelect" id="standard-select">
                                <?php
                                foreach ($pages as $page) {
                                ?>
                                    <option id="<?= $page->ID ?>" value="<?= $link ?>" <?= $wpPage->ID == $page->ID ? 'selected = "selected"' : ''; ?>><?= $page->post_title ?></option>
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

                        <div class="manuDelete">
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
            <?php
                }
            }
            ?>
        <?php
        }
        ?>

    </div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">
        <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/plus.svg')) ?>
        <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/menu_delete.svg')) ?>
        <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/menu_drag.svg')) ?>
        <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/save.svg')) ?>
    </svg>