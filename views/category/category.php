<?php
if (!function_exists('wp_terms_checklist')) {
    include ABSPATH . 'wp-admin/includes/template.php';
}
// use BIT\app\Category;
?>

<div class='catCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp">Kategorijos</h1>
    </div>

    <div class="sm-1-2">
        <?php
        if ($message) {
        ?>
            <div class='message'><?= $message ?></div>
        <?php
        } else {
        ?>

            <div class='success_message'><?= $success_message ?></div>

        <?php
        }
        ?>

        <h2 class='tcp'>Pridėkite naują kategoriją</h2>
        <div class='label'>
            <label class="tcp-label">Kategorijos pavadinimas</label>
        </div>
        <input type="text" name="category-name" id="category-name" value="" placeholder="Įrašykite kategorijos pavadinimą..." class="tcp-input">
        <div class='label'>
            <label class="tcp-label">Kategorijos 'slug'</label>
        </div>
        <input type="text" name="category-slug" id="category-slug" value="" placeholder="Įrašykite kategorijos slug..." class="tcp-input">
        <div class='label'>
            <label class="tcp-label">Priskirkite 'tėvinę' kategoriją</label>
        </div>

        <?php
        $args = array(
            'taxonomy'     => 'maincat',
            'show_option_all' => 'pasirinkite tėvinę kategoriją',
            'orderby'      => 'name',
            'hide_empty'   => false,
            'show_count'   => false,
            'pad_counts'   => false,
            'hierarchical' => true,
        );
        ?>
        <ul style="display:inline-block">
            <?php wp_dropdown_categories($args); ?>
        </ul>

        <br><br>

        <input type="checkbox" id="catPage" name="catPage" value="catPage">
        <label for="catPage">Nekurti kategorijos puslapio</label><br>

        <div class='label'>
            <label class="tcp-label">Kategorijos aprašymas</label>
        </div>
        <textarea name="category-description" id="category-description" value="" placeholder="Įrašykite kategorijos aprašymą..." class="tcp-input"></textarea>

        <div class="categoriImageGrid sm-1">
            <h2 class="catImgTitle">
                Kategorijos paveikslėlis
            </h2>
            <div class="galleryContainer cat" id="loadeGallery">
                <output class="" id='result' />
                <div id="message">
                    <div class="wrapper cat">
                        <div class="file-upload">
                            <label for="files"><span>&#43;</span></label>
                            <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="buttons sm-1">
            <button type="submit" id="create" class="btn-blue">Pridėti</button>
        </div>


    </div>

    <div class="sm-1-2">
        <table>
            <th>Pavadinimas</th>
            <th>Eiti į kategoriją</th>
            <th>Aprašymas</th>
            <th>Paveikslėlis</th>
            <th>Veiksmai</th>
            <?php

            $pageNum = 1;
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
                <div class="buttons">
                    <button type="submit" id="selectpage" class="btn-blue">Rinktis</button>
                </div>
            </div>

            <?php
            echo '<div class = "page">';
            echo $first . $prev . $nav . $next . $last;
            echo '</div>';
            foreach ($categories as $cat) {
                $catImage = $category->getCatImage($cat->term_id);
                // _dc($catImage);
                $urlImg = $catImage->getUrl();
                // _dc($urlImg);
                $pageLink =  $category->getCatPageLink($cat->term_id);
            ?>
                <tr>
                    <td><?= str_repeat('--', $cat->level) ?><?= $cat->name ?></td>
                    <td><a href="<?= $pageLink ?>"><?= $pageLink ?></a></td>
                    <!-- <td><?= $cat->slug ?></td> -->
                    <td><?= $cat->description ?></td>
                    <?php

                    if ($catImage->ID != 0 && $catImage->ID != null && $catImage->ID != 'undefined' && $catImage->ID != '') {
                    ?>
                        <td>
                            <?php
                            echo '<img class = "cat" src="' . $urlImg . '">';
                            ?>
                        </td>
                    <?php
                    } else {
                    ?>
                        <td>
                            <?php
                            echo '';
                            ?>
                        </td>
                    <?php
                    }
                    ?>

                    <td>
                        <button class="category-edit btn-blue" type="submit" name="category-name" id="<?= $cat->taxonomy ?>" value="<?= $cat->term_id ?>">Edit</button>
                        <button class="category-delete btn-red" type="submit" name="catDelete" id="<?= $cat->taxonomy ?>" value="<?= $cat->term_id ?>">Delete</button>
                    </td>
                </tr>
            <?php
            }
            ?>
        </table>

    </div>
</div>