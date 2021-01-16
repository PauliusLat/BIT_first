<?php

// namespace BIT\controllers\controllerTraits;

// trait Tpagination
// {
//     public function setPage($limit, $number)
//     {
//         $offset = ($number - 1)  * $limit;
//         $total = wp_count_terms('hashtag', ['hide_empty' => false]);
//         $pages = ceil($total / $limit);

//         if ($number < $pages) {
//             $nextpage = $number + 1;
//         } else {
//             $nextpage = $number;
//         }

//         if ($number > 1) {
//             $prevpage = $number - 1;
//         } else {
//             $prevpage = $number;
//         }

//         $lastpage = $pages;
//         $firstpage = 1;

//         return ['pages' => $pages, 'offset' => $offset, 'nextpage' => $nextpage, 'prevpage' => $prevpage, 'lastpage' => $lastpage, 'firstpage' => $firstpage, 'offset' => $offset];
//     }
// }
