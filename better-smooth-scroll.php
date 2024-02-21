<?php

/**
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://maheshthorat.web.app
 * @since             0.1
 * @package           better_smooth_scroll
 *
 * Plugin Name: Better Smooth Scroll
 * Plugin URI: https://wordpress.org/plugins/better-smooth-scroll/
 * Description: A lightweight and very fast javascript library that provides enriched versions of the browsers' scrolling APIs with support for smooth-scrolling, callbacks and many other features.
 * Version: 1.1
 * Author: Mahesh Thorat
 * Author URI: https://maheshthorat.web.app
 **/

/**
 * Prevent file to be called directly
 */
if ((!defined('ABSPATH')) || ('better-smooth-scroll.php' == basename($_SERVER['SCRIPT_FILENAME']))) {
   die;
}

/**
 * Define Constants
 */
define('BSS_PLUGIN_FULLNAME', 'Better Smooth Scroll');
define('BSS_PLUGIN_IDENTIFIER', 'better-smooth-scroll');
define('BSS_PLUGIN_VERSION', '1.1');
define('BSS_PLUGIN_LAST_RELEASE', '2022/02/04');
define('BSS_PLUGIN_LANGUAGES', 'English');
define('BSS_PLUGIN_ABS_PATH', plugin_dir_path(__FILE__));

/**
 * The core plugin class that is used to define internationalization
 * admin-specific hooks and public-facing site hooks
 */
require BSS_PLUGIN_ABS_PATH . 'includes/class-better-smooth-scroll-core.php';


/**
 * Begins execution of the plugin
 */
if (!function_exists('run_better_smooth_scroll')) {
   function run_better_smooth_scroll()
   {
      $plugin = new Better_Smooth_Scroll_Core();
      $plugin->run();
   }
   run_better_smooth_scroll();
}
