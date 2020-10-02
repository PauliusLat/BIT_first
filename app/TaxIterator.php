<?php
namespace BIT\app;

class TaxIterator implements \Iterator 
{
    private $position = 0;
    private $taxCollection;

    public function __construct(TaxCollection $taxCollection)
    {
        $this->taxCollection = $taxCollection;
        $this->position = 0;
    }

    public function rewind() 
    {
        // var_dump(__METHOD__);
        $this->position = 0;
    }

    public function current() 
    {
        // return $this->array[$this->position];
        return $this->taxCollection->getTerm($this->position);
    }

    public function key() 
    {
        return $this->position;
    }

    public function next() 
    {
        ++$this->position;
    }

    public function valid() 
    {
        // return isset($this->array[$this->position]);
        return !is_null($this->taxCollection->getTerm($this->position));
    }
}