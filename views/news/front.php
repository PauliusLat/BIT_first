<?php

use BIT\app\Page;

?>

<div class="sm-3-4 al">
    <div class="news">
        NAUJIENOS
    </div>

    <?php
    // $pageNum = 1;
    // $nav = '';
    // for ($page = 1; $page <= $pages; $page++) {

    //     $nav .= '&nbsp <a class=" paging nr-' . $page . '" id = "' . $page . ' ">' . $page . '</a> ';
    //     $next = '&nbsp<a class="paging" id = "' . $nextpage . ' ">></a>';
    //     $prev = '<a class="paging" id = "' . $prevpage . ' "><</a>';
    //     $last = '<a class="paging" id = "' . $lastpage . ' "> &nbsp>> </a>';
    //     $first = '<a class="paging" id = "' . $firstpage . ' "><<&nbsp</a>';
    // }

    ?>
    <!-- <div class='selectPages sm-1-2'>
        <label for="items">Rodyti puslapyje:</label>
        <select name="items" id="items">
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="10">10</option>
        </select>
    </div> -->


    <?php
    // echo '<div class = "page">';
    // echo $first . $prev . $nav . $next . $last;
    // echo '</div>';
    ?>




    <?php foreach ($html as $news) : ?>
        <div class="postConteiner">
            <h1 class="postTitle">
                <a href="<?= Page::get($news->post_parent)->getLink(); ?>"> <?= $news->post_title; ?></a>
            </h1>
            <?php $allImages = $news->attachments; ?>
            <?php foreach ($allImages as $image) : ?>
                <div class="postImage">
                    <img src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
                </div>
            <?php endforeach; ?>
            <div class="postContent">
                <?= $news->news_content; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>