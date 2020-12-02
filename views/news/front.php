<?php

use BIT\app\Page;

?>

<div class="sm-5-8  al wd">
    <div class="news"> 
        NAUJIENOS
    </div>
    <?php foreach ($html as $news) : ?>
        <div class="postConteiner">
            <h1 class="postTitle">
                <a href="<?= Page::get($news->post_parent)->getLink(); ?>"> <?= $news->post_title; ?></a>
            </h1>
            <?php $allImages = $news->attachments; ?>
            <?php foreach ($allImages as $image) : ?>
                <div class="postImage">
                    <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
                </div>
            <?php endforeach; ?>
            <div class="postContent">
                <?= $news->news_content; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>