<div class="lenteles">
                <form class="forma" method="POST" action="http://localhost/wordpress/wp-content/plugins/BIT_first/api/?route=news_store" enctype="multipart/form-data">
                    <input type="hidden" name="news_new" value="new news">
                    <div class="form-group">
                        <label class="admin-label">Data</label><br>
                        <input type="text" name="date" value="date" class="admin-input">
                    </div>
                    <div class="form-group">
                        <label class="admin-label">Įrašas</label><br>
                        <input type="text" name="content" value="content" class="admin-input">
                    </div>
</div>
                    <div class="mygtukai">
                        <button type="submit" class="admin-button">Pridėti</button>
                </form>
                    </div>
            </div>
        <br><!-- //nukreipti i update per action-->