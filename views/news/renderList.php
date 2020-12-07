
<?php foreach ($html as $news) : ?>
    <div class="newsList">
        <div class="1">
            <?= $news->post_date; ?>
        </div>
        <h1 class="newsTitle">
            <?= $news->post_title; ?>
        </h1>
        <?php $allImages = $news->attachments; ?>
        <?php foreach ($allImages as $image) : ?>
            <div class="parentNews">
                <div class="imageNews">
                    <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
                </div>
            <?php endforeach; ?>
            <div class="contentNews">
                <?= $news->news_content; ?>
            </div>
            <div class="newsButtons">
                <div class="btn-red btnNews deleteNews" id="<?= $news->ID; ?>">
                    Trinti
                </div>
                <form action=" <?= $uri ?>&id=<?= $news->ID; ?>" method="post">
                    <button class="btn-blue btnNews edit" type="submit" name="edit" value="<?= $news->ID ?>">
                        Redaguoti
                    </button>
                </form>
            </div>
            </div>
    </div>
<?php endforeach; ?>