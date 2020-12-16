<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>


<div class="main_news_container" id="startNewsAdmin">
    <div>
        BLOG POSTS
    </div>
    <div class="galleryContainer" id="loadeGallery">
        <output class="newsImg" id="result" />
        <div class="gellerTitle newsImage">
            Naujienos paveikslelis
        </div>

        <div class="resizeImageNews" id="message">
            <div class="wrapper newaWrap">
                <div class="file-upload imgeNewsUp">
                    <label for="files"><span><svg height="40" width="40" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g />
                                <g id="Ps" />
                                <g id="Ai" />
                                <g id="Ai_download" />
                                <g id="Image" />
                                <g id="Image_download">
                                    <g>
                                        <g>
                                            <path d="M53,58c-7.168,0-13-5.832-13-13s5.832-13,13-13s13,5.832,13,13S60.168,58,53,58z M53,36     c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S57.963,36,53,36z" style="fill:#61BEE2;" />
                                        </g>
                                        <g>
                                            <path d="M62.017,95.963c-1.292,0-2.584-0.414-3.658-1.241L37.268,78.498     c-0.733-0.563-1.749-0.553-2.469,0.023l-17.55,14.04l-2.498-3.123l17.55-14.04c2.163-1.729,5.208-1.762,7.406-0.07l21.091,16.224     c0.714,0.549,1.711,0.551,2.429,0.008l24.377-18.493c1.963-1.49,4.689-1.619,6.784-0.321L113.053,84.3l-2.105,3.4L92.282,76.146     c-0.698-0.433-1.607-0.388-2.261,0.107L65.644,94.747C64.573,95.558,63.295,95.963,62.017,95.963z" style="fill:#61BEE2;" />
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M104,80c-13.255,0-24,10.745-24,24s10.745,24,24,24s24-10.745,24-24S117.255,80,104,80z       M114.882,96.988l-0.113,0.176l-8.232,11.438C105.989,109.468,105.029,110,104,110s-1.989-0.532-2.536-1.397l-8.346-11.614      c-0.529-0.926-0.524-2.073,0.01-2.994c0.535-0.922,1.53-1.494,2.596-1.494H100V86c0-1.654,1.346-3,3-3h2c1.654,0,3,1.346,3,3      v6.5h4.276c1.065,0,2.061,0.572,2.596,1.494C115.406,94.915,115.411,96.063,114.882,96.988z" style="fill:#61BEE2;" />
                                            </g>
                                            <g>
                                                <g>
                                                    <polygon points="84,125.95 83.95,126 84,126      " style="fill:#FF9A30;" />
                                                </g>
                                                <g>
                                                    <polygon points="114,77 114,76.95 113.95,77      " style="fill:#FF9A30;" />
                                                </g>
                                                <g>
                                                    <path d="M111.071,44.243L71.757,4.929C69.869,3.041,67.357,2,64.687,2H24c-5.514,0-10,4.486-10,10v104       c0,5.514,4.486,10,10,10h59.95l-4-4H24c-3.309,0-6-2.691-6-6V12c0-3.309,2.691-6,6-6h40.687c1.603,0,3.109,0.624,4.242,1.757       l39.314,39.314c1.116,1.117,1.757,2.663,1.757,4.242V72.95l4,4V51.313C114,48.643,112.96,46.132,111.071,44.243z" style="fill:#61BEE2;" />
                                                </g>
                                                <g>
                                                    <polyline points="113.95,77 114,76.95 110,72.95      " style="fill:#FFFFFF;" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                                <g id="Video" />
                                <g id="Video_download" />
                                <g id="Ps_download" />
                                <g id="Doc" />
                                <g id="Doc_download" />
                                <g id="Music" />
                                <g id="Music_download" />
                                <g id="Pdf" />
                                <g id="Pdf_download" />
                                <g id="Word" />
                                <g id="Word_download" />
                                <g id="Exel" />
                                <g id="Exel_download" />
                                <g id="Powerpoint" />
                                <g id="Powerpoint_download" />
                                <g id="Zip" />
                                <g id="Zip_download" />
                            </svg></span></label>
                    <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
                </div>
                <div class="">
                    <input type="text"  id="newsName" placeholder="pavadinimas" required="" />
                    <input type="text"  id="newsAlt" placeholder="alt tekstas" required="" />
                </div>
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
            <div class="newsBoredr md-2-3">
                <div class="news-add newHeight">
                    <div id="editor" name="newsEditor">
                    </div>
                    <div class="widthNews">
                        <input class="btn-grey newsBtnSend " type="button" id="submit" value='Siusti' enctype="multipart/form-data">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="catPropNews sm-7-24">
        <div class="newsStatus ">
            status
        </div>
        <div class="newsCatAdd" id="catNews">
            kategorija
        </div>
        <div class="nesTag" id="tagNews">
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
    <div class='tcp newsCat' style="display: none;">
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