<?php

namespace BIT\app;

use BIT\app\coreExeptions\wrongArgsTypeExeption;
use stdClass;

class Collection
{

    protected $items = [];

    public function __construct($items = [])
    {
        $this->items = $this->getArrayableItems($items);
    }

    public function all()
    {
        return $this->items;
    }

    public function pluck(...$args)
    {
        $pluckedItems = [];
        if ($args) {
            foreach ($args as $arg) {
                foreach ($this->items as $itemKey => $itemValue) {
                    if (is_object($itemValue)) {
                        $vars = get_object_vars($itemValue);
                        $vars['ID'] = $itemValue->__get('ID');
                        foreach ($vars as $key => $value) {
                            if (strcmp((string)$key, (string)$arg) == 0) {
                                $pluckedItems[$itemKey][$key] = $value;
                            }
                        }
                    } else {
                        if (strcmp((string)$itemKey, (string)$arg) == 0) {
                            $pluckedItems[$itemKey] = $itemValue;
                        }
                    }
                }
            }
        }
        return new self($pluckedItems);
    }

    public function pageState($state = '')
    {
        $state = (string)$state;
        $stateItems = [];
        foreach ($this->items as $value) {
            if (in_array($state, $value->pageState)) {
                $stateItems[$value->ID] = $value;
            }
        }
        return new self($stateItems);
    }

    public function getPageState(array $pageState)
    {
    }

    public function shortCode($shortCode = '')
    {
        $shortCode = (string)$shortCode;
        $shItems = [];
        foreach ($this->items as $value) {
            $shCode = substr((explode(' ', $value->post_content))[1], 6);
            if (strcmp($shCode, $shortCode) === 0) {
                $shItems[$value->ID] = $value;
            }
        }
        return new self($shItems);
    }


    protected function getArrayableItems($items)
    {
        if (is_array($items)) {
            return $items;
        } elseif ($items instanceof self) {
            return $items->all();
        }

        return (array) $items;
    }
}
