<?php

use BIT\models\NewsPost;

$list = NewsPost::all()->all();
$htmlString = '';

foreach ($list as $id => $news) {
    $attachment = $news->attachments[0]->getUrl();
    $htmlString .= 
                    `<div class="news-box"> 
  
                      <div class="news-img">
                        <img src="$attachment" alt="">
                      </div>
                      <div class="news-text">
                        <div class="news-date">
                            <p>$news->post_date</p>
                        </div>
                        <div class="news-content">
                            <p>$news->post_title</p>
                        </div>
                      </div>
                      <div class="news-buttons">
                        <button  class="newsBtn deleteBtnNews" id="$news->ID">
                            Trinti
                        </button> 
                        <button  class="newsBtn editBtnNews" id="$news->ID">
                            Redaguoti
                        </button> 
                      </div>
                    </div>`;
}

