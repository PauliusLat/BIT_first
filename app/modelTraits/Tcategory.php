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

    // add category to DB
    public function addCat($cat, $parent_id = 0, $description = '',  $slug = '', $taxonomy_type = 'maincat'){
        
        $cat = (array)$cat;
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {    
                    // if ($this->ID == null) {
                    //     throw new PostIdNotSetException('Error: Call to addTag() function before save()');
                    // } else {
                        $args = ['parent'=>$parent_id, 'description'=>$description, 'slug' => $slug, 'taxonomy_type' => $taxonomy_type];
                        foreach ($cat as $key){
                            wp_insert_term($key, $value, $args);
                        }
                    // }
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    }

    public function updateCat(int $id, string $name, string $description, $parent_id = 0, string $slug = '', $taxonomy_type = 'maincat'){
        if (did_action('init')) {    
                $args = ['parent'=>$parent_id, 'description'=>$description, 'slug' => $slug, 'name' => $name];
                wp_update_term($id, $taxonomy_type, $args);
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }

     //get category id by name
    public function getCatId($name, $taxonony_type = 'maincat'){
        $cat = get_term_by('name', $name, $taxonony_type);
        return $cat->term_id;
    }

    //get category name by id
    public function getCatName($id, $taxonony_type = 'maincat'){
        $cat = get_term_by('id', $id, $taxonony_type);
        return $cat->name;
    }

    //get category by id
    public function getCat($id, $taxonony_type = 'maincat'){
        $cat = get_term_by('id', $id, $taxonony_type);
        return $cat;
    }

     //adds image to category
    public function addImageToCat(int $term_id, string $meta_key, $image){
        add_term_meta($term_id, $meta_key, $image);
    }

     //gets category image from db
    public function getCatImage(int $term_id, string $meta_key){
       $image = get_term_meta($term_id, $meta_key);
       return $image;
    }

     //deletes category image from db
    public function deleteCatImage(int $term_id, string $meta_key, $meta_value = ''){
        delete_metadata('term', $term_id, $meta_key, $meta_value);
    }

    //deletes category from db
    public function deleteCatFromDb(int $id, $taxonomy_type = 'maincat'){
        wp_delete_term($id, $taxonomy_type);
    }

    //attach category to post type
    public function attachCat($cat, $taxonomy_type = 'maincat')
    {   
        $cat = (array)$cat;
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {    
                    if ($this->ID == null) {
                        throw new PostIdNotSetException('Error: Call to attachCat() function before save()');
                    } else {
                        // $args = ['parent'=>$parent_id];
                        // foreach ($cat as $key){
                        //     wp_insert_term($key, $value, $args);
                        // }
                        $terms = get_terms(['name'=>$cat, 'taxonomy'=> $value, 'hide_empty'=>false]);
                        // _dc($terms);
                        foreach($terms as $term){
                            wp_set_post_terms($this->ID, $term->term_id, $value, $append = true);
                        }
                        /**Hierarchical taxonomies must always pass IDs rather than names ($tag) 
                         * so that children with the same names but different parents aren't confused.*/
                    }
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    } 

    //removes category form post type
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

     /** removes cat form post type
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

    // private function checkChildren($cat, $taxonomy_type = 'maincat'){
    //     $array = get_term_children($cat, $taxonomy_type);
    //     return $array;

    // }

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
                        if(isset($this->ID)){
                            $terms = get_terms([ 'taxonomy'=> $value, 'object_ids'=>$this->ID, 'parent'=>$id, 'hide_empty'=>false]);
                        } 
                        else{
                            $terms = get_terms([ 'taxonomy'=> $value, 'parent'=>$id, 'hide_empty'=>false]);
                        }
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

    public function get_taxonomy_hierarchy( $taxonomy = 'maincat', $parent=0) {
        // only 1 taxonomy
        $taxonomy=is_array( $taxonomy) ? array_shift( $taxonomy): $taxonomy;
        $terms=$this->getChildCats($parent, $taxonomy);
        // _dc($terms);
        if (did_action('init')) {
            $taxCollection = new TaxCollection();
            foreach ( $terms as $term) {
                // recurse to get the direct decendants of "this" term
                $term->children = $this->get_taxonomy_hierarchy( $taxonomy, $term->term_id);

                $taxCollection->addTerm($term);
            }
            return $taxCollection;
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }


    public function getChildCats_arr($parent_id, $taxonomy_type = 'maincat') 
    {
        $parent_id = (array)$parent_id;
        foreach ($this->cattax as $value){
            if($value == $taxonomy_type){
                if (did_action('init')) {
                   $children = [];
                    foreach($parent_id as $id){
                        if(isset($this->ID)){
                            $terms = get_terms([ 'taxonomy'=> $value, 'object_ids'=>$this->ID, 'parent'=>$id, 'hide_empty'=>false]);
                        } 
                        else{
                            $terms = get_terms([ 'taxonomy'=> $value, 'parent'=>$id, 'hide_empty'=>false]);
                        }
                        foreach ($terms as $term) {
                            $children[ $term->term_id ] = $term;
                        }
                    }
                    return $children;
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    }
    // get taxonomies as arr, not collection
    public function get_taxonomy_hierarchy_arr($level, $taxonomy = 'maincat', $parent=0) {
        // only 1 taxonomy
        $taxonomy=is_array( $taxonomy) ? array_shift( $taxonomy): $taxonomy;
        $terms=$this->getChildCats_arr($parent, $taxonomy);
        // _dc($terms);
       
      
        //  _dc($terms);
        if (did_action('init')) {
            $children = [];
            foreach ( $terms as $term) {
            
                $children[ $term->term_id ] = $term;
            
            if($term->parent == 0)
            {
                $term->level = 0;
                $term->children = $this->get_taxonomy_hierarchy_arr($term->level, $taxonomy, $term->term_id);

            }
            else
            {
                $term->level = $level+1;
                $term->children = $this->get_taxonomy_hierarchy_arr($term->level, $taxonomy, $term->term_id);
            }
            
            
            
          

            $term->children = $this->get_taxonomy_hierarchy_arr($term->level, $taxonomy, $term->term_id);
            

            // $children[$term->level]= $level+1;
            // _dc($children[$term->level]);
            // if($term->parent != 0){
                // $level++;
            // }
           
            }
            return $children;
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }
       
    public function print_taxonomy_hierarchy( $taxonomy, $parent = 0 ) {
        // // only 1 taxonomy
        // $level = 0;
        // $parent = 0;
        $taxonomy = is_array( $taxonomy ) ? array_shift( $taxonomy ) : $taxonomy;
        // get all direct descendants of the $parent
        $terms = get_terms( $taxonomy, array( 'parent' => $parent,  'hide_empty'=> 0,) );
       
        // prepare a new array.  these are the children of $parent
        // we'll ultimately copy all the $terms into this new array, but only after they
        // find their own children
        $children = array();
        // go through all the direct descendants of $parent, and gather their children
        foreach ( $terms as $term ){
            //  if($term->parent == $parent){
            //         $term->level = $level;
            //     }
            // recurse to get the direct descendants of "this" term
            $term->children = $this->print_taxonomy_hierarchy( $taxonomy, $term->term_id );
            // add the term to our new array
            $children[ $term->term_id ] = $term;
        }
        // send the results back to the caller
        return $children;
    }

        //nesigauna niekas 
    public function printHierarchy(){
           
            $terms = $this->get_taxonomy_hierarchy_arr('maincat');
        //   _dc($terms);
                          $level = 0;
                          $sorted = [];
                          $parent = 0;
                          $sorter = function ($parent = 0) use (&$terms, &$sorted, &$level, &$sorter){
                              foreach ($terms as $key => $term){
                              
                                  if($term->parent == $parent){
                                    //    _dc( $term->parent);
                                      $term->level = $level;
                                  
                                      $sorted[] = $term;
                                      unset($terms[$key]);
                                      $level++;
                                  
                                      $sorter($term->id);
                                      $level--;
                                      // _dc($term->level);
                                      // _dc($term);
                                      
                                  }
                          
                                  ?>
                              <span style = "margin-left:200px;"><?=str_repeat('-', $term->level)?> <?=$term->name?></span><br>
                              <?php
                              }
        
                             
                              
                          };
                        //   $sorter();
     }
 

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