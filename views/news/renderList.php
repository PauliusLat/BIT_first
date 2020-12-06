
<?php

use BIT\app\Page;

?>

<?php foreach ($html as $news) : ?>
    <div class="newsList">
        <div class="1">
            <?= $news->post_date; ?>
        </div>
        <h1 class="newsTitle">
            <?= $news->post_title; ?>
        </h1>
        <?php $allImages = $news->attachments; ?>
        <?php foreach ($allImages as $image) : ?>
        <div class="parentNews">
            <div class="imageNews">
                <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
            </div>
            <?php endforeach; ?>
            <div class="contentNews">
                <?= $news->news_content; ?>
            </div>
            <div class="newsButtons">
                <div class="btn-red btnNews deleteNews" id="<?= $news->ID; ?>">
                    Trinti
                </div>
                <div class="btn-blue btnNews edit" id="<?= $news->ID; ?>">
                    Redaguoti
                </div>
                <div class="btn-green btnNews save" id="<?= $news->ID; ?>">
                    Saugoti
                </div>
            </div>
        </div>
    </div>
<?php endforeach; ?>
<div class="editStart">
</div>