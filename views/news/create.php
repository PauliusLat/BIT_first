<!-- //nukreipti i store per action-->

<!-- echo '<br>
            <div class="lenteles">
            <form class="forma" method="POST" action="" enctype="multipart/form-data">
                <input type="hidden" name="news_update" value="update news">
                <input type="hidden" name="news_id" value="' . $post->ID . '">
                <div class="form-group">
                    <label class="admin-label">Data</label><br>
                    <input type="text" name="date" value="' . $metas['date'][0] . '" class="admin-input">
                </div>
                <div class="form-group">
                    <label class="admin-label">Įrašas</label><br>
                    <input type="text" name="record" value="' . $metas['content'][0] . '" class="admin-input">
                </div>
                <div class="mygtukai">
                    <button type="submit" class="admin-button">Redaguoti</button>
                    </form>
                    <form method="POST" action="">
                    <div class="mygtukai">
                            <input type="hidden" name="news_delete" value="news_id">
                            <input type="hidden" name="news_id" value="' . $post->ID . '">
                            <button type="submit" class="admin-button">Trinti</button>
                        </div>
                    </form>
                </div>
        </div>
        <br>';

} -->

        <br>
            <div class="lenteles">
                <form class="forma" method="POST" action="" enctype="multipart/form-data">
                    <input type="hidden" name="news_new" value="new news">
                    <div class="form-group">
                        <label class="admin-label">Data</label><br>
                        <input type="text" name="date" value="date" class="admin-input">
                    </div>
                    <div class="form-group">
                        <label class="admin-label">Įrašas</label><br>
                        <input type="text" name="content" value="content" class="admin-input">
                    </div>
                    <div class="mygtukai">
                        <button type="submit" class="admin-button">Pridėti</button>
                </form>
                    </div>
            </div>
        <br>
<!-- 
        <div class="admin-event-div">
        <form class="admin-event-forms" method="POST" action="">
            <input type="hidden" name="event_update" value="update event">
            <input type="hidden" name="event_id" value="' . $post->ID . '">
            <div class="admin-event-form-group">
                <label class="admin-label">Keisti įvykio pavadinimą:</label><br>
                <input class="admin-input" type="text" name="title" value="' . $metas['title'][0] . '">
            </div>
            <div class="admin-event-form-group">
                <label class="admin-label">Redaguoti tekstą:</label><br>
                <input name="text" type="text" class="admin-input" value="' . $metas['text'][0] . '">
            </div>
            <div class="admin-event-form-group">
                <label class="admin-label">Data:</label><br>
                <input class="admin-input" type="datetime-local" value="' . $metas['date'][0] . '" name="date">
            </div>
            <div class="admin-event-buttons">
                <button type="submit" class="admin-event-button">Redaguoti</button>
            </div>
        </form>
        <form method="POST" action="">
            <div class="admin-event-buttons">
                <input type="hidden" name="event_delete" value="event_id">
                <input type="hidden" name="event_id" value="' . $post->ID . '">
                <button type="submit" class="admin-event-button">Trinti</button>
            </div>
        </form>
        <!--<div>
            <select name="cars">
            <option value="' . $metas['title'][0] . '">' . $metas['title'][0] . '</option>
            </select>
        </div>-->
    </div> -->
