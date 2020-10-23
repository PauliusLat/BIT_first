<?php
namespace BIT\app;
use Symfony\Component\HttpFoundation\Request;

class RequestId
{
    public $id;

    public function __construct(Request $request)
    {
       
        (string)$this->id = (string)$request->query->get('id');
    }

    public function __toString() {
        return $this->id ?? '';
    }
}