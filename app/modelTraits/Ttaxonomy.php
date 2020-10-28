<?php
namespace BIT\app\modelTraits;

use BIT\app\TaxCollection;
use BIT\app\coreExeptions\InitHookNotFiredException;
use BIT\app\coreExeptions\PostIdNotSetException;

trait Ttaxonomy {

    
    public function checkMulti(string $tag)
    {
        if (did_action('init')) {       
            $tags = explode(', ', $tag);
            foreach ($tags as $key => $term) {
                foreach ($this->getTags() as $post_term) {
                    if ($post_term->name == $term) {
                        $tag_ids[] = $post_term->term_id;                    
                    }
                }
            }
            wp_remove_object_terms( $this->ID, $tag_ids, $this->taxonomy );
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }    
    }
    
    /** adds tag (default - Hashtag term) to post type Album
     * string $tag: 'tag' or 'tag1, tag2'
     */
    /** Example usage:
     * $album = new AlbumPost;
     * $album->save();
     * $album->addTag('tag1'); or $album->addTag(['tag1', 'tag2']);
     */
    public function addTag($tag, $taxonomy_type = 'hashtag')    
    {
            foreach ($this->taxonomy as $value){
                if($value == $taxonomy_type){
                    if (did_action('init')) {
                        // if (!term_exists( $tag, $this->taxonomy )) {
                        //     wp_insert_term( $tag, $this->taxonomy, ['slug' => str_replace(' ', '-', $tag)] );                           
                        // }
                        if ($this->ID == null) {
                            throw new PostIdNotSetException('Error: Call to addTag() function before save()');
                        } else {
                            wp_set_post_terms( $this->ID, $tag, $value, $append = true );
                            /**Hierarchical taxonomies must always pass IDs rather than names ($tag) 
                             * so that children with the same names but different parents aren't confused.*/
                        }
                    } else {
                        throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                    }
                }
            }
    } 

    //wp insert term - prideti paprastai. paskui tureti id ir prideti.

    private function tagDelete(string $tag, $taxonomy_type = 'hashtag') 
    {
        foreach ($this->taxonomy as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                    if(strpos($tag, ',')) {
                        $this->checkMulti($tag);
                    } else {
                        foreach ($this->getAllTags() as $term) {
                           
                            if ($term->name == $tag) {
                                $tag_id = $term->term_id;
                                wp_remove_object_terms( $this->ID, $tag_id, $taxonomy_type );
                            }
                        }
                    }
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }  
            }  
        }
    }

     /** removes tag form post type Album
     * $album->removeTag('tag') or $album->removeTag(['tag1', 'tag2'])
     */

    public function removeTag($tag, $taxonomy_type = 'hashtag'){
        if(is_string($tag)){
            $this->tagDelete($tag, $taxonomy_type);
        }if(is_array($tag)){
            foreach($tag as $key){
                $this->tagDelete($key, $taxonomy_type);
            }
        }

    }

    /** returns all post tags as Collection */
  
    public function getTags($taxonomy_type = 'hashtag') 
    {
        foreach ($this->taxonomy as $value){

            if($value == $taxonomy_type){
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();
                    $terms = get_terms([ 'taxonomy'=> $value, 'object_ids'=>$this->ID,  'hide_empty'=>false]);  //perdaryti i get_terms ir kategorijose
                    _dc( $terms);

                    foreach ($terms as $term) {
                        $taxCollection->addTerm($term);
                    }
                    return $taxCollection;
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    }

    /** returns all hashtags as Collection */

    public function getAllTags($taxonomy_type = 'hashtag') 
    {
        foreach ($this->taxonomy as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();
                    $args = ['taxonomy' => $this->taxonomy, 'hide_empty' => 0,];
                    $terms = get_terms($args);

                    foreach ($terms as $term) {
                        $taxCollection->addTerm($term);
                    }
                    return $taxCollection;
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }

            }
        }        
    }
    
}