<?php
/**
 * Single Event Meta (Map) Template
 *
 * Override this template in your own theme by creating a file at:
 * [your-theme]/tribe-events/modules/meta/details.php
 *
 * @package TribeEventsCalendar
 */

$map = tribe_get_embedded_map();

if ( empty( $map ) ) {
	return;
}

?>

<div class="tribe-events-venue-map">
	<?php
	// Display the map.
	do_action( 'tribe_events_single_meta_map_section_start' );
	echo $map;
	do_action( 'tribe_events_single_meta_map_section_end' );
	?>
</div>


<ul class="custom-list"><li class="custom-list-content"><i class="font-icon icon-icon_house_alt " style="color:#33ccff;"></i><span class="custom-list-content-inner">Argonweg 17, Amersfoort<br>1ste verdieping gebouw RuimteDirect<br>Bezoek op afspraak</span></li><li class="custom-list-content"><i class="font-icon icon-icon_phone " style="color:#33ccff;"></i><span class="custom-list-content-inner">033-4691097</span></li><li class="custom-list-content"><i class="font-icon icon-icon_mail_alt " style="color:#33ccff;"></i><span class="custom-list-content-inner">info@ancurio.nl</span></li>

</li><li class="custom-list-content"><i class="font-icon icon-icon_facebook " style="color:#33ccff;"></i><span class="custom-list-content-inner"><a href="https://www.facebook.com/Ancuriosieraden/">Volgen op Facebook</a></span></li>

</ul>