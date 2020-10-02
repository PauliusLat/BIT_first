<?php
namespace BIT\app\modelTraits;

use BIT\app\TaxCollection;
use BIT\app\coreExeptions\InitHookNotFiredException;
use BIT\app\coreExeptions\PostIdNotSetException;

trait Talbum {

    public $album_date = 'YYYY-MM_DD';
    public $album_content = '';
    private $taxonomy = 'hashtag';
     
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
    
    /** adds tag (Hashtag term) to post type Album
     * string $tag: 'tag' or 'tag1, tag2'
     */
    /** Example usage:
     * $album = new AlbumPost;
     * $album->save();
     * $album->addTag('tag1, tag2');
     */
    public function addTag(string $tag)    
    {
        if (did_action('init')) {
            // if (!term_exists( $tag, $this->taxonomy )) {
            //     wp_insert_term( $tag, $this->taxonomy, ['slug' => str_replace(' ', '-', $tag)] );                           
            // }
            
            if ($this->ID == null) {
                throw new PostIdNotSetException('Error: Call to addTag() function before save()');
            } else {
                wp_set_post_terms( $this->ID, $tag, $this->taxonomy, $append = true );
                /**Hierarchical taxonomies must always pass IDs rather than names ($tag) 
                 * so that children with the same names but different parents aren't confused.*/
            }
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    } 

    /** removes tag form post type Album
     * $album->removeTag('tag') or $album->removeTag('tag1, tag2')
     */
    public function removeTag(string $tag) 
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

    /** returns all post tags as Collection */
    public function getTags() 
    {
        if (did_action('init')) {
            $taxCollection = new TaxCollection();
            $terms = get_the_terms($this->ID, $this->taxonomy);

            foreach ($terms as $term) {
                $taxCollection->addTerm($term);
            }
            return $taxCollection;
        } else {
            throw new InitHookNotFiredException('Error: Call to custom taxonomy function before init hook is fired.');
        }
    }

    /** returns all hashtags as Collection */
    public function getAllTags() 
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