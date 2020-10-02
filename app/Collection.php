<?php
namespace BIT\app;

use BIT\app\coreExeptions\wrongArgsTypeExeption;
use stdClass;

class Collection {

    protected $items = [];

    public function __construct($items = []){
        $this->items = $this->getArrayableItems($items);

    }

    public function all()
    {
        return $this->items;
    }

    public function pluck(...$args)
    {
        $pluckedItems = [];
        if($args){
            foreach ($args as $arg) {
                foreach ($this->items as $itemKey => $itemValue) {
                    if(is_object($itemValue)){
                        $vars = get_object_vars($itemValue);
                        $vars['ID'] = $itemValue->__get('ID');
                        foreach ( $vars as $key => $value ) {
                            if(strcmp((string)$key, (string)$arg)==0){
                                $pluckedItems[$itemKey][$key] = $value; 
                            }
                        } 
                    }else{
                        if(strcmp((string)$itemKey, (string)$arg)==0){
                            $pluckedItems[$itemKey] = $itemValue; 
                        }
                    }

                }
            }
        }
        return new self($pluckedItems);
    }

    // public function contains($key, $operator = null, $value = null)
    // {
    //     if (func_num_args() === 1) {
    //         if ($this->useAsCallable($key)) {
    //             $placeholder = new stdClass;

    //             return $this->first($key, $placeholder) !== $placeholder;
    //         }

    //         return in_array($key, $this->items);
    //     }

    //     return $this->contains($this->operatorForWhere(...func_get_args()));
    // }



    protected function getArrayableItems($items){
        if (is_array($items)) {
            return $items;
        }
        elseif ($items instanceof self) {
            return $items->all();
        }

        return (array) $items;
    }
}