<?php
/**
 * Single Event Template
 * A single event. This displays the event title, description, meta, and
 * optionally, the Google map for the event.
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/single-event.php
 *
 * @package TribeEventsCalendar
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

$events_label_singular = tribe_get_event_label_singular();
$events_label_plural = tribe_get_event_label_plural();
$event_id = get_the_ID();
$venue_id = get_the_ID();
$full_region = tribe_get_full_region( $venue_id );
?>


<!-- [section bg_color= "" bg_repeat= "repeat" bg_attachment= "scroll" bg_position= "top left" bg_animation= "none" border_size= "" border_color= "" padding_top= "0" padding_bottom= "0" padding_edge= "" bg_video_mp4_src= "" bg_video_ogg_src= "" bg_video_webm_src= "" overlay_color= "" overlay_opacity= "" section_id= "" section_class= "" section_title= "" full_screen_header_scheme= "background--light"][row no_wrapper= "1" no_margin_bottom= "1" no_space_columns= "1" column_spacing= "0" row_id= "" row_class= ""][one_col][gallery col= "one" lightbox_type= "magnific" items_per_load= "1" gallery_paginate= "none" gutter_style= "style1" gutter_width= "0" initial_load_style= "none" hover_style= "style1-hover" hover_content_option= "icon" hover_content_color= "" default_image_style= "color" hover_image_style= "color" image_effect= "none" overlay_color= "#9e1b7e" gradient_color= "#9e1b7e" gradient_direction= "right" overlay_opacity= "85" image_source= "selected" images= "3579" account_name= "themeforest" count= "10"][/one_col][/row][/section] -->
<?php 
// if ( has_post_thumbnail() ) {
//     echo get_the_post_thumbnail();
// }
?>
<?php 
// $next_event = tribe_get_events( array(
//  'posts_per_page' => 1,
//  ) );

// $prev_event = tribe_get_events( array(
//  'posts_per_page' => 1,
//  'start_date' => date(tribe_get_start_date())
//  ) );

// print_r($next_event);
?>

	<ul class="tribe-events-sub-nav">
		<li class="tribe-events-nav-previous">
			<?php tribe_the_prev_event_link( '
			<i class="font-icon icon-arrow-left7"></i>
			<span class="hideonmobile">%title%</span>
			<span class="showonmobile">Vorige</span>
			') ?>
		</li><li class="tribe-events-nav-back"><a href=" <?php echo esc_url( tribe_get_events_link() ); ?>">Terug naar agenda</a></li><li class="tribe-events-nav-next">
			<?php tribe_the_next_event_link('
				<span class="hideonmobile">%title%</span>
				<span class="showonmobile">Volgende</span>
				<i class="font-icon icon-arrow-left7"></i>
				') ?>
		</li>
	</ul>
	<div id="tribe-events-content" class="tribe-events-single">
	<div id="tribe-events-header" <?php tribe_events_the_header_attributes() ?>>
		<!-- Navigation -->
		<h3 class="tribe-events-visuallyhidden"><?php printf( esc_html__( '%s Navigation', 'the-events-calendar' ), $events_label_singular ); ?></h3>
<?php $map = tribe_get_embedded_map();
if ( !empty( $map ) ) { ?>
<div class="tribe-events-venue-map gm-style">
<?php do_action( 'tribe_events_single_meta_map_section_start' ); ?>
<?php// echo $map; ?>
<?php do_action( 'tribe_events_single_meta_map_section_end' ); ?>
</div><?php } ?>
	</div><!-- Notices --><?php //tribe_the_notices() ?>
<div class="event-container">
<!-- 	<div class="event-left"></div> --><!-- left --><!-- <div class="event-right"> -->

	<h1><?php the_title(); ?></h1>
			<h2><?php echo tribe_get_venue();?>
			<div class="event-times">
			<?php if ( tribe_get_address( $venue_id ) ) : ?>
			<span class="tribe-street-address"><?php echo tribe_get_address( $venue_id ); ?></span>
			<?php endif; ?><br><?php if ( tribe_get_zip( $venue_id ) ) : ?>
				<span class="tribe-postal-code"><?php echo tribe_get_zip( $venue_id ); ?></span>
			<?php endif; ?>
			<span class="tribe-locality"><?php echo tribe_get_city( $venue_id ); ?></span>
			<?php if ( tribe_get_region( $venue_id ) ) : ?>
				<abbr class="tribe-region tribe-events-abbr" title="<?php esc_attr_e( $full_region ); ?>"><?php echo tribe_get_region( $venue_id ); ?></abbr>
			<?php endif; ?>
		</div>
		</h2>
			<?php if(tribe_event_is_multiday()) { ?>

			<div class="dates-container">
						
						<div class="date-container">
							
							<div class="date-circle-left">
								<h3 class="date-day"><?php echo tribe_get_start_date(null, false,'j'); ?></h3>
								<span class="date-month"><?php echo tribe_get_start_date(null, false,'M'); ?></span>
							</div>
							
							<span class="date-time-multi"><?php // echo tribe_get_start_date(null, true,'H:s'); ?></span>
						</div>
						
						<div class="date-separator">tm</div>
						
						<div class="date-container">
							
							<div class="date-circle-right">
								<h3 class="date-day"><?php echo tribe_get_end_date(null, false,'j'); ?></h3>
								<span class="date-month"><?php echo tribe_get_end_date(null, false,'M'); ?></span>
							</div>
							
							<span class="date-time-multi"><?php // echo tribe_get_end_date(null, true,'H:s'); ?></span>
						</div>
					
					</div>
<!-- 				<div class="event-times">
					<?php // echo the_field("openingstijden"); ?>
				</div> -->

			<?php } else { ?>

			<div class="dates-container">
				<div class="date-container">
					<div class="date-circle">
						<h3 class="date-day"><?php echo tribe_get_start_date(null, false,'j'); ?></h3>
						<span class="date-month"><?php echo tribe_get_start_date(null, false,'M'); ?></span>
					</div>
					<span class="date-time"><?php echo tribe_get_start_date(null, true,'H:s'); ?></span>
					<span> - </span>
					<span class="date-time"><?php echo tribe_get_end_date(null, true,'H:s'); ?></span>
				</div>
			</div>
			<?php }; ?>
			<?php while ( have_posts() ) :  the_post(); ?>
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>><?php do_action( 'tribe_events_single_event_before_the_content' ) ?>
					<div class="tribe-events-single-event-description tribe-events-content">
						<?php the_content(); ?>
					</div>
			<br>
			<?php $url = tribe_get_gcal_link(); ?>
			<a class="be-button" target="_blank" href="<?php echo $url; ?>">+ Google Kalender</a>

			<?php $url = tribe_get_map_link(); ?>
			<a class="be-button" target="_blank" href="<?php echo $url; ?>">+ Google Maps</a>

			<?php $url = tribe_get_event_website_url(); ?>
			<a class="be-button" href="<?php echo $url; ?>">Bezoek Website</a>
			<?php //if ( function_exists( 'ADDTOANY_SHARE_SAVE_KIT' ) ) { ADDTOANY_SHARE_SAVE_KIT(); }?><!-- Delen -->

					<?php do_action( 'tribe_events_single_event_after_the_content' ); ?>
					<!-- Event meta -->
					<?php //do_action( 'tribe_events_single_event_before_the_meta' ) ?>
					<?php //tribe_get_template_part( 'modules/meta' ); ?>
					<?php //do_action( 'tribe_events_single_event_after_the_meta' ) ?>
				</div> <!-- #post-x -->

			<?php endwhile; ?>
		<!-- </div> --> <!-- right -->
	</div><!--container -->
</div><!-- #tribe-events-content -->




