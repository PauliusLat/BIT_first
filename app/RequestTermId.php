<?php

namespace BIT\app;

use Symfony\Component\HttpFoundation\Request;

class RequestTermId
{
    public $id;

    public function __construct(Request $request)
    {
        $this->id = $request->query->get('term_id');
    }

    public function __toString()
    {
        return $this->id ?? '';
    }
}
