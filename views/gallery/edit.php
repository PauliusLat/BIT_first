<div class="sm-23-24 containerAlbumEdit">

    <input class="albumTitle" type="text" name="album_title" value="<?=$data->post_title?>">

    <div class="albumGallery">
        <?php foreach ($data->attachments as $attachment): ?>
            <div class="imgePosition">
                <img src="<?=$attachment->getUrl();?>" alt="">
                <div class="galleryEdit">
                    <div class="btn-red removeBtn" type="submit" id="<?=$attachment->ID;?>" name="album" value="<?=$data->ID;?>">
                        Trinti
                    </div>
                    <label for="checkbox">Pakeisti albumo paveiksleli</label>
                    <input class="checkbox" type="checkbox">
                </div>
            </div>
        <?php endforeach;?>
    </div>
    <div class="btn-blue saveAlbum" data="<?=$data->ID;?>" id="<?=$data->getProfileImage()->ID;?>"> Publikuoti
    </div>
</div>