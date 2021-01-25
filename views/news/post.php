<?php foreach ($news as $key => $new) : ?>
    <?php $att = ($new->attachments) ? $new->attachments[0]->getUrl() : ''; ?>

    <div class="news-box">
        <div class="news-img">
            <img src="<?= $att ?>" alt="">
        </div>
        <div class="news-text">
            <div class="news-date">
                <p><?= $new->post_date ?></p>
            </div>
            <div class="news-content">
                <p><?= $new->post_title ?></p>
            </div>
        </div>
        <div class="news-buttons">
            <button class="newsBtn deleteBtnNews" id="<?= $new->ID ?>">
                Trinti
            </button>
            <button class="newsBtn editBtnNews" id="<?= $new->ID ?>">
                Redaguoti
            </button>
        </div>
    </div>

<?php endforeach;
