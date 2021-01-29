<?php

namespace BIT\app;

class Page extends Post
{
    protected static $type = 'page';
    public $pageState = [];
    public function setRoute($route, $args = '')
    {
        $this->post_content  = "[front_shortcode route=$route args=$args]";
    }
    public function setTitle($post_title)
    {
        $this->post_title = $post_title;
        $this->post_name = $post_title;
        $this->comment_status = 'closed';
        $this->ping_status = 'closed';
    }
}
