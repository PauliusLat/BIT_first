<div class="gallerGrid">
    <div>
  
    </div>

    <?php foreach ($data as $value): ?>
        <div class="">
        <div>        
        <?= $value->post_title ?>
        </div>
        <?php foreach ($value->attachments as $key => $img): ?>
            <img class="uploadeImageGallery" src="<?=$img->getUrl();?>" alt="">
        <?php endforeach;?>
        </div>
    <?php endforeach;?>
</div>