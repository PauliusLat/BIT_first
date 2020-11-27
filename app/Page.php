<?php
namespace BIT\app;

class Page extends Post{

    public $pageState = 'Site Page';
    protected static $type = 'page';

    public function setRoute($route) {
        $this->post_content  = "[front_shortcode route='$route']";
    }

    public function setTitle($post_title){
            $this->post_title = $post_title;
            $this->post_name= $post_title;
            $this->comment_status = 'closed';
            $this->ping_status = 'closed';
    }

}