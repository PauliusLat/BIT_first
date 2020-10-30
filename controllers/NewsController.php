<?php

namespace BIT\controllers;

use BIT\app\View;
use BIT\app\Attachment;
use BIT\app\Query;
use BIT\models\NewsPost;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;


class NewsController {

    public function index(){

        return View::adminRender('news.create');

    }

    public function list(Request $request) 
    {           
        var_dump(get_permalink(940, true));
        $news = NewsPost::all()->pluck('post_date', 'post_title', 'ID', 'attachments')->all();
        foreach ($news as &$value) {
            if($value){
                foreach ($value['attachments'] as $img) {
                    $value['attachments'] = $img->getUrl();
                }
            }else{
                $value['attachments'] = '';
            }
        }
        $output = View::adminRender('news.create');
        $response = new JsonResponse(['html' => $output, 'data' => $news]);

		return $response;

    }
    public function create(Request $request) {

    }

    
    
    public function store(Request $request, NewsPost $newsPost) 
    {   
        // foreach ($request->files->all() as $file) {
            $post = Attachment::get(783);
            $post->setDescription('NNNNNNNNNNN');
            $post->setAlt('BBBBBBBB');
            $post->save(null, 760);        
            _dc($file);

        // }
       
        // $new = new Attachment();
        // $new->setCaption('antrasA');
        // $new->setDescription('treciasA');
        // $new->setAlt('treciasA');
        // $new->save();

        // $new_news = new NewsPost();
        
        // $new_news->news_content = $request->request->get('news-content');
        // $new_news->news_content = $request->content->get('content');        
        // $newsPost->news_content = $request->query->get('content');
        // $new_news->news_content = $request->query->get('content');
        
        // $newsPost->save();
       
        _dc($request);

        // $new_news->attachments = [u, i, j];
        
        // var_dump($newsPost);
        // $new_content = $newsPost->news_content;
        // var_dump($new_content);
        // $new_news_attachment = new Attachment();
        // $new_news_attachment->save('news-picture', $postID);
        
        // $new_news_attachment->attachments = [o, p, u];
        // var_dump($new_news_attachment);
        // $new_news->attachments = $_FILES['news-picture'];
        // $new_news = new NewsPost();
        // $new_news->news_content = $request->get('content');
        // $new_news->save();
        
        // $inputName = 'photo';
        // $attachment = new Attachment();
        // $attachment->save($inputName, $new_news->ID);
        //atsiskirti attachment, kintamajame, wordpress irasytu attachment - 3 failai

        // var_dump($request);
        // // $new_news->news_content = 'hey';
        // $new_news->save();

        $response = new Response;
        $response->prepare($request);
        $response->setContent(json_encode(['html' => $this->index()]));
        return $response;

        // print_r($news_content.value);
    }


    public function show (){}

    public function edit (){}

    public function update(Request $request, NewsPost $newsPost)
    {   
        $newsPost->news_content = $request->get('news-content');
        
        $newsPost->save();
        

        $news = NewsPost::all();

        $response = new Response;
        $response->prepare($request);
        $response->setContent(json_encode(['list' => 'hello']));
        // $response->setContent(json_encode(['list' => View::adminRender('news.list', ['news' => $news])]));
        return $response;
    }

    public function destroy(NewsPost $newsPost) {   
     
        $newsPost->delete();
		return new Response;
         
    }
    protected function decodeRequest($request){

		if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
			$data = json_decode($request->getContent(), true);
			$request->request->replace(is_array($data) ? $data : array());
		}

        return $request;
	}
}