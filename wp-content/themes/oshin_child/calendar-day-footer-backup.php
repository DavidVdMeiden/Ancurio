<div id="tribe-events-footer">
	<!-- Navigation -->
	<h3 class="tribe-events-visuallyhidden"><?php printf( esc_html__( '%s Navigation', 'the-events-calendar' ), $events_label_singular ); ?></h3>
	
	<ul class="tribe-events-sub-nav">
		<li class="tribe-events-nav-previous">
			<?php tribe_the_prev_event_link( '<i class="font-icon icon-arrow-left7"></i>%title%' ) ?>
		</li><li class="tribe-events-nav-back"><a href=" <?php echo esc_url( tribe_get_events_link() ); ?>">Terug naar agenda</a></li><li class="tribe-events-nav-next">
			<?php tribe_the_next_event_link( '%title%<i class="font-icon icon-arrow-left7"></i>' ) ?>
		</li>
	</ul>
</div>