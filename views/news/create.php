<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>


<div class="main_news_container" id="startNewsAdmin">
    <div>
        BLOG POSTS
    </div>
    <div class="news-container">
        <div class="active-content">
            <h1 class="news-title">
                SUKURTI NAUJIENA
            </h1>
            <div class="newsBoredr md-2-3">
                <div class="news-add newHeight">
                    <div id="editor" name="newsEditor">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="catPropNews sm-7-24">
        <div class="newsStatus ">
            <div class="newsS">
                Statusas
            </div>
            <div class="widthNews">
                <input class="btn-blue newsBtnSend " type="button" id="submit" value='Publikuoti' enctype="multipart/form-data">
            </div>
        </div>
        <div class="newsCatAdd" id="catNews">
            <div class="newsCats">
                Pasirinkti kategorija
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
                // 'selected_cats' => [$postCats]
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
                <input type="text" id="newsTagInput" placeholder="#irasykite #tag" required="" />
            </div>
        </div>
        <div class="galleryContainer" id="loadeGallery">
            <output class="newsImg" id="result" />
            <div class="gellerTitle newsImage">
                Naujienos paveikslelis
            </div>
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
                <div class="imageLabelsNews">
                    <input type="text" id="newsName" placeholder="pavadinimas" required="" />
                    <input type="text" id="newsAlt" placeholder="alt tekstas" required="" />
                </div>

                <div class="galleryUploade">
                    <input class="btn-grey" type="button" id="submitImg" value='Išsaugoti'>
                </div>
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

        ['link', 'image'],

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