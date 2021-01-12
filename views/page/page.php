<div class='pageCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp">Puslapiai</h1>
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
            foreach ($post_types as $post => $args) : ?>
                <option value="<?= $post ?>"><?= $post ?></option>
            <?php endforeach;
            ?>
        </select>

        <div class='label'>
            <label class="tcp-label">Pasirinkite puslapio rūšį/rūšis</label>
        </div>

        <?php foreach ($menu_page_state as $args) : ?>
            <input type="checkbox" name="pageState" value="<?= $args ?>">
            <label for="pageState"> <?= $args ?></label><br><br>
        <?php endforeach; ?>
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
            $pageNum = 1;
            $nav = '';
            for ($currpage = 1; $currpage <= $pagesnr; $currpage++) {
                $nav .= '&nbsp <a class=" paging nr-' . $currpage . '" id = "' . $currpage . ' ">' . $currpage . '</a> ';
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

            foreach ($pages as $page) : ?>
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
                            foreach ($page->pageState as $value) : ?>
                                <div><?= $value ?></div>
                            <?php endforeach; ?>
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
            <?php endforeach; ?>
        </table>
    </div>
</div>