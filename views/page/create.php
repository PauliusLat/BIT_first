<?php
use BIT\app\Category;
?>

<style>
.category-container{
    width: 100%;
    display: flex;
}

.admin-category-div-first{
    width: 40%;
}

table {
  font-family: "Montserrat", sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 100px;
}

table td,
table th {
  font-family: "Montserrat", sans-serif;
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  font-family: "Montserrat", sans-serif;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #284646;
  color: white;
}

</style>
 <?php
//  _dc($categories);
?>

<div class = 'category-container'>
    <div class="admin-category-div-first" >
        <input type="hidden" name="news_new" value="new news">
        <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=page_store" method="post" enctype="multipart/form-data">
            <div class="admin-event-form-group">
                <h3>Pridėkite naują puslapį<h3>
                <label class="admin-label">Puslapio pavadinimas</label><br>
                <input type="text" name="page-name" id="page-name" value="" placeholder="Įrašykite puslapio pavadinimą..." class="admin-input"><br><br>
                <label class="admin-label">'Pasirinkite post'o tipą</label><br>
                <select class="form-control" name = "post-type">
                    <option value = "ideja">ideja</option>
                    <option value = "kalendorius">kalendorius</option>
                </select><br><br>
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
    <div>
        <?php
        foreach ($categories as $category) {
            $category->image = get_term_meta($category->term_id, "my_term_key");
            $url = $app->apiUrl.'/resources/img/';
            ?>
                <tr>
                    <td><?=$category->name?></td>
                    <td><?=$category->term_id?></td>
                    <td><?=$category->description?></td>
                    <td><?=$category->slug?></td>
                    <td><?=$category->count?></td>
                 
                    <td><?php foreach($category->image as $key=>$value){
                       if($key == 0){
                        echo '<img style = "width: 200px; height: 200px; object-fit: cover;" src="'.$url.$value.'">';
                        }
                    }
                    ?>
                    <td>
                        <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=category_edit&id=<?=$category->term_id?>" method="post"> 
                        <button type="submit" name="edit" value="<?=$category->term_id?>">Edit</button> 
                        </form>
                        <form action="http://localhost:8080/wordpress/wp-admin/admin.php?page=category_destroy&id=<?=$category->term_id?>" method="post">
                            <input type="hidden" name="ID" value="<?=$category->term_id?>"readonly>    
                            <button type="submit" name="delete">Delete</button>
                        </form>
                    <td>
                </tr>
        </div>
    <?php
    }
    ?> 
</table>
    </div> 
</div> 
