<div class='tagCreate grid-container'>
    <div class="sm-1">
        <h1 class="tcp">Tagai</h1>
    </div>
    <div class="sm-1-2">
        <h2 class='tcp'>Pridėkite naują 'tag'ą'</h2>
        <div class='label'>
            <label class="tcp-label">'Tag'o' pavadinimas</label>
        </div>
        <input type="text" name="tag-name" id="tag-name" value="" placeholder="Įrašykite tag'o pavadinimą..." class="tcp-input">
        <div class='label'>
            <label class="tcp-label">'Tag'o' 'slug'</label>
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
                        <button class="tag-edit btn-blue" type="submit" name="tag-name" id="<?= $tag->taxonomy ?>" value="<?= $tag->term_id ?>">Edit</button>
                        <button class="tag-delete btn-red" type="submit" name="tagDelete" id="<?= $tag->taxonomy ?>" value="<?= $tag->term_id ?>">Delete</button>

                    </td>
                </tr>
            <?php
            }
            ?>
        </table>
    </div>
</div>