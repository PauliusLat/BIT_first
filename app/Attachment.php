<?php

namespace BIT\app;
use BIT\app\Post;
use Symfony\Component\HttpFoundation\Request;
use BIT\app\coreExeptions\wrongArgsTypeExeption;
require PLUGIN_DIR_PATH . '/../../../wp-load.php';
require_once( ABSPATH . 'wp-admin/includes/image.php' );

class Attachment extends Post{

    protected static $type = 'attachment';


    public function save(Request $request = null, $parentId = 0){

        $wordpress_upload_dir = wp_upload_dir();
        $fileNamePrefix = 1; 
        foreach ($request->files->all() as $file) {
            $new_file_path = $wordpress_upload_dir['path'] . '/' . $file->getClientOriginalName();
            $new_file_mime = $file->getClientMimeType();
            //validation
            if( empty( $file ) )
            die( 'File is not selected.' );
            
            if( is_null($file->getError()) )
            die( $file->getError() );
            
            if( $file->getSize() > wp_max_upload_size() )
            die( 'It is too large than expected.' );
            
            if( !in_array( $new_file_mime, get_allowed_mime_types() ) )
            die( 'WordPress doesn\'t allow this type of uploads.' );
            
            while( file_exists( $new_file_path ) ) {
                $fileNamePrefix++;
                $new_file_path = $wordpress_upload_dir['path'] . '/' . $fileNamePrefix . '_' . $file->getClientOriginalName();
            }
            //save to DB
   
            if( move_uploaded_file( $file->getPathname(), $new_file_path ) ) {
                $upload_id = wp_insert_attachment( array(
                    'ID'             => $this->ID,
                    'guid'           => $new_file_path, 
                    'post_mime_type' => $new_file_mime,
                    'post_title'     => preg_replace( '/\.[^.]+$/', '', $file->getClientOriginalName() ),
                    'post_status'    => 'inherit'
                ), $new_file_path, $parentId );
                $this->ID = $upload_id;
                wp_update_post(['ID'=>$this->ID, 'guid'=>$new_file_path]);
                
                // Generate and save the attachment metas into the database
                wp_update_attachment_metadata( $upload_id, wp_generate_attachment_metadata( $upload_id, $new_file_path ) );
            }
        }
    }

    public function delete($force_delete = false){
        if($this->ID > 0){
            wp_delete_attachment($this->ID, $force_delete);
        }
        else throw new wrongArgsTypeExeption('Klaida: trinamas objektas neturi ID');
    }

    public function getURL(){
        if(($this->ID) > 0){
            return wp_get_attachment_url($this->ID);
        }
    }

    public function getAttachmentDetails() {
        if(($this->ID) > 0){
            return wp_get_attachment_metadata( $this->ID );
        }
    }

    
    // public function getCaption(){
        //     if(($this->ID) > 0){
            //         return wp_get_attachment_caption($this->ID);
            //     }
            // }
            
    // public function getThumb(){
    //     if(($this->ID) > 0){
    //         return wp_get_attachment_thumb_file($this->ID);
    //     }
    // }

}