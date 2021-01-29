<?php

use BIT\app\FrontMenu;
use BIT\app\Page;
use BIT\app\coreExeptions\NotSetException;

$menus = FrontMenu::all()->all();
if ($menus) {
    $menu = reset($menus);
    foreach (array_reverse($menu->menuElements) as $index => $menuElement) :
        $wpPage = Page::get($menuElement['page_ID']);
        // _dc($wpPage);
        // if ($wpPage) {
        $link = $wpPage->getLink();
        $name = $menuElement['menu_name'];

?>
        <div class='dropdown'>
            <a class="dropbtn" href="<?= $link ?>"><?= $name ?></a>
        </div>
<?php
    // } else {
    //     throw new NotSetException('puslapis nesukurtas');
    // }
    endforeach;
} else {
    throw new NotSetException('Pagrindinis meniu nesukurtas');
}
