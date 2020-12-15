<div class="gallerGrid">
    <?php foreach ($data as $album): ?>
        <div class="">
       
            
            <img src="<?= $album->getProfileImage()->getUrl(); ?>" alt="<?= $album->getProfileImage()->getAlt(); ?>">
            <a href="<?= $album->getpage()->getLink();?>"><?= $album->post_title;?></a>


            
        </div>
    <?php endforeach;?>
</div>