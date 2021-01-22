<?php

use BIT\app\Page;

?>

<div class="sm-3-4 al">


    <?php
// _dc($limit);
$pageNum = 1;
$nav = '';
for ($page = 1; $page <= $pages; $page++) {
	$nav .= '&nbsp <a href = "http://localhost:8080/wordpress/naujienos/?page=' . $page . '"  class=" paging nr-' . $page . '" id = "' . $page . ' ">' . $page . '</a> ';
	//$nav .= '&nbsp <a href = "' . get_site_url() .  '/' . 'naujienos' . '"  name = "page" class=" paging nr-' . $page . '" id = "' . $page . ' ">' . $page . '</a> ';
	$next = '&nbsp<a class="paging" id = "' . $nextpage . ' ">></a>';
	$prev = '<a class="paging" id = "' . $prevpage . ' "><</a>';
	$last = '<a class="paging" id = "' . $lastpage . ' "> &nbsp>> </a>';
	$first = '<a class="paging" id = "' . $firstpage . ' "><<&nbsp</a>';
}
?>
    <div class="news">
        NAUJIENOS
    </div>
    <form action="" method='get'>
        <div class='selectPages sm-1-2'>
            <label for="items">Rodyti puslapyje:</label>
            <select name="items" id="items">
                <option selected value="<?=$limit?>"><?=$limit?></option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="admin-event-buttons">
            <button type="submit" id="create" class="admin-event-button">Pridėti</button>
        </div>
        <form>

            <?php
echo '<div class = "page" name = "page">';
echo $first . $prev . $nav . $next . $last;
echo '</div>';
?>

            <?php foreach ($html as $news): ?>
                <div class="postConteiner">
                    <h1 class="postTitle">
                        <a href="<?=Page::get($news->post_parent)->getLink();?>"> <?=$news->post_title;?></a>
                    </h1>
                    <?php $allImages = $news->attachments;?>
                    <?php foreach ($allImages as $image): ?>
                        <div class="postImage">
                            <img src="<?=$image->getUrl();?>" alt="<?=$image->getAlt();?>">
                        </div>
                    <?php endforeach;?>
                    <div class="postContent">
                        <?=$news->news_content;?>
                    </div>
                </div>
            <?php endforeach;?>
</div>