<div class="sm-23-24 containerAlbumEdit">

    <input class="albumTitle" type="text" name="album_title" value="<?= $data->post_title ?>">

    <div class="albumGallery">
        <!-- <div class="imgePosition">
            <img src="<?= $data->getProfileImage()->getUrl() ?>" alt="<?= $data->getProfileImage()->getAlt() ?>">
            <div class="galleryEdit">
                <div class="btn-red removeBtn" id="<?= $data->getProfileImage()->ID; ?>">
                    Trinti
                </div>
                <label for="ceck">Pakeisti albumo paveiksleli</label>
                <input class="checkbox" type="checkbox" >
            </div>
        </div> -->
        <?php foreach ($data->attachments as $attachment) : ?>
            <div class="imgePosition">
                <img src="<?= $attachment->getUrl(); ?>" alt="">
                <div class="galleryEdit">
                    <div class="btn-red removeBtn" id="<?= $attachment->ID; ?>">
                        Trinti
                    </div>
                    <label for="ceck">Pakeisti albumo paveiksleli</label>
                    <input class="checkbox" type="checkbox" >
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="btn-blue saveAlbum" id="<?= $data->getProfileImage()->ID; ?>">
        Publikuoti
    </div>
</div>