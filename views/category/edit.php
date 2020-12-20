<div class="grid-container">
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
            <label class="tcp-label">Kategorijos aprašymas</label>
        </div>
        <input type="textarea" name="category_description" id="category_description" value="<?= $category->description ?>" placeholder="Įrašykite kategorijos aprašymą..." class="tcp-input"><br><br>
        <div class="buttons">
            <button class="catUpdateBtn btn-blue" type="submit" id="catUpdate" value="<?= $category->term_id ?>">Pakeisti</button>
        </div>
    </div>
</div>
<div class="galleryContainer" id="loadeGallery">
    <output class="gallerGrid" id='result' />
    <div id="message">
        <div class="wrapper">
            <div class="file-upload">
                <label for="files">
                    <!-- <span>&#43;</span> -->
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
                    <!-- <img class='catImgEdit' src="<?= $urlImg ?>"> -->
                </label>

                <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
            </div>
        </div>
    </div>
</div>