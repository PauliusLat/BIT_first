<?php

namespace BIT\app;

class Config
{

    public static function postTypeRegister()
    {
        $types = require PLUGIN_DIR_PATH . 'configs/postTypeConfigs.php';
        if ($types) {
            add_action('init', function () use ($types) {
                foreach ($types as $type => $args) {
                    register_post_type($type, $args);
                }
            });
        }
    }

    //cia reikia uzregistruoti visus?
    public static function customTaxonomyRegister()
    {
        $taxonomies = require PLUGIN_DIR_PATH . 'configs/taxonomyConfigs.php';
        if ($taxonomies) {
            add_action('init', function () use ($taxonomies) {
                foreach ($taxonomies as $taxonomy => $args) {
                    register_taxonomy($taxonomy, ['attachment', 'album', 'event', 'news', 'idea'], $args);
                }
            });
        }
    }
}
