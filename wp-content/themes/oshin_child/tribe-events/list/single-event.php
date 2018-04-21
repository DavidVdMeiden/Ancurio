<?php
/**
 * List View Single Event
 * This file contains one event in the list view
 *
 * Override this template in your own theme by creating a file at [your-theme]/tribe-events/list/single-event.php
 *
 * @package TribeEventsCalendar
 *
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}
$venue_details = tribe_get_venue_details();
$has_venue_address = ( ! empty( $venue_details['address'] ) ) ? ' location' : '';
$organizer = tribe_get_organizer();
?>
<?php do_action( 'tribe_events_before_the_content' ) ?>
<div class="event-container">
	<?php echo tribe_get_embedded_map (null, 300, 300, true );?>
	
	<?php if(tribe_event_is_multiday()) { ?>

		<div class="dates-container">
			
			<div class="date-container">
				
				<div class="date-circle-left">
					<h3 class="date-day"><?php echo tribe_get_start_date(null, false,'j'); ?></h3>
					<span class="date-month"><?php echo tribe_get_start_date(null, false,'M'); ?></span>
				</div>
				
				<span class="date-time-multi"><?php // echo tribe_get_start_date(null, true,'H:s'); ?></span>
			</div>
			
			<div class="date-separator">t/m</div>
			
			<div class="date-container">
				
				<div class="date-circle-right">
					<h3 class="date-day"><?php echo tribe_get_end_date(null, false,'j'); ?></h3>
					<span class="date-month"><?php echo tribe_get_end_date(null, false,'M'); ?></span>
				</div>
				
				<span class="date-time-multi"><?php // echo tribe_get_end_date(null, true,'H:s'); ?></span>
			</div>
		
		</div>

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

		<?php do_action( 'tribe_events_before_the_event_title' ) ?>
		<h2 class="tribe-events-list-event-title">
			<a class="tribe-event-url" href="<?php echo esc_url( tribe_get_event_link() ); ?>" title="<?php the_title_attribute() ?>" rel="bookmark">
				<h1><?php the_title() ?></h1>
			</a>
		</h2>
		<?php do_action( 'tribe_events_after_the_event_title' ) ?>


		<?php //echo tribe_get_event_website_link(); 
		$venue_id = get_the_ID();
		$full_region = tribe_get_full_region( $venue_id );		?>

		<h2><?php echo tribe_get_venue() .', '. tribe_get_city( $venue_id ); ?></h2>
		
		<div class="tribe-events-list-event-description tribe-events-content">
			<?php echo tribe_events_get_the_excerpt( null, wp_kses_allowed_html( 'post' ) ); ?>
			<a href="<?php echo esc_url( tribe_get_event_link() ); ?>" class="tribe-events-read-more be-button" rel="bookmark"><?php esc_html_e( 'Bekijk evenement', 'the-events-calendar' ) ?></a>
		<br><br>
		</div>
	<?php do_action( 'tribe_events_after_the_content' ); ?>
	</div>