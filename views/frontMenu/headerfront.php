<?php

use BIT\app\Query;
use BIT\app\FrontMenu;

$menus = FrontMenu::all()->all();
$menu = reset($menus);
foreach (range((count($menu->names) - 1), 0) as $index) : ?>
    <div class='dropdown'>
        <a class="dropbtn" href="<?= $menu->pageLinks[$index] ?>"><?= $menu->names[$index] ?></a>
    </div>
<?php endforeach; ?>