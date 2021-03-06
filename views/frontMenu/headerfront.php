<?php

use BIT\app\FrontMenu;
use BIT\app\Page;
use BIT\app\coreExeptions\NotSetException;

$menus = FrontMenu::all()->all();
if ($menus) {
    $menu = reset($menus);
    foreach (array_reverse($menu->menuElements) as $index => $menuElement) :
        $wpPage = Page::get($menuElement['page_ID']);
        $link = $wpPage->getLink();
        $name = $menuElement['menu_name'];
?>
        <div class='dropdown'>
            <a class="dropbtn" href="<?= $link ?>"><?= $name ?></a>
        </div>
<?php
    endforeach;
} else {
    throw new NotSetException('Pagrindinis meniu nesukurtas');
}
