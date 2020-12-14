<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
<div class="editStart">
    <div class="1">
        <?= $data->post_date; ?>
    </div>
    <textarea class="title">
        <?= $data->post_title; ?>
    </textarea>
    <?php $allImages = $data->attachments; ?>
    <?php foreach ($allImages as $image) : ?>
        <div class="getImage">
            <div class="imageDiv">
                <img id="image" src="<?= $image->getUrl(); ?>" alt="<?= $image->getAlt(); ?>">
            </div>
        </div>
    <?php endforeach; ?>
    <div id="editor" name="newsEditor">
        <?= $data->news_content; ?>
    </div>
    <div class="btn-green btnNews save" id="<?= $data->ID; ?>">
        Saugoti
    </div>
</div>
<div class="galleryContainer hiden" id="loadeGallery">
    <output class="gallerGrid" id='result' />
    <div id="message">
        <div class="wrapper">
            <div class="file-upload">
                <label for="files"><span>&#43;</span></label>
                <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
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