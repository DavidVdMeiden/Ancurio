<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 */

get_header(); ?>

	<section id="content" class="no-sidebar-page">
		<div id="content-wrap" class="">
			<section id="page-content" style="background-color: #fff; padding: 50px 0px">
				<div class="clearfix">	
					<div class="be-themes-comments be-row be-wrap not-found">
						<img src="../wp-content/uploads/layout/404-uiltje.png" style="float: left;">
						<header class="entry-header">
							<h1 class="entry-title"><?php _e( 'Oeps! Pagina niet gevonden.', 'be-themes' ); ?></h1>
						</header>
						<div class="not-found-search">
							<p><?php _e( 'Oeps! Het lijkt er op dat deze pagina niet bestaat. Misschien helpt een zoekopdracht:', 'be-themes' ); ?></p>
							<?php get_search_form(); ?>
						</div>
					</div>
				</div> <!--  End Page Content -->
			</section>
		</div>
	</section>	

<?php get_footer(); ?>