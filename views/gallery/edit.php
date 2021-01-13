<div class="md-4-5 containerAlbumEdit" id="startAlbumEdit">

    <input type="text" name="album_title" value="<?= $data->post_title ?>">
    <img src="<?= $data->getProfileImage()->getUrl() ?>" alt="<?= $data->getProfileImage()->getAlt() ?>">

    <?php foreach ($data->attachments as $attachment) : ?>
        <img src="<?= $attachment->getUrl(); ?>" alt="">
    <?php endforeach; ?>


</div>