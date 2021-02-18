<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
<div class="editStart">
    <div class="postDate">
        <?= $data->post_date; ?>
    </div>
    <input class="postTitle" type="text" id="title" value=" <?= $data->post_title; ?>" />
    <?php $allImages = $data->attachments; ?>
    <?php foreach ($allImages as $image) : ?>
        <div class="getImage">
            <div class="imageDiv">
                <img id="image" src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
            </div>
            <div class="galleryContainer hiden" id="loadeGallery">
                <output class="newsImg" id="result" />
                <div class="resizeImageNews" id="message">
                    <div class="wrapper newaWrap">
                        <div class="file-upload imgeNewsUp">
                            <label for="files"><span>
                                    <svg>
                                        <use xlink:href="#picture"></use>
                                    </svg>
                                </span></label>
                            <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    <?php endforeach; ?>
    <div class="editPost" id="editor" name="newsEditor">
        <?= $data->news_content; ?>
    </div>

    <div class="catPropNews sm-7-24">
        <div class="newsStatus ">
            <div class="newsS">
                Statusas
            </div>
            <div class="widthNews">
                <input class="btn-blue newsBtnSend " type="button" id="<?= $data->ID; ?>" value='Publikuoti' enctype="multipart/form-data">
            </div>
        </div>
        <div class="newsCatAdd" id="catNews">
            <div class="newsCats">
                Pakeisti kategorija
            </div>
            <div class="catBoxBtn">
                <svg class="catDown">
                    <use xlink:href="#save"></use>
                </svg>
                <svg class="catUp hiden">
                    <use xlink:href="#save_up"></use>
                </svg>
            </div>
        </div>
        <div class="newsCat hiden">
            <div class='tcp'>
                Pasirinkite kategoriją
            </div>
            <?php
            $args1 = array(
                'taxonomy' => 'maincat',
                'descendants_and_self' => 0,
                'selected_cats' => false,
                'popular_cats' => false,
                'checked_ontop' => false,
                'selected_cats' => $postCats
            );
            ?>
            <ul>
                <?php wp_terms_checklist($post_id = 0, $args1); ?>
            </ul>
        </div>
        <div class="newsTag" id="tagNews">
            <div class="tagTitle">
                Raktiniai žodžiai
            </div>
            <div class="inputTagClass">
                <label for="alt">Alt tekstas</label>
                <input type="text" id="alt" value="<?= $image->getAlt(); ?>" />
                <label for="pavTtitle">Pav. pavadinimas</label>
                <input type="text" id="pavTtitle" value="<?= $image->getCaption(); ?>" />
            </div>
        </div>
    </div>
</div>


<script>
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{
            'header': 1
        }, {
            'header': 2
        }], // custom button values
        [{
            'list': 'ordered'
        }, {
            'list': 'bullet'
        }],
        [{
            'indent': '-1'
        }, {
            'indent': '+1'
        }], // outdent/indent
        [{
            'direction': 'rtl'
        }], // text direction
        [{
            'header': [1, 2, 3, 4, 5, 6, false]
        }],
        [{
            'color': []
        }, {
            'background': []
        }], // dropdown with defaults from theme
        [{
            'font': []
        }],
        [{
            'align': []
        }],
        ['clean'] // remove formatting button
    ];
    var quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
</script>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;">
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/save.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/save_up.svg')) ?>
    <?= str_replace(['<svg', 'svg>'], ['<symbol', 'symbol>'], file_get_contents($app->publicDir . '/svg/picture.svg')) ?>
</svg>