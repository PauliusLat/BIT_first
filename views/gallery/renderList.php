<?php

use BIT\app\Attachment;

foreach ($html as $album) : ?>
    <div class="albumList sm-7-24">
<?php _d($album->profileImgId) ?>
        <?php $profileImg = Attachment::get($album->profileImgId); ?>

        <div class="parentAlbum ">
            <div class="imageAlbum ">
                <img src="<?= $profileImg->getUrl(); ?>" alt="<?= $profileImg->getAlt(); ?>">
            </div>
            <div class="1">
                <?= $album->post_date; ?>
            </div>
            <h1 class="albumTitle">
                <?= $album->post_title; ?>
            </h1>
            <div class="albumButtons">
                <div class="btn-red btnAlbum deleteAlbum" id="<?= $album->ID; ?>">
                    Trinti
                </div>
                <form action=" <?= $uri ?>&id=<?= $album->ID ?>" method="post">
                    <button class="btn-blue albumEdit" type="submit" name="edit" value="<?= $album->ID ?>">
                        Redaguoti
                    </button>
                </form>
            </div>
        </div>
    </div>
<?php endforeach; ?>