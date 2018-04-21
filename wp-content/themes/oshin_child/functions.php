<?php

define('TRIBE_HIDE_UPSELL', true);

add_action( 'after_setup_theme', 'be_themes_child_theme_setup' );
function be_themes_child_theme_setup() {

  // add_theme_support( 'slide' );
  // add_image_size( 'slide', 1920, 1080, true );
  
  add_filter( 'image_size_names_choose', 'be_themes_image_sizes' );

  load_child_theme_textdomain( 'be-themes', get_stylesheet_directory() . '/languages' );
}

/* ---------------------------------------------  */
// Enqueue Stylesheets
/* ---------------------------------------------  */
if (!function_exists( 'be_themes_add_styles' ) ) {
	function be_themes_add_styles() {	

		wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );

		wp_register_style( 'be-style-css', get_stylesheet_uri() );
		wp_enqueue_style( 'be-style-css' );
		wp_register_style( 'be-themes-layout', get_template_directory_uri().'/css/layout.css' );
		wp_enqueue_style( 'be-themes-layout' );	
		wp_register_style( 'icomoon', get_template_directory_uri().'/fonts/icomoon/style.css' );
		wp_enqueue_style( 'icomoon' );	
		wp_register_style( 'be-lightbox-css', get_template_directory_uri().'/css/magnific-popup.css' );
		wp_enqueue_style( 'be-lightbox-css' );
		wp_register_style( 'be-flexslider', get_template_directory_uri().'/css/flexslider.css' );
		wp_enqueue_style( 'be-flexslider' );
		wp_register_style( 'be-animations', get_template_directory_uri().'/css/animate-custom.css' );
		wp_enqueue_style( 'be-animations' );
		wp_register_style( 'be-slider', get_template_directory_uri().'/css/be-slider.css' );
		wp_enqueue_style( 'be-slider' );

		wp_enqueue_style( 'icons-style', get_stylesheet_directory_uri() . '/icons.css' );
		wp_enqueue_style( 'calendar-style', get_stylesheet_directory_uri().'/calendar.css' );
		wp_enqueue_style( 'footer-style', get_stylesheet_directory_uri().'/footer.css' );
		wp_enqueue_style( 'mediaqueries-style', get_stylesheet_directory_uri().'/mediaqueries.css' );
		wp_enqueue_style( 'navbar-style', get_stylesheet_directory_uri().'/navbar.css' );
		wp_enqueue_style( 'menu-style', get_stylesheet_directory_uri().'/menu.css' );
	}
	
	add_action( 'wp_enqueue_scripts', 'be_themes_add_styles');
}





add_shortcode( 'get_terms', 'get_terms_func' );
// [get_terms post_id="" taxonomy="" term=""]
function get_terms_func($atts) {
  $a =  shortcode_atts(
      array(), $atts );
        
  $terms = get_the_terms( get_the_ID(), 'portfolio_tags' );
    
  $draught_links = array();
    
  if (is_array($terms)){ 
    foreach ( $terms as $term ) {
      $draught_links[] = $term->name;
    }
    
    return implode (", ", $draught_links);
  }
}


/**
 * Removes the iCal and Google cal links from the single event page
 */
function tribe_remove_single_calendar_links() {
	if ( function_exists( 'tribe' ) ) {
		remove_action( 'tribe_events_single_event_after_the_content', array( tribe( 'tec.iCal' ), 'single_event_links' ) );
	}
}
add_action( 'init', 'tribe_remove_single_calendar_links' );