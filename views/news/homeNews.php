<?php

use BIT\app\Page;

$counter = 0;
?>

<div class="homeNewsContainer">
    <?php foreach ($html as $news): ?>
        <?php $counter++?>
        <?php if ($counter == 5) {
	break;
}
?>
        <div class="newsInternalContainer">
            <?php $allImages = $news->attachments;?>
            <?php foreach ($allImages as $image): ?>
                <div class="homeNewsImage">
                    <img src="<?=$image->getUrl();?>" alt="<?=$image->getAlt();?>">
                </div>
                <div class="homeNewsDate">
                    <?=$news->post_date;?>
                </div>
                <a href="<?=Page::get($news->post_parent)->getLink();?>"> <?=$news->post_title;?></a>
            <?php endforeach;?>
        </div>
    <?php endforeach;?>
</div>