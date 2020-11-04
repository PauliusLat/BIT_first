<style>


</style>

<div class = 'tagCreate'>
    <div class="admin-tag-div-first" >
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
                    <td><?=$tag->name?></td>
                    <td><?=$tag->term_id?></td>
                    <td><?=$tag->slug?></td>
                    <td><?=$tag->description?></td>
                    <td>
                        <button class= "tag-edit" type="submit" name="tag-name" id = "<?=$tag->taxonomy?>" value="<?=$tag->term_id?>">Edit</button> 
                        <button class= "tag-delete" type="submit" name="tagDelete" id = "<?=$tag->taxonomy?>" value="<?=$tag->term_id?>">Delete</button>
                       
                    </td>
                </tr>
                <?php
                }
                ?> 
        </table>
    </div> 
</div> 
