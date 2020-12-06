<?php

use BIT\app\Page;

$counter = 0;
?>

<?php foreach ($html as $news) : ?>
    <div class="">
        <?= $counter++ ?>
        <div class="1">
            <?= $news->post_date; ?>
        </div>
        <h1 class="2">
            <?= $news->post_title; ?>
        </h1>
        <?php $allImages = $news->attachments; ?>
        <?php foreach ($allImages as $image) : ?>
            <div class="3">
                <div class="4">
                    <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
                </div>
            <?php endforeach; ?>
            <div class="5">
                <?= $news->news_content; ?>
            </div>
            <div class="6">
            </div>
            </div>
    </div>
<?php endforeach; ?>