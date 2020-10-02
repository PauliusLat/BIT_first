<?php

echo '<div id="list">';
foreach ($news as $key => $post) {


    echo '<div class="admin-event-div">
        <div class="admin-event-forms">
            <input type="hidden" name="news_update" value="update news">
            <input type="hidden" name="news_id" value="' . $post->ID  . '">
            <div class="admin-event-form-group">
                <label class="admin-label">Keisti naujienos pavadinimą:</label><br>
                <input class="admin-input" type="text" name="news-content" value="' . $post->news_content .'">
            </div>
            <div class="admin-event-buttons">
                <button type="submit" class="admin-event-button">Redaguoti</button>
            </div>
        </div>
        <div>
            <div class="admin-event-buttons">
                <button type="submit" class="news-delete admin-event-button" data-id="' . $post->ID . '">Trinti</button>
            </div>
        </div>
    </div>'
;
}
echo '</div>';
