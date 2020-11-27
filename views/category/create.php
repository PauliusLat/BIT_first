<?php

use BIT\app\Category;
?>

<div class='tagCreate'>
    <div class="admin-tag-div-first">
        <div class="admin-tag-form-group">
            <h3>Pridėkite naują 'tag'ą'<h3>
                    <label class="admin-label">'Tag'o' pavadinimas</label><br>
                    <input type="text" name="tag-name" id="tag-name" value="" placeholder="Įrašykite tag'o pavadinimą..." class="admin-input"><br><br>
                    <label class="admin-label">'Tag'o' 'slug'</label><br>
                    <input type="text" name="tag-slug" id="tag-slug" value="" placeholder="Įrašykite tag'o slug..." class="admin-input"><br><br>
                    <label class="admin-label">'Tag'o' aprašymas</label><br>
                    <input type="textarea" name="tag-description" id="tag-description" value="" placeholder="Įrašykite tag'o aprašymą..." class="admin-input"><br><br>
                    <div class="admin-event-buttons">
                        <button type="submit" id="create" class="admin-event-button">Pridėti</button>
                    </div>
        </div>
    </div>
    <div class="admin-tag-div">
        <table>
            <th>Pavadinimas</th>
            <th>Id</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Veiksmai</th>
            <?php
            foreach ($tags as $tag) {
            ?>
                <tr>
                    <td><?= $tag->name ?></td>
                    <td><?= $tag->term_id ?></td>
                    <td><?= $tag->slug ?></td>
                    <td><?= $tag->description ?></td>
                    <td>
                        <button class="tag-edit" type="submit" name="tag-name" id="<?= $tag->taxonomy ?>" value="<?= $tag->term_id ?>">Edit</button>
                        <button class="tag-delete" type="submit" name="tagDelete" id="<?= $tag->taxonomy ?>" value="<?= $tag->term_id ?>">Delete</button>

                    </td>
                </tr>
            <?php
            }
            ?>
        </table>
    </div>
</div>


<div class='category-container'>
    <div class="admin-category-div-first">
        <input type="hidden" name="news_new" value="new news">
        <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=category_store" method="post" enctype="multipart/form-data">
            <div class="admin-event-form-group">
                <h3>Pridėkite naują kategoriją<h3>
                        <label class="admin-label">Kategorijos pavadinimas</label><br>
                        <input type="text" name="category-name" id="category-name" value="" placeholder="Įrašykite kategorijos pavadinimą..." class="admin-input"><br><br>
                        <label class="admin-label">Kategorijos 'slug'</label><br>
                        <input type="text" name="category-slug" id="category-slug" value="" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                        <label class="admin-label">'Pasirinkite 'tėvinę' kategoriją</label><br>
                        <select class="form-control" name="tevines-kategorijos">
                            <?php
                            foreach ($categories as $cat) {

                                $category = new Category;
                                echo '<option value = "' . $cat->name . '">' . $cat->name . '</option>';
                                if (!empty(get_term_children($cat->term_id, 'maincat'))) {
                                    $children = $category->getChildCats($cat->term_id);
                                    foreach ($children as $child) {
                            ?>
                                        <option value="<?= $child->name ?>">&nbsp;&nbsp;<?= $child->name ?></option>
                            <?php
                                    }
                                }
                            } ?>
                        </select><br><br>
                        <label class="admin-label">Kategorijos aprašymas</label><br>
                        <input type="textarea" name="category-description" id="category-description" value="" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>

                        Your Photo: <input type="file" name="picture" size="25" /><br><br>

                        <div class="admin-event-buttons">
                            <button type="submit" id="create" class="admin-event-button">Pridėti</button>
                        </div>
            </div>
        </form>
    </div>
    <br>

    <div class="admin-category-div">
        <table>
            <tr>
                <th>Pavadinimas</th>
                <th>Id</th>
                <th>Aprašymas</th>
                <th>'Slug'</th>
                <th>'Count'</th>
                <th>Paveiksliukas</th>
                <th>Veiksmai</th>
                <div>
                    <?php
                    foreach ($categories as $category) {
                        $category->image = get_term_meta($category->term_id, "my_term_key");
                        $url = $app->apiUrl . '/resources/img/';
                    ?>
            <tr>
                <td><?= $category->name ?></td>
                <td><?= $category->term_id ?></td>
                <td><?= $category->description ?></td>
                <td><?= $category->slug ?></td>
                <td><?= $category->count ?></td>

                <td><?php foreach ($category->image as $key => $value) {
                            if ($key == 0) {
                                echo '<img style = "width: 200px; height: 200px; object-fit: cover;" src="' . $url . $value . '">';
                            }
                        }
                    ?>
                <td>
                    <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=category_edit&id=<?= $category->term_id ?>" method="post">
                        <button type="submit" name="edit" value="<?= $category->term_id ?>">Edit</button>
                    </form>
                    <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=category_destroy&id=<?= $category->term_id ?>" method="post">
                        <input type="hidden" name="ID" value="<?= $category->term_id ?>" readonly>
                        <button type="submit" name="delete">Delete</button>
                    </form>
                </td>
            </tr>
    </div>
<?php
                    }
?>
</table>
</div>
</div>