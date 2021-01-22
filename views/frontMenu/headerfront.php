<!DOCTYPE html>
<!-- <div class="navMenu show"> -->
<!-- <div class="navFront"> -->
<?php

foreach (range((count($menu->names) - 1), 0) as $index): ?>
    <div class='dropdown'>
        <a class="dropbtn" href="<?=$menu->pageLinks[$index]?>"><?=$menu->names[$index]?></a>
        <?php
if (count($menu->subnames[$index]) != 0) {
	?>
            <div class="dropdown-content">
                <?php
foreach ($menu->subnames[$index] as $key => $subindex): ?>
                    <a href="<?=$menu->subpageLinks[$index][$key]?>"><?=$menu->subnames[$index][$key]?></a>
                <?php endforeach;?>
            </div>
        <?php
}
?>
    </div>
<?php endforeach;?>

<!-- <div class='dropdown'> -->
<!-- <a class='dropbtn' href="#">KONTAKTAI</a> -->
<!-- <a href="#" class="dropbtn">KONTAKTAI</a>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div> -->
<!-- <a href="#">FILOSOFIJA</a>
                    <a href="#">TAISYKLĖS</a>
                    <a href="http://localhost/wordpress/idejos/">IDĖJOS</a>
                    <a href="http://localhost/wordpress/kalendorius/">KALENDORIUS</a>
                    <a href="http://localhost/wordpress/galerija/">GALERIJA</a>
                    <a href="http://localhost/wordpress/naujienos/">NAUJIENOS</a> -->
<!-- </div> -->