<div class='pageCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp">Puslapiai</h1>
    </div>
    <div class="sm-1-2">
        <h2 class='tcp'>Pridėkite naują puslapį</h2>
        <div class='label'>
            <label class="tcp-label">Puslapio pavadinimas</label>
        </div>
        <input type="text" name="page-name" id="page-name" value="" placeholder="Įrašykite puslapio pavadinimą..." class="tcp-input">

        <div class='label'>
            <label class="tcp-label">Pasirinkite post'o tipą</label>
        </div>

        <select class="form-control" name="post-type" id="post">
            <?php
            $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
            if ($post_types) {
                foreach ($post_types as $post => $args) {
            ?>
                    <option value="<?= $post ?>"><?= $post ?></option>
            <?php
                }
            }
            ?>
        </select>

        <div class="buttons">
            <button type="submit" id="create" class="btn-blue">Pridėti</button>
        </div>
    </div>

    <div class="sm-1-2">
        <table>
            <th>Pavadinimas</th>
            <th>Nuoroda</th>
            <!-- <th>Post name</th> -->
            <th>Page state</th>
            <th>Veiksmai</th>
            <?php
            foreach ($pages as $page) {
                // echo '<pre>';
                // var_dump($page);
            ?>
                <tr>
                    <td><?= $page->post_title ?></td>
                    <td><a href='<?= $page->guid ?>'>Eiti į puslapį</a></td>
                    <!-- <td><?= $page->post_name ?></td> -->
                    <td><?= $page->pageState ?></td>
                    <td>
                        <button class="page-edit btn-blue" type="submit" name="page-name" id="<?= $page->post_title ?>" value="<?= $page->ID ?>">Edit</button>
                        <button class="page-delete btn-red" type="submit" name="pageDelete" id="<?= $page->post_title ?>" value="<?= $page->ID ?>">Delete</button>
                    </td>
                </tr>
            <?php
            }
            ?>
        </table>
    </div>
</div>