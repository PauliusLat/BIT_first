<div class='pageCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp mainheading">Puslapiai</h1>
        <div id="editor" name="newsEditor">
        </div>
    </div>
    <div class="sm-1-2">
        <h2 class='tcp'>Pridėkite naują puslapį</h2>
        <div class='label'>
            <label class="tcp-label">Puslapio antraštė</label>
        </div>
        <input type="text" name="page_title" id="page_title" value="" placeholder="Įrašykite puslapio pavadinimą..." class="tcp-input">

        <div class='label'>
            <label class="tcp-label">Pasirinkite post'o tipą</label>
        </div>
        <select class="form-control" name="post-type" id="post">
            <?php
            // $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
            if ($post_types) {
                foreach ($post_types as $post => $args) {
            ?>
                    <option value="<?= $post ?>"><?= $post ?></option>
            <?php
                }
            }
            ?>
        </select>

        <div class='label'>
            <label class="tcp-label">Pasirinkite puslapio rūšį</label>
        </div>

        <select class="form-control" name="page-state" id="pageState">
            <?php
            // $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
            if ($menu_page_state) {
                foreach ($menu_page_state as $page => $args) {
            ?>
                    <option value="<?= $args ?>"><?= $args ?></option>
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
            <th>Antraštė</th>
            <th>Nuoroda</th>
            <!-- <th>Puslapio pavadinimas</th> -->
            <th>Puslapio rūšis</th>
            <th>Veiksmai</th>
            <?php
            foreach ($pages as $page) {
            ?>
                <tr>
                    <td><?= $page->post_title ?></td>
                    <td>
                        <?php
                        $pageLink = $page->getLink();
                        ?>
                        <a href="<?= $pageLink ?>"><?= $pageLink ?></a>
                    </td>
                    <?php
                    if ($page->pageState != 0 && $page->pageState != NUll && $page->pageState != 'undefined' && $page->pageState != '') {
                    ?>
                        <td>
                            <?php
                            foreach ($page->pageState as $value) {
                            ?>
                                <div><?= $value ?></div>
                            <?php
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

<script>
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{
            'header': 1
        }, {
            'header': 2
        }], // custom button values
        [{
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }],

        [{
            'indent': '-1'
        }, {
            'indent': '+1'
        }], // outdent/indent
        [{
            'direction': 'rtl'
        }], // text direction

        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],

        [{
            'color': []
        }, {
            'background': []
        }], // dropdown with defaults from theme
        [{
            'font': []
        }],
        [{
            'align': []
        }],

        ['link', 'image'],

        ['clean'] // remove formatting button
    ];

    var quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
</script>