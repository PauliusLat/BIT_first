<?php
use BIT\app\Category;
?>



<div class = 'catCreate'>
    <div class="admin-tag-div-first" >
        <div class="admin-tag-form-group">
            <h3>Pridėkite naują kategoriją<h3>
                <label class="admin-label">Kategorijos pavadinimas</label><br>
                <input type="text" name="category-name" id="category-name" value="" placeholder="Įrašykite kategorijos pavadinimą..." class="admin-input"><br><br>
                <label class="admin-label">Kategorijos 'slug'</label><br>
                <input type="text" name="category-slug" id="category-slug" value="" placeholder="Įrašykite kategorijos slug..." class="admin-input"><br><br>
                <label class="admin-label">Priskirkite 'tėvinę' kategoriją</label><br>
                   
                        <?php
                
                        $args = array(
                        'taxonomy'     => 'maincat',
                        'show_option_all' => true,
                        'orderby'      => 'name',
                        'hide_empty'   => false,
                        'show_count'   => false,
                        'pad_counts'   => false,
                        'hierarchical' => true,
                        'title_li'     => ''
                        );
                        ?>

                        <ul style = "display:inline-block">
                        <?php wp_dropdown_categories( $args );?>
                        </ul>

                        <?php
                        // foreach ($categories as $cat){
                        //     $category = new Category;
                        //     echo '<option class = "parent" value = "'.$cat->name.'">'.$cat->name.'</option>';
                        //     if(!empty(get_term_children( $cat->term_id, 'maincat'))){
                        //         $children = $category->getChildCats($cat->term_id);
                        //         foreach($children as $child){
                        //             ?>
                        <!-- //             <option  value = "<?=$child->name?>">&nbsp;&nbsp;<?=$child->name?></option> -->
                                    <?php
                        //         }
                        //     }
                        // }
                        ?>
                <br><br>
                <label class="admin-label">Kategorijos aprašymas</label><br>
                <input type="textarea" name="category-description" id="category-description" value="" placeholder="Įrašykite kategorijos aprašymą..." class="admin-input"><br><br>
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
            foreach ($categories as $cat) {
                ?>
                <tr>
                    <td><?=$cat->name?></td>
                    <td><?=$cat->term_id?></td>
                    <td><?=$cat->slug?></td>
                    <td><?=$cat->description?></td>
                    <td>
                        <button class= "category-edit" type="submit" name="category-name" id = "<?=$cat->taxonomy?>" value="<?=$cat->term_id?>">Edit</button> 
                        <button class= "category-delete" type="submit" name="catDelete" id = "<?=$cat->taxonomy?>" value="<?=$cat->term_id?>">Delete</button>
                       
                    </td>
                </tr>
                <?php
                }
                ?> 
        </table>
    </div> 
    
</div> 


