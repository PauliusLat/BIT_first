<div>
    <?php foreach ($data as $value) : ?>
        <div>
            <?= $value->post_title; ?>
        </div>
        <?php foreach ($value->attachments as $key => $img) : ?>
            <div class="galleryContainer">
                <div class="gallerGrid">
                    <img class="uploadeImageGallery galleryCell" src="<?= $img->getUrl(); ?>" alt="">
                </div>
            </div>

        <?php endforeach; ?>
    <?php endforeach; ?>
</div>