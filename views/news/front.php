<?php

use BIT\app\Page;

?>

<div class="sm-3-4 al">


    <?php
    $pageNum = 1;
    $nav = '';
    for ($page = 1; $page <= $pages; $page++) {
        $nav .= '&nbsp <a href = "' . $newsLink . '?psl=' . $page . '&showitems=' . $limit . '"  class=" paging nr-' . $page . '" id = "' . $page . ' ">' . $page . '</a> ';
        $next = '&nbsp<a href = "' . $newsLink . '?psl=' . $nextpage . '&showitems=' . $limit . '" class="paging" id = "' . $nextpage . ' ">></a>';
        $prev = '<a href = "' . $newsLink . '?psl=' . $prevpage . '&showitems=' . $limit . '" class="paging" id = "' . $prevpage . ' "><</a>';
        $last = '<a href = "' . $newsLink . '?psl=' . $lastpage . '&showitems=' . $limit . '" class="paging" id = "' . $lastpage . ' "> &nbsp>> </a>';
        $first = '<a href = "' . $newsLink . '?psl=' . $firstpage . '&showitems=' . $limit . '" class="paging" id = "' . $firstpage . ' "><<&nbsp</a>';
    }
    ?>
    <form name="myform" action="" method='get'>
        <div class='selectPages sm-1-2'>
            <label for="showitems">Rodyti puslapyje:</label>
            <!-- <select name="showitems" id="items"> -->
            <select onchange="myform.submit()" name="showitems">
                <option value="5" <?= $limit == '5' ? 'selected = "selected"' : ''; ?>>5</option>
                <option value="7" <?= $limit == '7' ? 'selected = "selected"' : ''; ?>>7</option>
                <option value="8" <?= $limit == '8' ? 'selected = "selected"' : ''; ?>>8</option>
                <option value="10" <?= $limit == '10' ? 'selected = "selected"' : ''; ?>>10</option>
            </select>
        </div>
        <form>

            <?php
            echo '<div class = "page front" name = "page">';
            echo $first . $prev . $nav . $next . $last;
            echo '</div>';
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