<!DOCTYPE html>

<?php


foreach (range((count($menu->names) - 1), 0) as $index) : ?>
    <div class='dropdown'>
        <a class="dropbtn" href="<?= $menu->pageLinks[$index] ?>"><?= $menu->names[$index] ?></a>
    </div>
<?php endforeach; ?>