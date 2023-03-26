<?php
/**
 * Class Better Smooth Scroll
 * The file that defines the core plugin class
 *
 * @author Mahesh Thorat
 * @link https://maheshthorat.web.app
 * @version 0.2
 * @package Better_Smooth_Scroll
*/
class Better_Smooth_Scroll_Core
{
   /**
    * The unique identifier of this plugin
   */
   protected $plugin_name;

   /**
    * The current version of the plugin
   */
   protected $version;

   /**
    * Define the core functionality of the plugin
   */
   public function __construct()
   {
      $this->plugin_name = BSS_PLUGIN_IDENTIFIER;
      $this->version = BSS_PLUGIN_VERSION;
   }
   public function run()
   {
      /**
       * The admin of plugin class 
       * admin related content and options
      */
      require BSS_PLUGIN_ABS_PATH.'admin/class-better-smooth-scroll-admin.php';

      $plugin_admin = new Better_Smooth_Scroll_Admin($this->get_plugin_name(), $this->get_version());
      if(is_admin())
      {
         add_action('admin_enqueue_scripts', array($plugin_admin, 'enqueue_backend_standalone'));
         add_action('admin_menu', array($plugin_admin, 'return_admin_menu'));
         add_action('init', array($plugin_admin, 'return_update_options'));
         add_filter( 'plugin_action_links_better-smooth-scroll/better-smooth-scroll.php', array($plugin_admin, 'BSS_settings_link'));
      }

      $opts = get_option('_bss_smooth_scroll');

      if(!is_admin())
      {
         $init = false;
         if(@$opts['enable_plugin'] == 'on')
         {
            add_action( 'wp_head', array($this, 'call_action_add_styles') );
            wp_enqueue_script( 'better-smooth-scroll-script', plugin_dir_url( __FILE__ ) . '../includes/js/bettersmoothscroll.js', array(), BSS_PLUGIN_VERSION, false );
         }
      }
      if(is_admin())
      {
         $version = get_option( $this->get_plugin_name() );
         if($version == '')
         {
            $this->my_plugin_options();
         }
      }
   }

   public function my_plugin_options() {
      $opts = array('enable_plugin' => 'on', 'scroll_bar_theme' => 'color_default', 'scroll_bar_color' => '#cccccc', 'scroller_color' => '#444444' );
      update_option('_bss_smooth_scroll', $opts);
      add_option( $this->get_plugin_name(), $this->get_version() );
   }

   public function call_action_add_styles()
   {
      $opts = get_option('_bss_smooth_scroll');
      ?>
      <style type="text/css">
         html {
            overflow: hidden !important;
            margin:0 !important;
         }
         <?php 
         $bodyOverflow = 'overflow: scroll !important;';
         if($opts['scroll_bar_theme'] == 'no_scroll_bar')
         {
            $bodyOverflow = 'overflow: hidden !important;';
         }
         else
         {
            $bodyOverflow = 'overflow: scroll !important;';
         }
         if($opts['scroll_bar_theme'] == 'custom_color')
         {
            $bodyOverflow = 'overflow: hidden !important;';
            ?>
            [data-bss="scrollbar-track-y"] {
               background-color: <?php echo esc_attr($opts['scroll_bar_color']); ?>;
               transition-duration: 0.3s;
               z-index: 9999999 !important;
               width: 1% !important;
            }
            [data-bss="scrollbar-thumb-y"] {
               background-color: <?php echo esc_attr($opts['scroller_color']); ?>;
               transition-duration: 0.3s;
            }
            <?php
         }
         ?>
         body {
            margin:0 !important;
            width: 100vw !important;
            height: 100vh !important;
            <?php echo esc_attr($bodyOverflow); ?>
            overflow-x: hidden !important;
         }
      </style>
      <div id="scrollbar-track-y" data-bss="scrollbar-track-y" tabindex="-1" data-bss-scrollbar-hidden="true" style="contain: style paint; touch-action: none; position: absolute; z-index: 1; top: 0px; right: 0px; width: 17px; height: 100%;"><div data-bss="scrollbar-thumb-y" tabindex="-1" style="position: absolute; touch-action: none; width: 100%; height: 25%;"></div></div>
      <?php
   }

   public function get_plugin_name()
   {
      return $this->plugin_name;
   }
   public function get_version()
   {
      return $this->version;
   }
}

?>