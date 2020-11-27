<?php

use BIT\app\Page;

?>

<div>
    <?php foreach ($html as $news) : ?>
        <form action=""></form>
        <a href="<?= Page::get($news->post_parent)->getLink(); ?>"> <?= $news->post_title; ?></a>
        <div class="1">
            <?= $news->post_date; ?>
        </div>
        <h1 class="2">
            <?= $news->post_title; ?>
        </h1>
        <?php $allImages = $news->attachments; ?>
        <?php foreach ($allImages as $image) : ?>
            <div>
                <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
            </div>
        <?php endforeach; ?>
        <div class="3">
            <?= $news->news_content; ?>
        </div>
        <div class="4">

        </div>
    <?php endforeach; ?>
</div>