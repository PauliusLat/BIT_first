<?php

namespace BIT\app;

use Symfony\Component\HttpFoundation\Request;

class RequestId
{
    public $id;

    public function __construct(Request $request)
    {
        $this->id = $request->query->get('id');
    }

    public function __toString()
    {
        return $this->id ?? '';
    }
}
