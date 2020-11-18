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
        <div class='pages'>
            <?php
            if (get_query_var('paged')) {
                $paged = get_query_var('paged');
            } else if (get_query_var('page')) {
                $paged = get_query_var('page');
            } else {
                $paged = 1;
            }

            $per_page = 10;
            $number_of_series = count(get_terms('hashtag', array('hide_empty' => '0')));
            _dc($number_of_series);

            $offset = ($paged - 1) * $per_page;
            // _dc($offset);

            // Setup the arguments to pass in
            $args = array(
                'offset'       => $offset,
                'number'       => $per_page,
                'hide_empty' => '0'
            );

            // // Gather the series
            $tags = get_terms('hashtag', $args);
            // _dc($tags);

            // Loop through and display the series
            // foreach ($tags as $s) {
            //     $theurl = get_term_link($s, 'hashtag');
            //     echo "<div class=\"ser-img img\" ><a href=\" . $theurl  . “\">" . $s->name . "</a>";
            // }


            echo "<br />";
            $big = 999999;
            // _dc(get_pagenum_link($big));
            // _dc(str_replace($big, '%#%', esc_url(get_pagenum_link($big))));

            echo paginate_links(array(
                //'base'    => str_replace($big, '%#%', "http://localhost:8080/wordpress/wp-admin/admin.php?page=tag.'$big'."),
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                // 'base'    => "http://localhost:8080/wordpress/wp-admin/admin.php?page=tag%_% : %_%",
                'format'  => '?paged=%#%',
                'current' => $paged,
                'total'   => ceil($number_of_series / $per_page) // 3 items per page
            ));

            ////////////
            // Find out how many items are in the table
            $total = wp_count_terms('hashtag', ['hide_empty' => false]);
            // _dc($total);

            // How many items to list per page
            $limit = 10;

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
            _dc($page);

            // Calculate the offset for the query
            $offset = ($page - 1)  * $limit;

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
            // if (get_query_var('paged')) {
            //     $paged = get_query_var('paged');
            // }
            // // else if (get_query_var('page')) {
            // //     $paged = get_query_var('page');
            // // } 
            // else {
            //     $paged = 1;
            // }
            $paged = App::start()->getService('request')->query->get('page=tag&paged', 1);
            // _dc(App::start()->getService('request'));
            // $paged = $request->query->get('paged');
            // _dc($paged);
            // $tags = get_terms('hashtag', array('number' => 10, 'hide_empty' => false, 'offset' => $offset));
            foreach ($tags as $tag) {
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

        <?php
        // The "back" link
        $prevlink = ($page > 1) ? '<a href="?page=1" title="First page">&laquo;</a> <a href="?page=tag&paged=' . ($page - 1) . '" title="Previous page">&lsaquo;</a>' : '<span class="disabled">&laquo;</span> <span class="disabled">&lsaquo;</span>';

        // The "forward" link
        $nextlink = ($page < $pages) ? '<a href="?page=tag&paged=' . ($page + 1) . '" title="Next page">&rsaquo;</a> <a href="?page=tag&paged=' . $pages . '" title="Last page">&raquo;</a>' : '<span class="disabled">&rsaquo;</span> <span class="disabled">&raquo;</span>';

        // Display the paging information
        echo '<div id="paging"><p>', $prevlink, ' Page', $page, ' of ', $pages, ' pages, displaying', $start, '-', $end, ' of ', $total, ' results', $nextlink, ' </p></div>';
        ?>
    </div>
</div>