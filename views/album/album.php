<div class="albums" id="albumsWatch">
    <?php
    $pageNum = 1;
    $nav = '';
    for ($page = 1; $page <= $pages; $page++) {
        $nav .= '&nbsp <a class=" paging nr-' . $page . '" id = "' . $page . ' ">' . $page . '</a> ';
        $next = '&nbsp<a class="paging" id = "' . $nextpage . ' ">></a>';
        $prev = '<a class="paging" id = "' . $prevpage . ' "><</a>';
        $last = '<a class="paging" id = "' . $lastpage . ' "> &nbsp>> </a>';
        $first = '<a class="paging" id = "' . $firstpage . ' "><<&nbsp</a>';
    }

    ?>
    <div class='selectPages sm-1-2'>
        <label for="items">Rodyti puslapyje:</label>
        <select name="items" id="items">
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="10">10</option>
        </select>
    </div>

    <?php
    echo '<div class = "page">';
    echo $first . $prev . $nav . $next . $last;
    echo '</div>';

    ?>
    <?php foreach ($data as $album) : ?>
        <div class="galleryImage xl-7-24">
            <img src="<?= $album->getProfileImage() ? $album->getProfileImage()->getUrl() : '' ?>" alt="<?= $album->getProfileImage() ? $album->getProfileImage()->getAlt() : '' ?>">
            <div><?= $album->post_date; ?></div>
            <a href="<?= $album->getpage()->getLink(); ?>"><?= $album->post_title; ?></a>
        </div>
    <?php endforeach; ?>
</div>