<?php

use BIT\models\NewsPost;
use BIT\app\Page;

?>

<div>

    <?php foreach ($data as $news) : ?>
        <a href="<?= Page::get($news->ID)->getLink(); ?>"> <?= $news->post_title; ?></a>
        <div class="1">
            <?= $news->post_date; ?>
        </div>
        <h1 class="2">
            <?= $news->post_title; ?>
        </h1>
        <?php $allImages = $news->attachments; ?>
        <?php foreach ($allImages as $image) : ?>
            <div>
                <img src="<?= $image->getUrl(); ?>" alt="<?=$image->getAlt(); ?>">
            </div>
        <?php endforeach; ?>
        <div class="3">
            <?= $news->news_content; ?>
        </div>
        <div class="4">

        </div>
        <!-- <div>
            <a href="http://localhost/wordpress/
        </div> -->
    <?php endforeach; ?>
</div>