<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>


<div class="main_news_container" id="startNewsAdmin">

    <div class="galleryContainer" id="loadeGallery">
        <output class="newsImg" id="result" />
        <div class="gellerTitle newsImage">
            Naujienos paveikslelis
        </div>

        <div class="hiden" id="message">
            <div class="wrapper">
                <div class="file-upload">
                    <label for="files"><span>&#43;</span></label>
                    <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
                </div>
            </div>
            <div class="newsImgInputs">
                <input type="text" class="form__input newsImgInput" id="newsName" placeholder="pavadinimas" required="" />
                <input type="text" class="form__input newsImgInput" id="newsAlt" placeholder="alt tekstas" required="" />
            </div>
            <div class="galleryUploade">
                <input class="btn-grey" type="button" id="submitImg" value='Išsaugoti'>
            </div>
        </div>
    </div>
    <div class="news-container">
        <div class="active-content">
            <h1 class="news-title">
                SUKURTI NAUJIENA
            </h1>
            <div class="news-add md-2-3 newHeight">
                <div id="editor" name="newsEditor">
                </div>
                <div class="widthNews">
                    <input class="btn-grey newsBtnSend " type="button" id="submit" value='Siusti' enctype="multipart/form-data">
                </div>
            </div>
        </div>
    </div>
    <div class="catPropNews">
        <div class="gallerBtn" id="catNews">
            kategorija
        </div>
        <div class="gallerBtn" id="tagNews">
            tag
        </div>
    </div>
    <div class="md-1-5 newsCat" style="display: none;">
        <h2 class='tcp'>
            Pasirinkite kategoriją
        </h2>
        <?php
        $args1 = array(
            'taxonomy'     => 'maincat',
            'show_option_all' => 'pasirinkite kategoriją',
            'orderby'      => 'name',
            'hide_empty'   => false,
            'show_count'   => false,
            'pad_counts'   => false,
            'hierarchical' => true,
        );
        ?>
        <ul>
            <?php wp_dropdown_categories($args1); ?>
        </ul>
        <div class="showAllSelected">
        </div>
        <div class="buttons sm-1">
            <button type="submit" id="create" class="btn-blue">
                Pridėti
            </button>
        </div>
    </div>
    <div class='tcp newsCat'  style="display: none;">
        Irasyti tag
        <input type="text" name="tag-name" id="tag-name" value="" placeholder="Įrašykite tag" class="tcp-input">
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