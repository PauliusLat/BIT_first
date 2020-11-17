<?php

use BIT\app\Category;
?>

<div class='catCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp">Kategorijos</h1>
    </div>
    <div class="sm-1-2">
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

        <div class='label'>
            <label class="tcp-label">Kategorijos aprašymas</label>
        </div>
        <textarea name="category-description" id="category-description" value="" placeholder="Įrašykite kategorijos aprašymą..." class="tcp-input"></textarea>

        <!-- <form action="" method="post" enctype="multipart/form-data"> -->
        <!-- Your Photo: <input type="file" name="picture" size="25"/><br><br> -->
        <!-- <form> -->

        <div class="buttons">
            <button type="submit" id="create" class="btn-blue">Pridėti</button>
        </div>

        <div class='message'><?= $message ?></div>
    </div>

    <div class="sm-1-2">
        <table>
            <th>Pavadinimas</th>
            <th>Id</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Veiksmai</th>
            <?php
            foreach ($categories as $cat) {
            ?>
                <tr>
                    <td><?= str_repeat('--', $cat->level) ?><?= $cat->name ?></td>
                    <td><?= $cat->term_id ?></td>
                    <td><?= $cat->slug ?></td>
                    <td><?= $cat->description ?></td>
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