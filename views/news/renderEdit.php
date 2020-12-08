

<div class="0">
    <div class="1">
        <?= $data->post_date; ?>
    </div>
    <h1 class="2">
        <?= $data->post_title; ?>
    </h1>
    <?php $allImages = $data->attachments; ?>
    <?php foreach ($allImages as $image) : ?>
        <div class="3">
            <div class="4">
                <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
            </div>
        </div>
    <?php endforeach; ?>
    <div id="editor" name="newsEditor">
        <?= $data->news_content; ?>
    </div>
    <div class="btn-green btnNews save" id="<?= $news->ID; ?>">
        Saugoti
    </div>
</div>

