<?php

$counter = 0;
?>

<div class="albums wrapper">
    <?php foreach ($data as $album): ?>
    	<?php $counter++?>
        <?php if ($counter == 4) {
	break;
}
?>
        <div class="galleryImage box">
            <img src="<?=$album->getProfileImage() ? $album->getProfileImage()->getUrl() : ''?>"
            alt="<?=$album->getProfileImage() ? $album->getProfileImage()->getAlt() : ''?>">
            <div><?=$album->post_date;?></div>
            <a href="<?=$album->getpage()->getLink();?>"><?=$album->post_title;?></a>
        </div>
    <?php endforeach;?>
</div>