<div class="gallerGrid">
    <?php foreach ($data as $value): ?>
        <div class="">
        <?php foreach ($value->attachments as $key => $img): ?>
            <img class="uploadeImageGallery" src="<?=$img->getUrl();?>" alt="">
        <?php endforeach;?>
        </div>
    <?php endforeach;?>
</div>