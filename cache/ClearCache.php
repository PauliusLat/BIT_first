<?php

namespace BIT\cache;

class ClearCache{

    public static function start(){
        add_action( 'save_post', function ($post_id){
            $files = glob(__DIR__.'/loads/*.[hH][tT][mM][lL]') ?? [];
            if($post_id){
                
                if ( wp_is_post_revision( $post_id ) ) {
                    return;
                }
                foreach( $files as $file){
                    if(strcmp($file, __DIR__.'/loads/_method.html') == 0 || strcmp($file, __DIR__.'/loads/_status.html') == 0) continue;
                    unlink($file);
                }
                
            }
        });      
    }
  

}