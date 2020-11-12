<div class = 'pageCreate'>
    <div class="admin-category-div-first" >
    
        <!-- <form action="http://localhost/wordpress/wp-admin/admin.php?page=page_store" method="post" enctype="multipart/form-data"> -->
            <div class="admin-event-form-group">
                <h3>Pridėkite naują puslapį<h3>
                <label class="admin-label">Puslapio pavadinimas</label><br>
                <input type="text" name="page-name" id="page-name" value="" placeholder="Įrašykite puslapio pavadinimą..." class="admin-input"><br><br>
                <label class="admin-label">Pasirinkite post'o tipą</label><br>
                <select class="form-control" name = "post-type" id = "post">
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
        <!-- </form> -->
    </div> 
<br>

<div class="admin-tag-div">
        <table>
            <th>Page name</th>
            <th>Id</th>
            <th>Post name</th>
            <th>Page state</th>
            <th>Actions</th>
            <?php
            //  _dc($pages);
            foreach ($pages as $page) {
               
                ?>
                <tr>
                    <td><?=$page->post_title?></td>
                    <td><?=$page->ID?></td>
                    <td><?=$page->post_name?></td>
                    <td><?=$page->pageState?></td>
                    <td>
                        <button class= "page-edit" type="submit" name="page-name" id = "<?=$page->post_title?>" value="<?=$page->ID?>">Edit</button> 
                        <button class= "page-delete" type="submit" name="pageDelete" id = "<?=$page->post_title?>" value="<?=$page->ID?>">Delete</button>
                       
                    </td>
                </tr>
                <?php
                }
                ?> 
        </table>
    </div> 

 
</div> 
