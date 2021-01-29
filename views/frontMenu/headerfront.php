<?php

use BIT\app\Query;
use BIT\app\FrontMenu;
use BIT\app\coreExeptions\NotSetException;

$menus = FrontMenu::all()->all();
if ($menus) {
    $menu = reset($menus);
    foreach (range((count($menu->names) - 1), 0) as $index) : ?>
        <div class='dropdown'>
            <a class="dropbtn" href="<?= $menu->pageLinks[$index] ?>"><?= $menu->names[$index] ?></a>
        </div>
<?php endforeach;
} else {
    throw new NotSetException('Pagrindinis meniu nesukurtas');
}
