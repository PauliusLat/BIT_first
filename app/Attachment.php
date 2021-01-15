<?php

namespace BIT\app;

use BIT\app\Post;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use BIT\app\modelTraits\Ttaxonomy;
use BIT\app\modelTraits\Tcategory;
use BIT\app\modelTraits\Tattachment;
use BIT\app\coreExeptions\wrongArgsTypeExeption;

require PLUGIN_DIR_PATH . '/../../../wp-load.php';
require_once(ABSPATH . 'wp-admin/includes/image.php');

class Attachment extends Post
{

    use Ttaxonomy;
    use Tcategory;
    use Tattachment;

    public $_wp_attachment_image_alt = '';
    protected static $type = 'attachment';


    public function save(UploadedFile $file = null, $parentId = 0)
    {

        // $request = app::start()->getService('request');
        $wordpress_upload_dir = wp_upload_dir();
        if ($file) {
            $fileNamePrefix = 1;
            $new_file_path = $wordpress_upload_dir['path'] . '/' . $file->getClientOriginalName();
            $new_file_mime = $file->getClientMimeType();
            //validation

            if (is_null($file->getError()))
                die($file->getError());

            if ($file->getSize() > wp_max_upload_size())
                die('It is too large than expected.');

            if (!in_array($new_file_mime, get_allowed_mime_types()))
                die('WordPress doesn\'t allow this type of uploads.');

            while (file_exists($new_file_path)) {
                $fileNamePrefix++;
                $new_file_path = $wordpress_upload_dir['path'] . '/' . $fileNamePrefix . '_' . $file->getClientOriginalName();
            }
            //save to DB
            if (move_uploaded_file($file->getPathname(), $new_file_path)) {
                $upload_id = wp_insert_attachment([
                    'ID'             => $this->ID,
                    'guid'           => $new_file_path,
                    'post_mime_type' => $new_file_mime,
                    'post_title'     => preg_replace('/\.[^.]+$/', '', $file->getClientOriginalName()),
                    'post_status'    => 'inherit',
                ], $new_file_path, $parentId);
                $this->ID = $upload_id;
                // Generate and save the attachment metas into the database
                wp_update_attachment_metadata($upload_id, wp_generate_attachment_metadata($upload_id, $new_file_path));
                $this->savePostData();
            }
        } else {
            $this->savePostData();
        }
    }

    private function savePostData()
    {
        wp_update_post(['ID' => $this->ID, 'post_content' => $this->post_content, 'post_excerpt' => $this->post_excerpt]);
        if ($this->_wp_attachment_image_alt) {
            update_post_meta($this->ID, '_wp_attachment_image_alt', $this->_wp_attachment_image_alt);
        }
    }

    public function delete($force_delete = false)
    {
        if ($this->ID > 0) {
            wp_delete_attachment($this->ID, $force_delete);
        } else throw new wrongArgsTypeExeption('Klaida: trinamas objektas neturi ID');
    }

    public function getAlt()
    {
        return $this->_wp_attachment_image_alt;
    }

    public function setAlt($alt)
    {
        $this->_wp_attachment_image_alt = $alt;
    }

    public function getCaption()
    {
        return $this->post_excerpt;
    }

    public function setCaption($caption)
    {
        var_dump($caption);
        $this->post_excerpt = $caption;
    }

    public function getDescription()
    {
        return $this->post_content;
    }

    public function setDescription($description)
    {
        $this->post_content = $description;
    }

    // public function getTitle(String $title){
    //     return $this->post_title;
    // }

    // public function setTitle(String $title){
    //     $this->post_title = $title;
    // }


    public function getUrl()
    {
        if (($this->ID) > 0) {
            return wp_get_attachment_url($this->ID);
        }
    }

    public function getAttachmentDetails()
    {
        if (($this->ID) > 0) {
            return wp_get_attachment_metadata($this->ID);
        }
    }
}





// Attachment klase, kaip ir kiti modeliai paveldi Post.php ir turi visus kitu modeliu metodus.
// Issaugodami perduodame visa $request, ir $parent_id(optional, jei norime priskirti kazkuriam modelio objektui).
// Kaip sukurti atachment’a:
// $attachment = new Attachment();
// $attachment->save($request, $post_parent_id(optional)); -sukuria nauja, arba update’ina esanti.
// $attachment->delete();
// $attachment->getURL();
// $attachment->geAttachmentDetails();
// $post_parent_id* galime perduoti, jei attachment’a norime priskirti kazkuriam postui(modelio objektui).Jei jo neperduodame, attachmentas liks be konteksto - be rysio i kazkuri post objekta.
// Visi modeliai, turi nauja savybe attachments. Ji  grazins masyva attachment tipo objektu. T.y. visi failai priskirti tam modelio objektui.
// Pvz.: 
// $album = AlbumPost::get($post_id);
// $album->attachments;
// grazins masyva nuotrauku(kaip Attachment objektu) priskirtu siam objektui.