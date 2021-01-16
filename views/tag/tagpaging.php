<?php

use BIT\app\App;
?>

<!-- <div class='tagCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp">Tagai</h1>
    </div>
    <div class="sm-1-2">
        <h2 class='tcp'>Pridėkite naują'tag'ą'</h2>
        <div class='label'>
            <label class="tcp-label">'Tag'o' pavadinimas</label>
        </div>
        <input type="text" name="tag-name" id="tag-name" value="" placeholder="Įrašykite tag'o pavadinimą..." class="tcp-input">
        <div class='label'>
            <label class="tcp-label">'Tag'o''slug'</label>
        </div>
        <input type="text" name="tag-slug" id="tag-slug" value="" placeholder="Įrašykite tag'o slug..." class="tcp-input">
        <div class='label'>
            <label class="tcp-label">'Tag'o' aprašymas</label>
        </div>
        <textarea name="tag-description" id="tag-description" value="" placeholder="Įrašykite tag'o aprašymą..." class="tcp-input"></textarea>
        <div class="buttons">
            <button type="submit" id="create" class="btn-blue">Pridėti</button>
        </div>

    </div>
    <div class="sm-1-2">
        <div class='pages'>
            <?php

            ////////////
            // Find out how many items are in the table
            $total = wp_count_terms('hashtag', ['hide_empty' => false]);
            _dc($total);

            // How many items to list per page
            $limit = 3;

            // How many pages will there be
            $pages = ceil($total / $limit);
            // _dc($pages);

            // What page are we currently on?
            $page = min($pages, filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT, array(
                'options' => array(
                    'default'   => 1,
                    'min_range' => 1,
                ),
            )));

            // Calculate the offset for the query
            $offset = ($page - 1)  * $limit;
            // _dc($offset);

            // Some information to display to the user
            $start = $offset + 1;
            $end = min(($offset + $limit), $total);

            ?>
        </div>

        <table>
            <th>Pavadinimas</th>
            <th>Id</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Veiksmai</th>
            <?php

            $pageNum = 1;
            for ($page = 1; $page <= $total; $page++) {
                // _dc($page);
                // if ($page == $pageNum) {
                //     $nav .= " $page "; // no need to create a link to current page
                // } else {
                $nav .= '&nbsp <a class="paging" id = "' . $page . '" href="?page=tag&paged=' . $page . '">' . $page . '</a> ';
                // }

                // if ($pageNum > 1) {
                //     $page  = $pageNum - 1;
                //     $prev  = " <a href=\"$self?page=$page\">[Prev]</a> ";

                //     $first = " <a href=\"$self?page=1\">[First Page]</a> ";
                // } else {
                //     $prev  = '&nbsp;'; // we're on page one, don't print previous link
                //     $first = '&nbsp;'; // nor the first page link
                // }

                // if ($pageNum < $maxPage) {
                //     $page = $pageNum + 1;
                //     $next = " <a href=\"$self?page=$page\">[Next]</a> ";

                //     $last = " <a href=\"$self?page=$maxPage\">[Last Page]</a> ";
                // } else {
                //     $next = '&nbsp;'; // we're on the last page, don't print next link
                //     $last = '&nbsp;'; // nor the last page link
                // }

                // print the navigation link
                // echo $first . $prev . $nav . $next . $last;

            }
            echo   $nav;
            echo '<br>';
            // echo $first . $prev . $nav . $next . $last;

            // The "back" link
            $prevlink = ($page > 1) ? '<a href="?page=1" title="First page">&laquo;</a> <a href="?page=tag&paged=' . ($page - 1) . '" title="Previous page">&lsaquo;</a>' : '<span class="disabled">&laquo;</span> <span class="disabled">&lsaquo;</span>';

            // The "forward" link
            $nextlink = ($page < $pages) ? '<a class = "paging" id = "' . ($page + 1) . '" href="?page=tag&paged=' . ($page + 1) . '" title="Next page">&rsaquo;</a> <a href="?page=tag&paged=' . $pages . '" title="Last page">&raquo;</a>' : '<span class="disabled">&rsaquo;</span> <span class="disabled">&raquo;</span>';

            // Display the paging information
            echo '<div id="paging"><p>', $prevlink, ' Page', $page, ' of ', $pages, ' pages, displaying', $start, '-', $end, ' of ', $total, ' results', $nextlink, ' </p></div>';

            // echo '<form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=tag&paged=' . ($page + 1) . '" method="post">';
            // $nextlink = ($page < $pages) ? '<input type = "submit" class = "submitLink" title="Next page">&rsaquo;> <a href="http://localhost:8080/wordpress/wp-admin/admin.php?page=tag&paged=' . $pages . '" title="Last page">&raquo;</a>' : '<span class="disabled">&rsaquo;</span> <span class="disabled">&raquo;</span>';
            // $prevlink = ($page > 1) ? '<a href="?page=1" title="First page">&laquo;</a> <a href="http://localhost:8080/wordpress/wp-admin/admin.php?page=tag&paged=' . ($page - 1) . '" title="Previous page">&lsaquo;</a>' : '<span class="disabled">&laquo;</span> <span class="disabled">&lsaquo;</span>';
            // // Display the paging information
            // echo '<div id="paging"><p>', $prevlink, ' Page', $page, ' of ', $pages, ' pages, displaying', $start, '-', $end, ' of ', $total, ' results', $nextlink, ' </p></div>';
            // _dc($request = App::start()->getService('request'));
            // // _dc($request);
            // echo '</form>';


            foreach ($tags as $tag) {
                // _dc($request);
            ?>
                <tr>
                    <td><?= $tag->name ?></td>
                    <td><?= $tag->term_id ?></td>
                    <td><?= $tag->slug ?></td>
                    <td><?= $tag->description ?></td>
                    <td>
                        <button class="tag-edit btn-blue" type="submit" name="tag-name" id="<?= $tag->taxonomy ?>" value="<?= $tag->term_id ?>">Edit</button>
                        <button class="tag-delete btn-red" type="submit" name="tagDelete" id="<?= $tag->taxonomy ?>" value="<?= $tag->term_id ?>">Delete</button>

                    </td>
                </tr>
            <?php
            }
            ?>
        </table>


    </div>
</div> -->