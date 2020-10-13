<?php
namespace BIT\app\modelTraits;

use BIT\app\TaxCollection;
use BIT\app\coreExeptions\InitHookNotFiredException;
use BIT\app\coreExeptions\PostIdNotSetException;

trait Tcategory {
    
    public function checkMulticat(string $cat)
    {
        if (did_action('init')) {       
            $cats = explode(', ', $cat);
            foreach ($cats as $key => $term) {
                foreach ($this->getCats() as $post_term) {
                    if ($post_term->name == $term) {
                        $cat_ids[] = $post_term->term_id;                    
                    }
                }
            }
            wp_remove_object_terms( $this->ID, $cat_ids, $this->cattax );
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }    
    }
    
    /** adds cat (Maincat term) to post type Album
     */
    /** Example usage:
     * $album = new AlbumPost;
     * $album->save();
     * $album->addCat('cat1', 'maincat'); or $album->addCat(['cat1', 'cat2'], 'maincat', 45));*/

    public function addCat($cat, $taxonomy_type, int $parent_id = 0)    // ar gali buti dvi default reiksmes

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
                        $terms = get_terms(['name'=>$cat, 'taxonomy'=> $value, 'hide_empty'=>false]);
                       
                        foreach($terms as $term){

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

    //padaryti, kad neleistu trinti kategorijos, kuti turi vaiku - ar to reikia?
    private function catDelete(string $cat, $taxonomy_type = 'maincat') 
    {
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                    if(strpos($cat, ',')) {
                        $this->checkMulti($cat);
                    } else {
                        foreach ($this->getAllCats() as $term) {
                            if ($term->name == $cat) {
                                $cat_id = $term->term_id;
                                wp_remove_object_terms( $this->ID, $cat_id, $taxonomy_type );
                            }
                        }
                    }
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }  
            }  
        }
    }

     /** removes cat form post type Album
     * $album->removeCat('cat') or $album->removeCat(['cat1', 'cat2'])
     */

    public function removeCat($cat, $taxonomy_type = 'maincat'){

        
            if(is_string($cat)){
                $this->catDelete($cat, $taxonomy_type);
            }if(is_array($cat)){
                foreach($cat as $key){
                    $this->catDelete($key, $taxonomy_type);
                }
            }
    }

    private function checkChildren($cat, $taxonomy_type = 'maincat'){
        $array = get_term_children($cat, $taxonomy_type);
        return $array;

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

    /** returns all cats as Collection */
    public function getAllCats($taxonomy_type = 'maincat') 
    {
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();

                    $args = ['taxonomy' => $this->cattax, 'hide_empty' => 0,];
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