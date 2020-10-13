<?php
namespace BIT\app\modelTraits;

use BIT\app\TaxCollection;
use BIT\app\coreExeptions\InitHookNotFiredException;
use BIT\app\coreExeptions\PostIdNotSetException;

trait Tcategory {
    
    
    public function checkMulticat(string $cat)
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
    
    /** adds tag (Hashtag term) to post type Album
     * string $tag: 'tag' or 'tag1, tag2'
     */
    /** Example usage:
     * $album = new AlbumPost;
     * $album->save();
     * $album->addTag('tag1, tag2');
     */
    public function addCat($cat, $taxonomy_type, int $parent_id = 0)    

    {   
            $cat = (array)$cat;
            foreach ($this->cattax as $value){
                if($value == $taxonomy_type){
                    if (did_action('init')) {    
                        if ($this->ID == null) {
                            throw new PostIdNotSetException('Error: Call to addTag() function before save()');
                        } else {
                            $args = ['parent'=>$parent_id];
                            foreach ($cat as $key){
                                wp_insert_term($key, $value, $args);
                        }
                            $terms = get_terms([ 'taxonomy'=> $value, 'hide_empty'=>false]);
                            foreach($terms as $term){
                                // _dc($term->term_id);
                                wp_set_post_terms($this->ID, $term->term_id, $value, $append = true);

                            }
                            // wp_set_post_terms($this->ID, $tag, $value, $append = true);
                            /**Hierarchical taxonomies must always pass IDs rather than names ($tag) 
                             * so that children with the same names but different parents aren't confused.*/
                        }
                    } else {
                        throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                    }
                }
            }
        
    } 

    /** removes tag form post type Album
     * $album->removeTag('tag') or $album->removeTag('tag1, tag2')
     */
    public function removeCat(string $tag) 
    {
        if (did_action('init')) {
            if(strpos($tag, ',')) {
                $this->checkMulti($tag);
            } else {
                foreach ($this->getTags() as $term) {
                    if ($term->name == $tag) {
                        $tag_id = $term->term_id;
                        wp_remove_object_terms( $this->ID, $tag_id, $this->taxonomy );
                    }
                }
            }
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }        
    }

    /** returns all post cats as Collection */
    
    public function getCats($taxonomy_type = 'maincat') 
    {
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();
                    $terms = get_terms([ 'taxonomy'=> $value, 'object_ids'=>$this->ID, 'hide_empty'=>false]); 
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

    public function getChildCats($parent_id, $taxonomy_type = 'maincat') 
    {
        $parent_id = (array)$parent_id;
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();
                    foreach($parent_id as $id){
                        $terms = get_terms([ 'taxonomy'=> $value, 'object_ids'=>$this->ID, 'parent'=>$id, 'hide_empty'=>false]); 
                        foreach ($terms as $term) {
                            $taxCollection->addTerm($term);
                        }
                    }
                    return $taxCollection;
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    }

    /** returns all hashtags as Collection */
    public function getAllCats() 
    {
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