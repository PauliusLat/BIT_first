<!DOCTYPE html>
<!-- <div class="navMenu show"> -->
<!-- <div class="navFront"> -->
<?php

// _dc($menu);
foreach (range((count($menu->names) - 1), 0) as $index) : ?>
    <div class='dropdown'>
        <a class="dropbtn" href="<?= $menu->pageLinks[$index] ?>"><?= $menu->names[$index] ?></a>
    </div>
<?php endforeach; ?>