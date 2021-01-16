<div class="albums">
    <?php foreach ($data as $album): ?>
        <div class="galleryImage xl-7-24">
            <img src="<?=$album->getProfileImage() ? $album->getProfileImage()->getUrl() : ''?>"
            alt="<?=$album->getProfileImage() ? $album->getProfileImage()->getAlt() : ''?>">
            <div><?=$album->post_date;?></div>
            <a href="<?=$album->getpage()->getLink();?>"><?=$album->post_title;?></a>
        </div>
    <?php endforeach;?>
</div>