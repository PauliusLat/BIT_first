<?php

use BIT\app\Page;

?>
<div id="startNweaList">
    <?php foreach ($html as $news) : ?>
        <div class="newsList">
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
                <div class="btn-red deleteNews" id="<?= $news->ID; ?>">
                    Trinti
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>