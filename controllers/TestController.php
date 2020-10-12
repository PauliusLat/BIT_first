<?php

namespace BIT\controllers;

// use BIT\app\App;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TestController {
    public function __construct()
    {
        //
    }

    function testing(Request $request) {
        // $obj = {value: 'displayValue'};
        // return json_encode($obj);
        // echo json_encode([value'not something']);
        // var_dump($request->query->get('route'));
        // echo 'not something';

        // logic, logic, get object from DB... logic, process params

        // $kazkokie = EventPost::all();
        // $kazkas = EventPost::get($post_id);
        // $kazkas->event_description = ‘tekstas is requesto, geto arba posto’;
        // $kazkas->event_date = 'YYYY-MM-DD';
        // $kazkas->save();

        $response = new Response;
        // $content = View::render('zebras.bebras', ['z' => 86, ...]);
        // 'zebras.bebras' - aktyvioje temoje, folder Views, folder zebras, bebras.php (php + html mix)
        $response->prepare($request);
        $response->setContent(json_encode(['a' => 'aaaaaa']));
        return $response;
    }

    function front() {
        // put JS here and load view through API
        echo 'Paulione';
  
    }
}