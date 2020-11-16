<h1 class="gellerTitle">
    Sukurkita nauja nuorauku albuma
</h1>
<div class="form__group">
    <input type="text" class="form__input" id="albumName" placeholder="iveskite albumo pavadinima" required="" />
    <label for="name" class="form__label">Iveskite albumo pavadinima</label>
</div>
<div class="galleryContainer" id="loadeGallery">
    <output class="gallerGrid" id='result' />
    <div id="message">
        <div class="wrapper">
            <div class="file-upload">
                <label for="files"><span>&#43;</span></label>
                <input class="galleryImage" type="file" id='files' name="img" accept="image/*">
            </div>
        </div>
        <div class="galleryUploade">
            <div class="svg-wrapper">
                <svg height="60" width="150">
                    <rect id="shape" height="60" width="150" />
                    <div id="text">
                        <input class="uplodeBtn" type="button" id="submitImg" value='Siusti'><span class="spot"></span>
                    </div>
                </svg>
            </div>
        </div>
    </div>
</div>