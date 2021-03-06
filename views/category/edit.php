<div class="catCreate grid-container">
    <svg class='close'>
        <use xlink:href="#Capa_1"></use>
    </svg>
    <div class="sm-1-2">
        <h2 class='tcp'>Koreguokite kategoriją</h2>
        <div class='label'>
            <label class="tcp-label">Įveskite naują kategorijos pavadinimą</label>
        </div>
        <input type="text" name="category_name" id="category_name" value="<?= $category->name ?>" placeholder="Įrašykite kategorijos pavadinimą..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Kategorijos 'slug'</label>
        </div>
        <input type="text" name="category_slug" id="category_slug" value="<?= $category->slug ?>" placeholder="Įrašykite kategorijos slug..." class="tcp-input"><br><br>
        <div class='label'>
            <label class="tcp-label">Pakeiskite 'tėvinę' kategoriją</label>
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
            'selected'  => $parent,
            'id' => 'catEdit',
        );
        ?>
        <ul style="display:inline-block">
            <?php wp_dropdown_categories($args); ?>
        </ul>

        <div class='label'>
            <label class="tcp-label">Kategorijos aprašymas</label>
        </div>
        <textarea name="category_description" id="category_description" value="<?= $category->description ?>" placeholder="Įrašykite kategorijos aprašymą..." class="tcp-input"></textarea><br><br>
        <div class="buttons">
            <button class="catUpdateBtn btn-blue" type="submit" id="catUpdate" value="<?= $category->term_id ?>">Pakeisti</button>
        </div>
    </div>

    <div class="galleryContainer cat" id="loadeGallery">
        <output class="gallerGrid" id='result' />
        <div id="message">
            <div class="wrapper">
                <div class="file-upload edit">
                    <label for="files">
                        <?php
                        if ($catImage->ID != 0 && $catImage->ID != null && $catImage->ID != 'undefined' && $catImage->ID != '') {
                        ?>
                            <td>
                                <?php
                                echo '<img class = "catImgEdit" src="' . $urlImg . '">';
                                ?>
                            </td>
                        <?php
                        } else {
                        ?>
                            <td>
                                <?php
                                echo '<span>&#43;</span>';
                                ?>
                            </td>
                        <?php
                        }
                        ?>
                    </label>

                    <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
                </div>
            </div>
        </div>
    </div>
</div>


<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/cancel.svg')) ?>
</svg>