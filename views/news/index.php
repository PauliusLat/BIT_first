<?php

// getCurrentRequest();
require ('list.php');
?>


<form action="http://localhost:8080/wordpress/wp-content/plugins/BIT_first/api/?route=news_store" method="post" enctype="multipart/form-data">
	Your Photo: <input type="file" name="profilepicture" size="25" />
	<input type="submit" name="submit" value="Submit" />
</form>

<div class="admin-event-div">
    <input type="hidden" name="news_new" value="new news">
    <div class="admin-event-form-group">
        <label class="admin-label">Naujienos pavadinimas</label><br>

        <input type="text" name="news-content" id="news-content" value="" placeholder="Įrašykite naujienos teksta..." class="admin-input">
   
   
        <!-- <input type="file" name="news-picture" id="news-picture" value="" class="admin-input"> -->
        <div class="admin-event-buttons">
            <button type="submit" id="create" class="admin-event-button">Pridėti</button>
        </div>
   </div>
    <!-- <form enctype="multipart/form-data" action="{route: 'news.index'}" method="POST">
        <input type="file" name="news-picture" id="news-picture" value="" class="admin-input">
        <div class="admin-event-buttons">
            <button type="submit" id="create" class="admin-event-button">Pridėti</button>
        </div>
    </form> -->
<div>
       

<br>





<script language='javascript'>


    // news_create
    const editButton = document.querySelector('#create');
    // console.log(editButton);
    // console.log('JS');
    if (editButton) {
        editButton.addEventListener('click', () => { 
            console.log('clicked');
            axios.get('<?= $url ?>api?route=news_store&content='+ document.querySelector('#news-content').value
            // , {route: 'test'}
            )
            // get can also have params
            .then((response) => {  
                // console.log(response);
                console.log(response.data);
                // console.log(response.data.html);
                // document.querySelector('.events-wrappers').innerHTML = response.data.html;
                // console.log(JSON.stringify(response))
                document.querySelector('#list').innerHTML = response.data.html;
            })
            .catch((error) => {
                console.log(error);
                // displayErrorMessages(error.response.data.errors);
            });
        });
    }
</script> 