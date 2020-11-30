<?php

use BIT\app\Category;
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
        } ?>

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
        <label for="catPage">Sukurti kategorijos puslapį</label><br>


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
            <!-- <th>Id</th>
            <th>Slug</th> -->
            <th>Description</th>
            <th>Paveikslėlis</th>
            <th>Veiksmai</th>
            <?php
            foreach ($categories as $cat) {
                $cat->image = get_term_meta($cat->term_id, "my_term_key");
            ?>
                <tr>
                    <td><?= str_repeat('--', $cat->level) ?><?= $cat->name ?></td>
                    <!-- <td><?= $cat->term_id ?></td>
                    <td><?= $cat->slug ?></td> -->
                    <td><?= $cat->description ?></td>
                    <?php
                    if ($cat->image) {
                    ?>
                        <td><?php foreach ($cat->image as $key => $value) {
                                if ($key == 0) {
                                    echo '<img style = "width: 100px; height: 100px; object-fit: cover;" src="' . $url . $value . '">';
                                }
                            }
                            ?>
                        </td>
                    <?php
                    } else {
                    ?>
                        <td></td>
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