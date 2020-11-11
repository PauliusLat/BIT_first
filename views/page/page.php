<div class = 'pageCreate'>
    <div class="admin-category-div-first" >
    
        <form action="http://localhost/wordpress/wp-admin/admin.php?page=page_store" method="post" enctype="multipart/form-data">
            <div class="admin-event-form-group">
                <h3>Pridėkite naują puslapį<h3>
                <label class="admin-label">Puslapio pavadinimas</label><br>
                <input type="text" name="page-name" id="page-name" value="" placeholder="Įrašykite puslapio pavadinimą..." class="admin-input"><br><br>
                <label class="admin-label">Pasirinkite post'o tipą</label><br>
                <select class="form-control" name = "post-type">
                    <?php
                        $post_types = require PLUGIN_DIR_PATH . 'routes/frontRoutes.php';
                        if ($post_types) {
                          foreach ($post_types as $post => $args) {
                              ?>
                            <option value = "<?=$post?>"><?=$post?></option>
                            <?php
                            }      
                        }
                ?>
                </select><br><br>
                <div class="admin-event-buttons">
                    <button type="submit" id="create" class="admin-event-button">Pridėti</button>
                </div>
            </div>
        </form>
    </div> 
<br>

<div class="admin-tag-div">
        <table>
            <th>Pavadinimas</th>
            <th>Id</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Veiksmai</th>
            <?php
            //  _dc($pages);
            foreach ($pages as $page) {
               
                ?>
                <tr>
                    <td><?=$page->name?></td>
                    <td><?=$page->term_id?></td>
                    <td><?=$page->slug?></td>
                    <td><?=$page->description?></td>
                    <td>
                        <!-- <button class= "tag-edit" type="submit" name="tag-name" id = "<?=$page->taxonomy?>" value="<?=$page->term_id?>">Edit</button> 
                        <button class= "tag-delete" type="submit" name="tagDelete" id = "<?=$page->taxonomy?>" value="<?=$page->term_id?>">Delete</button> -->
                       
                    </td>
                </tr>
                <?php
                }
                ?> 
        </table>
    </div> 

 
</div> 
