<?php

use BIT\app\App;
?>

<div class='tagCreate grid-container'>
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

        <table>
            <th>Pavadinimas</th>
            <th>Id</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Veiksmai</th>
            <?php

            $pageNum = 1;
            for ($page = 1; $page <= $pages; $page++) {

                $nav .= '&nbsp <a class="paging" id = "' . $page . ' ">' . $page . '</a> ';
                $next = '<a class="paging" id = "' . $nextpage . ' ">>[Next]</a>';
                $prev = '<a class="paging" id = "' . $prevpage . ' ">[Prev]<</a>';
                $last = '<a class="paging" id = "' . $lastpage . ' ">[Last]</a>';
                $first = '<a class="paging" id = "' . $firstpage . ' ">[First]</a>';
            }

            ?>
            <div class='selectPages sm-1-2'>
                <label for="items">Rodyti puslapyje:</label>
                <select name="items" id="items">
                    <option value="5">5</option>
                    <option value="7">7</option>
                </select>
                <div class="buttons">
                    <button type="submit" id="selectpage" class="btn-blue">Rinktis</button>
                </div>
            </div>


            <?php

            echo '<div class = "page">';
            echo $first . $prev . $nav . $next . $last;
            echo '</div>';


            // The "back" link
            // $prevlink = ($page > 1) ? '<a href="?page=1" title="First page">&laquo;</a> <a href="?page=tag&paged=' . ($page - 1) . '" title="Previous page">&lsaquo;</a>' : '<span class="disabled">&laquo;</span> <span class="disabled">&lsaquo;</span>';

            // // The "forward" link
            // $nextlink = ($page < $pages) ? '<a class = "paging" id = "' . ($page + 1) . '" href="?page=tag&paged=' . ($page + 1) . '" title="Next page">&rsaquo;</a> <a href="?page=tag&paged=' . $pages . '" title="Last page">&raquo;</a>' : '<span class="disabled">&rsaquo;</span> <span class="disabled">&raquo;</span>';

            // // Display the paging information
            // echo '<div id="paging"><p>', $prevlink, ' Page', $page, ' of ', $pages, ' pages, displaying', $start, '-', $end, ' of ', $total, ' results', $nextlink, ' </p></div>';

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
</div>