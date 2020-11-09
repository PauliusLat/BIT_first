<?php
namespace BIT\app;

use BIT\app\modelTraits\Ttaxonomy;
use BIT\app\modelTraits\Tcategory;
use BIT\app\coreExeptions\InvalidOrderArgException;

class TaxCollection implements \IteratorAggregate
{
    private $tags = [];
    
    public function __construct($tags = []){
        $this->tags = $tags;
    }

    public function getIterator() : TaxIterator
    {
        return new TaxIterator($this);
    }

    public function getTerm($position)
    {
        if (isset($this->tags[$position])) {
            return $this->tags[$position];
        }
        return null;
    }   

    public function addTerm($tag)
    {
        $this->tags[] = $tag;
    }

    /** returns an array of hashtags sorted by name */
    public function sortByName() 
    {
        usort($this->tags, [$this, 'cmpByName']);
        return $this->tags;     
    }

    /** returns an array of hashtags sorted by count (times used) in descending order */

    /** Example usage:
    * $album = new AlbumPost;
    * $album->getAllTags()->sortByCount() */
    public function sortByCount() 
    {
        usort($this->tags, [$this, 'cmpByCount']);
        return $this->tags;        
    }
    
    public function cmpByName($a, $b) 
    {
        return $a->name <=> $b->name;
    }

    public function cmpByCount($a, $b) 
    {
        return $b->count <=> $a->count;
    }

    /** returns a collection of hashtags sorted by $prop */
    /** Example usage:
    * $album = new AlbumPost;
    * $album->getAllTags()->sortBy('count', 'desc') */
    public function sortBy(string $prop, string $order = 'asc') 
    {
        $termProps = ['term_id', 'name', 'slug', 'term_taxonomy_id', 'description', 'count', 'filter'];
        if (in_array($prop, $termProps)) {
            $sortedTags = $this->tags;
            usort($sortedTags, function($a, $b) use ($prop, $order) {
                if ('asc' == $order) {
                    return ($a->$prop <=> $b->$prop);
                } elseif ('desc' == $order) {
                    return ($b->$prop <=> $a->$prop);
                } else {
                    throw new InvalidOrderArgException('Error: the second argument of sortBy() must be \'asc\' or \'desc\'.');
                }
            }); 
            return new self($sortedTags);     
        } else {
            throw new InvalidOrderArgException('Error: the first argument of sortBy() is invalid.');
        }
    }

    /** returns an array (collection object) of hashtag properties 
     * if two or more properties are given, returns a 2D array */

     /** Example usage:
    * $album = new AlbumPost;
    * $album->getAllTags()->sortBy('count', 'desc')->pluck('name', 'slug') */
    public function pluck(...$args)
    {
        $termProps = ['term_id', 'name', 'slug', 'term_taxonomy_id', 'description', 'count', 'filter', 'parent'];
        $pluckedTags = [];
        if ($args) {
            foreach ($args as $arg) {
                if (in_array($arg, $termProps)) {
                    foreach ($this->tags as $itemKey => $itemValue) {
                        if (is_object($itemValue)) {
                            foreach (get_object_vars($itemValue) as $key => $value) {                        
                                if (strcmp((string)$key, (string)$arg) == 0) {
                                    if (count($args) > 1) {
                                        $pluckedTags[$itemKey][$key] = $value;
                                    } else {
                                        $pluckedTags[] = $value;
                                    }
                                }
                            } 
                        } else {
                            if (strcmp((string)$itemKey, (string)$arg) == 0) {
                                $pluckedTags[$itemKey] = $itemValue; 
                            }
                        }
                    }
                } else {
                    throw new InvalidOrderArgException('Error: argument of pluck() is invalid.');
                }
            }
        }
        return new self($pluckedTags); 
    }
}