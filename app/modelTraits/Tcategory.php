<?php

namespace BIT\app\modelTraits;

use BIT\app\TaxCollection;
use BIT\app\App;
use BIT\app\coreExeptions\InitHookNotFiredException;
use BIT\app\coreExeptions\PostIdNotSetException;

trait Tcategory
{

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
            wp_remove_object_terms($this->ID, $cat_ids, $this->cattax);
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
    public function addCat($cat, $parent_id = 0, $description = '',  $slug = '', $taxonomy_type = 'maincat')
    {

        $cat = (array)$cat;
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
                if (did_action('init')) {
                    $args = ['parent' => $parent_id, 'description' => $description, 'slug' => $slug, 'taxonomy_type' => $taxonomy_type];
                    foreach ($cat as $key) {
                        $categ = get_term_by('name', $key, 'maincat');
                        if ($categ->name == $key) {
                            echo '<pre>';
                            var_dump(get_term_by('name', $key, 'maincat'));
                            $session = App::start()->getService('session');
                            $session->flash('message', 'tokiu pavadinimu kategorija jau sukurta');
                            $categ->name != $key;
                        }

                        wp_insert_term($key, $value, $args);
                    }
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    }

    public function updateCat(int $id, string $name, string $description, $parent_id = 0, string $slug = '', $taxonomy_type = 'maincat')
    {
        if (did_action('init')) {
            $args = ['parent' => $parent_id, 'description' => $description, 'slug' => $slug, 'name' => $name];
            wp_update_term($id, $taxonomy_type, $args);
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }

    //get category id by name
    public function getCatId($name, $taxonony_type = 'maincat')
    {
        $cat = get_term_by('name', $name, $taxonony_type);
        return $cat->term_id;
    }

    //get category name by id
    public function getCatName($id, $taxonony_type = 'maincat')
    {
        $cat = get_term_by('id', $id, $taxonony_type);
        return $cat->name;
    }

    //get category by id
    public function getCat($id, $taxonony_type = 'maincat')
    {
        $cat = get_term_by('id', $id, $taxonony_type);
        return $cat;
    }

    //adds image to category
    public function addImageToCat(int $term_id, string $meta_key, $image)
    {
        add_term_meta($term_id, $meta_key, $image);
    }

    //gets category image from db
    public function getCatImage(int $term_id, string $meta_key)
    {
        $image = get_term_meta($term_id, $meta_key);
        return $image;
    }

    //deletes category image from db
    public function deleteCatImage(int $term_id, string $meta_key, $meta_value = '')
    {
        delete_metadata('term', $term_id, $meta_key, $meta_value);
    }

    //deletes category from db
    public function deleteCatFromDb(int $id, $taxonomy_type = 'maincat')
    {
        wp_delete_term($id, $taxonomy_type);
    }

    //attach category to post type
    public function attachCat($cat, $taxonomy_type = 'maincat')
    {
        $cat = (array)$cat;
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
                if (did_action('init')) {
                    if ($this->ID == null) {
                        throw new PostIdNotSetException('Error: Call to attachCat() function before save()');
                    } else {
                        $terms = get_terms(['name' => $cat, 'taxonomy' => $value, 'hide_empty' => false]);

                        foreach ($terms as $term) {
                            wp_set_object_terms($this->ID, $term->term_id, $value, $append = true);
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

    //removes category from post type
    private function catDelete(string $cat, $taxonomy_type = 'maincat')
    {
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
                if (did_action('init')) {
                    if (strpos($cat, ',')) {
                        $this->checkMulti($cat);
                    } else {
                        foreach ($this->getAllCats() as $term) {
                            if ($term->name == $cat) {
                                $cat_id = $term->term_id;
                                wp_remove_object_terms($this->ID, $cat_id, $taxonomy_type);
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

    public function removeCat($cat, $taxonomy_type = 'maincat')
    {

        if (is_string($cat)) {
            $this->catDelete($cat, $taxonomy_type);
        }
        if (is_array($cat)) {
            foreach ($cat as $key) {
                $this->catDelete($key, $taxonomy_type);
            }
        }
    }


    /** returns all post cats as Collection */

    public function getCats($taxonomy_type = 'maincat')
    {
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();
                    $terms = get_terms(['taxonomy' => $value, 'object_ids' => $this->ID, 'hide_empty' => false]);
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
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
                if (did_action('init')) {
                    $taxCollection = new TaxCollection();
                    foreach ($parent_id as $id) {
                        if (isset($this->ID)) {
                            $terms = get_terms(['taxonomy' => $value, 'object_ids' => $this->ID, 'parent' => $id, 'hide_empty' => false]);
                        } else {
                            $terms = get_terms(['taxonomy' => $value, 'parent' => $id, 'hide_empty' => false]);
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

    public function getTaxonomyHierarchy($plevel = 1, $taxonomy = 'maincat', $parent = 0)
    {
        // only 1 taxonomy
        $taxonomy = is_array($taxonomy) ? array_shift($taxonomy) : $taxonomy;
        $terms = $this->getChildCats($parent, $taxonomy);
        // _dc($terms);
        if (did_action('init')) {
            $taxCollection = new TaxCollection();
            foreach ($terms as $term) {
                $taxCollection->addTerm($term);
                // recurse to get the direct decendants of "this" term
                if ($term->parent == 0) {
                    $term->level = 0;
                    $term->children = $this->getTaxonomyHierarchy($term->level, $taxonomy, $term->term_id);
                } else {
                    $term->level = $plevel + 1;
                    $term->children = $this->getTaxonomyHierarchy($term->level, $taxonomy, $term->term_id);
                }
            }
            return $taxCollection;
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }

    public function getTaxonomyHierarchyArr($plevel = 0, $taxonomy = 'maincat', $parent = 0)
    {
        // only 1 taxonomy
        $taxonomy = is_array($taxonomy) ? array_shift($taxonomy) : $taxonomy;
        $terms = $this->getChildCatsArr($parent, $taxonomy);
        // _dc( $terms);
        if (did_action('init')) {
            $cat = [];
            foreach ($terms as $term) {
                $cat[] = $term;

                if ($term->parent == 0) {
                    $term->level = 0;
                    $term->children = $this->getTaxonomyHierarchyArr(0, $taxonomy, $term->term_id);
                } else {
                    $term->level = $plevel + 1;
                    $term->children = $this->getTaxonomyHierarchyArr($term->level, $taxonomy, $term->term_id);
                }
            }
            return $cat;
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }

    public function getChildCatsArr($parent_id, $taxonomy_type = 'maincat')
    {
        $parent_id = (array)$parent_id;
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
                if (did_action('init')) {
                    $children = [];
                    foreach ($parent_id as $id) {
                        if (isset($this->ID)) {
                            $terms = get_terms(['taxonomy' => $value, 'object_ids' => $this->ID, 'parent' => $id, 'hide_empty' => false]);
                        } else {
                            $terms = get_terms(['taxonomy' => $value, 'parent' => $id, 'hide_empty' => false]);
                        }
                        foreach ($terms as $term) {
                            $children[$term->term_id] = $term;
                        }
                    }
                    return $children;
                } else {
                    throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
                }
            }
        }
    }


    public function flattenArray($array)
    {
        static $flattened = [];
        if (is_array($array) && count($array) > 0) {
            foreach ($array as $member) {
                if (empty($member->children)) {
                    $flattened[] = $member;
                } else {
                    $this->flattenArray($member->children);
                    unset($member->children);
                    $flattened[] = $member;
                }
            }
        }
        return $flattened;
    }


    public function getAllCats($taxonomy_type = 'maincat')
    {
        foreach ($this->cattax as $value) {
            if ($value == $taxonomy_type) {
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
