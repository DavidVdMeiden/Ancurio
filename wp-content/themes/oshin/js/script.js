(function (jQuery) {
    "use strict";
    /*jslint browser: true, unparam: true, regexp: true, node: true*/
    /*global $, jQuery, alert, google, no_ajax_pages*/
    var $page_loader = jQuery('.page-loader'), ajax_url = jQuery('#ajax_url').val(), transition, $exclude_links;
    NProgress.configure({ trickleRate: 0.05, trickleSpeed: 1000 });
    /************************************
        RESIZE GALLERY SLIDER VIDEO
    ************************************/
    function resize_gallery_video() {
        if (jQuery(window).width() < 769) {
            jQuery('iframe.gallery').each(function () {
                jQuery(this).width(jQuery('#gallery-container-wrap').width());
            });
        } else {
            jQuery('iframe.gallery').each(function () {
                jQuery(this).width((jQuery(this).height() * 1.77));
            });
        }
    }
    /************************************
       Update Custom Scroll Bar
    ************************************/
    function be_custom_scrollbar() {
        if (jQuery('.gallery_content_area').length > 0) {          
        //     if (jQuery('.gallery_content_area').hasClass('mCustomScrollbar')) {
        //         jQuery(".gallery_content_area").mCustomScrollbar('update');
        //     } else {
                jQuery(".gallery_content_area").mCustomScrollbar({
                    autoHideScrollbar: true
                });
         //   }
        }
    }

    /************************************
        RESIZE GALLERY SLIDER VIDEO
    ************************************/
    function single_page_nav() {
        if(jQuery('body').find('.single-page-nav-wrap').length > 0) {
            jQuery('body').find('.single-page-nav-wrap').remove();
        }
        if (jQuery('body').hasClass('single-page-version')) {
            var $append = '<a class="single-page-nav-link back-to-top" href="#"><span>Home</span></a>';
            jQuery('.be-section').each(function() {
                var $this = jQuery(this), $id = $this.attr('id'), $title = $this.attr('data-title');
                if (typeof $id !== "undefined" && $id !== null) {
                    if (typeof $title !== "undefined" && $title !== null) {
                        $title = '<span>'+$title+'</span>';
                    } else {
                        $title = '';
                    }
                    $append += '<a class="single-page-nav-link" href="#'+$id+'">'+$title+'</a>';
                }
            });
            jQuery('body').append('<div class="single-page-nav-wrap clearfix"><div class="single-page-nav-wrap-inner clearfix"><div class="sinle-page-nav-links">'+$append+'</div></div></div>');
        }
    }
    function munu_item_update() {
        if (jQuery('body').hasClass('single-page-version')) {
            jQuery('li.menu-item').removeClass('current-menu-item');
            jQuery('.be-section, .header-hero-section').each(function () {
                if ((jQuery(window).scrollTop() + Number(jQuery('#header-wrap').attr('data-sticky-height')) + jQuery('#wpadminbar').height() + 1 >= jQuery(this).offset().top)) {
                    jQuery('li.menu-item').removeClass('current-menu-item');
                    jQuery('li.menu-item').removeClass('current-section');
                    jQuery('.sinle-page-nav-links .single-page-nav-link').removeClass('current-section-nav-link');
                    var $id = jQuery(this).attr('id');
                    if ($id) {
                        jQuery('li.menu-item a[href$="#' + $id + '"]').closest('li.menu-item').addClass('current-menu-item');
                        jQuery('li.menu-item a[href$="#' + $id + '"]').closest('li.menu-item').addClass('current-section');
                        jQuery('.sinle-page-nav-links a[href$="#' + $id + '"].single-page-nav-link').addClass('current-section-nav-link');
                    }
                }
            });

        }
    }
    /************************************
        SECTION BACKGROUND VIDEO
    ************************************/
    function be_resize_background_video() {
        jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').each(function () {
            var $img = jQuery(this), $section = $img.parent(), windowWidth = $section.width(), windowHeight = $section.outerHeight(), r_w = windowHeight / windowWidth, i_w = $img.width(), i_h = $img.height(), r_i = i_h / i_w, new_w, new_h;
            if (r_w > r_i) {
                new_h = windowHeight;
                new_w = windowHeight / r_i;
            } else {
                new_h = windowWidth * r_i;
                new_w = windowWidth;
            }
            $img.css({
                width : new_w,
                height : new_h,
                left : (windowWidth - new_w) / 2,
                top : (windowHeight - new_h) / 2,
                display : 'block'
            });
        });
    }
    /************************************
        Close Custom Popups
    ************************************/
    function be_close_sidebar() {
        if(jQuery('body').hasClass('slider-bar-opened') && jQuery('body').hasClass('top-header')){
            jQuery('.sliderbar-menu-controller .be-mobile-menu-icon').toggleClass('is-clicked');
        }
        if(jQuery('body').hasClass('top-overlay-menu') || jQuery('body').hasClass('left-overlay-menu')) {
            jQuery('.sb-slidebar').fadeOut(600);
            jQuery('html, body').removeClass('slider-bar-opened');
        } else {
            jQuery('.sb-slidebar').removeClass('opened');
            jQuery('html, body').removeClass('slider-bar-opened');
        }
        if ((jQuery('#main').hasClass('layout-border')) && (jQuery('body').hasClass('top-right-sliding-menu'))) {
            jQuery('.layout-box-right').css('display', 'block');
        }
    }
    function be_hide_close_overlay() {
        if (jQuery('html').hasClass('hide-overflow')) {
            jQuery('html').removeClass('hide-overflow');
        }
        if ((jQuery('#main').hasClass('layout-border')) && (jQuery('html,body').hasClass('left-overlay-menu'))) {
            jQuery('.layout-box-left').css('display', 'none');
        }
    }
    function be_open_leftstrip() {
        if (jQuery('.left-strip-wrapper').hasClass('hide')) {
            jQuery('.left-strip-wrapper').removeClass('hide');
        }
    }
    function be_close_mobilemenu() {
        if (jQuery('.mobile-menu').is(":visible")) {
            jQuery('.mobile-menu').slideFadeToggle();
            jQuery('.mobile-nav-controller .be-mobile-menu-icon').toggleClass('is-clicked');
        }

    }
    function be_close_searchbox() {
        if (jQuery('.search-box-wrapper').is(":visible")) {
            jQuery('.search-box-wrapper').fadeOut();
            jQuery('html').toggleClass('hide-overflow');
        }
    }
    /************************************
        ANIMATE SCROLL 
    ************************************/
    function be_animate_scroll(element) {
        if (jQuery('body').hasClass('section-scroll') && (jQuery(window).width() > 1024) && jQuery('html').hasClass('csstransforms')) {
            jQuery.fn.translate(element);
            return false;
        }
        var $scroll_to = 1, $sticky_offset;
        if (element.length > 0) {
            $scroll_to = Number(element.offset().top) - Number(jQuery('#wpadminbar').height());
        }
        if (jQuery(window).width() > 960) {
            if (jQuery('body').hasClass('sticky-header') || jQuery('body').hasClass('transparent-sticky')) {
                if (jQuery('body').hasClass('sticky-header')) {
                    $sticky_offset = (jQuery('#header').offset().top + Number(jQuery('#header-wrap').attr('data-default-height')) + Number(jQuery('#header-top-bar-wrap').innerHeight()) + Number(jQuery('#header-bottom-bar').innerHeight()));
                }
                if (jQuery('body').hasClass('transparent-sticky')) {
                    $sticky_offset = ((Number(jQuery('.header-hero-section').offset().top)+Number(jQuery('.header-hero-section').height())) - (Number(jQuery('#wpadminbar').innerHeight())));
                }
                if(jQuery('#main').hasClass('layout-border-header-top')) { 
                    $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-default-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                } else {
                    if ($scroll_to > $sticky_offset) {
                        $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-sticky-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                    }
                    if ($scroll_to < $sticky_offset) {
                        $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-default-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                    }
                    if ($scroll_to === $sticky_offset && jQuery('body').hasClass('transparent-sticky')) {
                        $scroll_to = $scroll_to - (Number(jQuery('#header-wrap').attr('data-sticky-height')) + Number(jQuery('#header-bottom-bar').innerHeight()));
                    }
                }
            } else {
                if(jQuery('#main').hasClass('layout-border-header-top')) {
                    $scroll_to = $scroll_to - Number(jQuery('#header-inner-wrap').innerHeight());
                }
            }
        }
        jQuery('body, html').animate({scrollTop: $scroll_to }, 1000, 'easeOutQuart', function () {
            be_close_sidebar();
            be_open_leftstrip();
            be_hide_close_overlay();
            munu_item_update();
        });
    }
    /************************************
        STICKY SIDEBAR
    ************************************/
    function be_sticky_sidebar() {
        var $window = jQuery(window), $sidebar = jQuery(".floting-sidebar"), offset = jQuery('#content-wrap').offset(), $scrollHeight = jQuery("#page-content").height(), $scrollOffset = jQuery("#page-content").offset(), $headerHeight = 0;
        if (jQuery(".floting-sidebar").length > 0) {
            if (jQuery('body').hasClass('sticky-header') || jQuery('body').hasClass('transparent-sticky')) {
                $headerHeight = Number(jQuery('#header-inner-wrap').innerHeight()) + Number(jQuery('#wpadminbar').innerHeight());
            } else {
                $headerHeight = Number(jQuery('#wpadminbar').innerHeight());
            }
            if ($window.width() > 960) {
                if (($window.scrollTop() + $headerHeight) > offset.top) {
                    if ($window.scrollTop() + $headerHeight + $sidebar.height() + 50 < $scrollOffset.top + $scrollHeight) {
                        $sidebar.stop().animate({
                            marginTop: ($window.scrollTop() - offset.top) + $headerHeight + 30,
                            paddingTop: 30
                        });
                    } else {
                        $sidebar.stop().animate({
                            marginTop: ($scrollHeight - $sidebar.height() - 80) + 30,
                            paddingTop: 30
                        });
                    }
                } else {
                    $sidebar.stop().animate({
                        marginTop: 0,
                        paddingTop: 0
                    });
                }
            } else {
                $sidebar.css('margin-top', 0);
            }
        }
        if (jQuery(".fixed-sidebar").length > 0) {
            $sidebar = jQuery(".fixed-sidebar");
            offset = jQuery('#content-wrap').offset();
            $scrollHeight = jQuery("#page-content").height();
            $scrollOffset = jQuery("#page-content").offset();
            $headerHeight = 0;
            if (jQuery('body').hasClass('sticky-header') || jQuery('body').hasClass('transparent-sticky')) {
                $headerHeight = Number(jQuery('#header-inner-wrap').height()) + Number(jQuery('#wpadminbar').height());
            } else {
                $headerHeight = Number(jQuery('#wpadminbar').height());
            }
            if ($window.width() > 960) {
                if ($window.scrollTop() + $headerHeight + 3 > offset.top) {
                    jQuery(".fixed-sidebar").addClass('active-fixed');
                    jQuery(".fixed-sidebar").width(jQuery(".fixed-sidebar").parent().outerWidth() * 0.30);
                } else {
                    jQuery(".fixed-sidebar").removeClass('active-fixed');
                    jQuery(".fixed-sidebar").width('30%');
                }
                jQuery(".fixed-sidebar-content-inner").mCustomScrollbar('update');
            }
        }
    }
    /************************************
        LIGHTBOX
    ************************************/
    // function be_lightbox() {
    //     if (jQuery('.image-popup-vertical-fit').length > 0) {
    //         var $enable_gallery = true;
    //         if( jQuery('.image-popup-vertical-fit').hasClass('single-image') ) {
    //             $enable_gallery = false;
    //         }
    //         jQuery('.image-popup-vertical-fit').magnificPopup({
    //             mainClass: 'mfp-img-mobile my-mfp-zoom-in',
    //             closeOnContentClick: true,
    //             gallery: {
    //                 enabled: $enable_gallery
    //             },
    //             image: {
    //                 verticalFit: true,
    //                 titleSrc: 'title'
    //             },
    //             zoom: {
    //                 enabled: true,
    //                 duration: 300
    //             },
    //             preloader: true,
    //             type: 'inline',
    //             iframe: {
    //               markup: '<div class="mfp-iframe-scaler XXXX">'+
    //                         '<div class="mfp-close"></div>'+
    //                         '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
    //                         '<figcaption>'+
    //                             '<div class="mfp-bottom-bar video_cap">'+
    //                                 '<div class="mfp-title"></div>'+
    //                             '</div>'+
    //                         '</figcaption>'+
    //                       '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
    //             },                
    //             overflowY: 'auto',
    //             removalDelay: 300,
    //             callbacks: {
    //                 afterClose: function () {
    //                     // jQuery(window).trigger('resize');
    //                 },
    //                 open: function () {
    //                     jQuery('body').addClass('mfp-active-state');
    //                     if (jQuery('#main').hasClass('layout-border')) {
    //                         jQuery('.mfp-content').addClass('layout-border');
    //                     }
    //                 },
    //                 close: function () {
    //                     jQuery('body').removeClass('mfp-active-state');
    //                 },
    //                 markupParse: function(template, values, item) {
    //                     values.title = item.el.attr('title');
    //                 }
    //             }
    //         });
    //     }
    //     if (jQuery('.popup-gallery').length > 0) {
    //         jQuery('.popup-gallery').magnificPopup({
    //             delegate: 'a',
    //             type: 'image',
    //             tLoading: 'Loading image #%curr%...',
    //             mainClass: 'mfp-img-mobile',
    //             gallery: {
    //                 enabled: true,
    //                 navigateByImgClick: true,
    //                 preload: [0, 1]
    //             },
    //             image: {
    //                 tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    //             },
    //             preloader: true,
    //             callbacks: {
    //                 afterClose: function () {
    //                     // jQuery(window).trigger('resize');
    //                 },
    //                 open: function () {
    //                     jQuery('body').addClass('mfp-active-state');
    //                     if (jQuery('#main').hasClass('layout-border')) {
    //                         jQuery('.mfp-content').addClass('layout-border');
    //                     }
    //                 },
    //                 close: function () {
    //                     jQuery('body').removeClass('mfp-active-state');
    //                 }
    //             }
    //         });
    //     }
    //     if (jQuery('.popup-with-content').length > 0) {
    //         jQuery('.popup-with-content').magnificPopup({
    //             type: 'inline',
    //             preloader: false
    //         });
    //     }
    // }
    /************************************
        DOCUMEnT READY EVENT
    ************************************/
    function do_ajax_complete() {

        jQuery('html').removeClass('section-scroll');
        jQuery('.component ul li:first-child').addClass('current');
        jQuery('input[placeholder], textarea[placeholder]').placeholder();
        if (jQuery('.hero-section-wrap, .full-screen-section').length > 0) {
            jQuery('.hero-section-wrap, .full-screen-section').FullScreen();
        }
        // if(jQuery('.scrollToFade').length > 0) {
        //     jQuery(".scrollToFade").scrollToFade();
        // }
        jQuery('#header').Transparent();
        jQuery('body').SectionScroll();
        be_close_sidebar();
        be_open_leftstrip();
        be_hide_close_overlay();
        single_page_nav();
        munu_item_update();
        // be_lightbox(); Function and Call Moved to BE Page Builder Plugin 
        // Flickity Slider for Portfolio
        be_flickity_default_header();
        be_flickity_getHeight();
        be_flickity_call();
        be_flickity_thumb_call();
        be_carousel_thumb_call();

        if( jQuery('#galaxy-canvas').length > 0 ) {
            galaxy_canvas();
        }
        pattern_canvas();
        water_drop_canvas();
        /************************************
            RESPONSIVE IFRAME
        ************************************/
        jQuery('body').find('iframe').not('.rev_slider iframe').each(function () {
            jQuery(this).parent().fitVids();
        });
        /********************************
            Menu 
        ********************************/
        var $menu = jQuery('#navigation .menu, #navigation-left-side .menu, #navigation-right-side .menu').children('ul');
        $menu.superfish({
            animation: {opacity: 'show'},
            animationOut: {opacity: 'hide'},
            speed : 400,
            delay: 600
        });
        /********************************
            Video Backgrounds
        ********************************/
        if (jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').length > 0) {
            jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').load();
            jQuery('.be-section .be-bg-video, .be-slider-video .be-bg-video').on("loadedmetadata", function () {
                jQuery(this).css({
                    width: this.videoWidth,
                    height: this.videoHeight
                });
                be_resize_background_video();
                jQuery(this).css('display', 'block');
            });
        }
        /********************************
            Sliders
        ********************************/
        if (('#gallery-container-wrap').length > 0) {
            // jQuery('#gallery-container-wrap').imagesLoaded(function () {
                jQuery('#gallery-container-wrap').fitVids();
                jQuery('#gallery-container-wrap').CenteredSlider();
                jQuery('.be-carousel-thumb').thumbnailSlider();
                resize_gallery_video();
            // });
        }
        jQuery('body').imagesLoaded(function () {
            /********************************
                Flexslider 
            ********************************/
            //Flex Slider is deprecated and implemented using Owl Carousel. Code is present in Page Builder Plugin Script. 
            // if (jQuery('.be-flex-slider').length > 0) {
            //     jQuery('.be-flex-slider').each(function () {
            //         var $animation_type = jQuery(this).attr('data-animation'), $slideshow = false, $slide_interval = Number(jQuery(this).attr('data-slide-interval'));
            //         if (jQuery(this).attr('data-auto-slide') === 'yes') {
            //             $slideshow = true;
            //         }
            //         jQuery(this).flexslider({
            //             start : function (slider) {
            //                 slider.closest(".be-flex-slider").removeClass('flex-loading');
            //                 slider.closest(".be-flex-slider").find('.loader-icon').remove();
            //                 if (slider.find('ul.slides li').length < 2) {
            //                     slider.closest(".be-flex-slider").find('.flex-control-nav,.flex-direction-nav').remove();
            //                 }
            //                 if (slider.closest('.portfolio-container').length > 0) {
            //                     // jQuery(window).trigger('resize');
            //                 }
            //             },
            //             after: function (slider) {
            //                 if (slider.closest('.portfolio-container').length > 0) {
            //                     // jQuery(window).trigger('resize');
            //                 }
            //             },
            //             animation : $animation_type,
            //             slideshow : $slideshow,
            //             slideshowSpeed : $slide_interval,
            //             controlNav : true,
            //             smoothHeight : true,
            //             directionNav : true,
            //             prevText : '',
            //             nextText : ''
            //         });
            //     });
            // }
        });

        if (jQuery('#carousel').length > 0) {
            jQuery('#carousel').imagesLoaded(function () {
                jQuery('#carousel').elastislide();
            });
        }
        // if (jQuery('.gallery_content_area').length > 0) {          
        //     if (jQuery('.gallery_content_area').hasClass('mCustomScrollbar')) {
        //         jQuery(".gallery_content_area").mCustomScrollbar('update');

        //     } else {
        //         jQuery(".gallery_content_area").mCustomScrollbar({
        //             autoHideScrollbar: true
        //         });
        //     }
        // }
        if (jQuery('.fixed-sidebar-content-inner').length > 0) {
            if (jQuery('.fixed-sidebar-content-inner').hasClass('mCustomScrollbar')) {
                jQuery(".fixed-sidebar-content-inner").mCustomScrollbar('update');
            } else {
                jQuery(".fixed-sidebar-content-inner").mCustomScrollbar({
                    autoHideScrollbar: true,
                    mouseWheelPixels: 300
                });
            }
        }
        if (jQuery('body').hasClass('header-transparent') && jQuery('#hero-section').find('.rev_slider_wrapper').length > 0) {
            jQuery('#hero-section').find('.rev_slider_wrapper').each(function () {
                var $wrapper = jQuery(this).attr('id'), $instance = jQuery(this).find('.rev_slider').attr('id'), be_revapi = $instance.split('_');
                window['revapi'+be_revapi[2]].bind("revolution.slide.onchange", function (e, data) {
                    setTimeout(function () {
                        BackgroundCheck.init({
                            targets: '#header #header-inner-wrap',
                            images: '.active-revslide .tp-bgimg'
                        });
                        BackgroundCheck.refresh();
                    }, 100);
                });
            });
        }
    }
    /*******************************************************
    Ajax Load Pages with HTML Pushstate and page transitions
    ********************************************************/
    if (jQuery('body').hasClass('all-ajax-content')) {
        transition = function ($newEl) {
            var $oldEl = this;
            $oldEl.find('.logo').hide();
            $oldEl.fadeOut(500, function () {
                jQuery(window).trigger('djax_transition');
                // if ($oldEl.find('.portfolio-container').length > 0) {
                //     $oldEl.find('.portfolio-container').isotope('destroy');
                // }
                // if (jQuery('.rev_slider_wrapper').length > 0) {
                //     jQuery('.rev_slider_wrapper').each(function () {
                //         var $wrapper = jQuery(this).attr('id'), $instance = jQuery(this).find('.rev_slider').attr('id'), be_revapi = $instance.split('_');
                //         window['revapi'+be_revapi[2]].revkill();
                //     });
                // }
                if( jQuery('.be-countdown').length > 0 ) {
                     jQuery('.be-countdown').each( function() {
                        jQuery(this).countdown('destroy');
                     });
                }
                if (jQuery('body').hasClass('header-transparent') && jQuery('#hero-section').find('.rev_slider_wrapper').length > 0) {
                    BackgroundCheck.destroy();
                }

                if (jQuery('.be-flickity').length){
                    jQuery('.be-flickity').flickity('destroy');    
                }
                
                Waypoint.destroyAll();
                $oldEl.after($newEl);
                $oldEl.off().empty().remove();
                $newEl.fadeIn(500);
                //jQuery('html').fadeIn(500);
                jQuery('body').imagesLoaded(function () {
                    do_ajax_complete();
                    jQuery(document).trigger("update_content");
                    if(jQuery('.loader-style6').length > 0) {
                        NProgress.done();
                    }
                });
                be_custom_scrollbar();
                jQuery(document).trigger('change');
            });
        };
        $exclude_links = jQuery('#all_ajax_exclude_links').val().split(',');
        window.no_ajax_pages.push('product', 'add-to-cart', 'pdf', 'doc', 'eps', 'png', 'zip', 'admin', 'wp-', 'feed', '#', '?remove_item');
        jQuery.each($exclude_links, function (index, item) {
            window.no_ajax_pages.push(jQuery.trim(item));
        });
        window.no_ajax_pages = jQuery.grep(no_ajax_pages, function (n) {
            return n;
        });
        jQuery('html').djax('.ajaxable', no_ajax_pages, transition);
        jQuery(window).bind('djaxLoad', function (e, data) {
            var content = data.response, nobodyClass;
            content = content.replace(/(<\/?)body( .+?)?>/gi, '$1NOTBODY$2>', data);
            nobodyClass = jQuery(content).filter('notbody').attr("class");
            jQuery('body').attr("class", nobodyClass);
            jQuery('#wp-admin-bar-edit').html(jQuery(content).filter('notbody').find('#wp-admin-bar-edit').html());
            jQuery('head').find('meta, link[rel="canonical"]').remove();
            jQuery(content).filter('meta, link[rel="canonical"]').each(function() {
                jQuery('head').prepend(jQuery(this));
            });
        });
        jQuery(window).bind('djaxClick', function (e, data) {
            jQuery('.page-loader').fadeIn();
            if(jQuery('.loader-style6').length > 0) {
                NProgress.start();
            }
            be_close_sidebar();
            be_open_leftstrip();
            be_hide_close_overlay();
            be_close_searchbox();
            jQuery('html, body, document').stop().animate({scrollTop: jQuery('html').offset().top }, 1000, 'easeInOutQuint');
            
        });
    }

    function be_flickity_default_header(){   
        if(jQuery('.portfolio-sliders').length){
            if(jQuery('body.header-transparent').length){
                if(Number(jQuery(window).width()) <= 960){
                    jQuery('#header-inner-wrap').css('position','relative');
                }
                else{
                    jQuery('#header-inner-wrap').css('position','absolute');
                }
            }
        }
    }   

    function be_flickity_getHeight(){
        if(jQuery('#content.portfolio-sliders').length){
            var $this = jQuery('#content.portfolio-sliders'),
                $gutter_width = Number($this.attr('data-gutter-width')),
                $slider_type = $this.attr('data-slider-type'),
                $window_width = Number(jQuery(window).width()) + jQuery.getScrollbarWidth(),
                $mobile_calculation = true,
                $full_window_height = Number(jQuery(window).height()),
                $window_height = $full_window_height-(Number(jQuery('#header').innerHeight())+Number(jQuery('#wpadminbar').innerHeight())+Number(jQuery('#portfolio-title-nav-wrap').innerHeight()));


            if($this.find('.disable-flickity-mobile').length){
                $mobile_calculation = false;
            }
            if(jQuery('body').hasClass('be-themes-layout-layout-border-header-top')) {
                var $border_length = 1;  
            }else{
                var $border_length = 2;
            }
            //Calculate Height and Width of Image Wrappers
            //CONDITION 1 - If Flickity is Disabled for Mobile Devices 
            if($mobile_calculation == false && $window_width <= 960){                
                $this.find('.be-flickity .img-wrap').each(function(){
                    var $this_img_wrap = jQuery(this),
                        $this_img = $this_img_wrap.find('img'),
                        $data_source = $this_img.attr('data-flickity-lazyload');

                    $this_img.removeAttr("data-flickity-lazyload");
                    $this_img.attr('src',$data_source);
                    $this_img_wrap.width('100%').height('100%');
                }); 
            }
            //CONDITION 2 - Calculation for all Desktop Screen Sizes. And for Mobile Screen Size when Flickity is Enabled.
            if($mobile_calculation == true || $window_width > 960){  
                if($window_width <= 960 ) {
                    if($window_width >= 480 && $window_width < 640){
                        $window_height = $full_window_height;
                    }
                    $this.find('.img-wrap').width($window_width).height($window_height);
                    $this.find('.be-flickity').css('padding',0);
                }else{ 

                    if($slider_type == 'be-ribbon-carousel' || $slider_type == 'be-center-carousel'){ 
                        if(jQuery('#bottom-widgets').length){
                            var $footer_height = 0;
                        }else{
                            var $footer_height = Number(jQuery('#footer').innerHeight()) ;
                        }
                        var $window_height_addl = $window_height-((Number(jQuery('.layout-box-bottom:visible').height())*$border_length)+$footer_height),
                            $given_slider_height = $this.attr('data-height');
                        
                        //Set Height and Width according to above Calculations
                        var $slider_height = (($window_height_addl/100)*parseInt($given_slider_height)),
                            $padding = ($window_height_addl-$slider_height)/2;

                        $this.find('.img-wrap').height($slider_height);
                        $this.find('.be-flickity').css('padding', $padding+'px 0px '+$padding+'px 0px').css('opacity', 1);
                        $this.find('.be-flickity .img-wrap').each(function(){
                            var $this_img = jQuery(this),
                                $img = $this_img.find('img'),
                                $img_actual_width = $this_img.attr('data-image-width'),
                                $img_actual_height = $this_img.attr('data-image-height'),
                                $img_width = ($img_actual_width * $slider_height)/$img_actual_height;  

                            $this_img.width($img_width);
                            //Reassign Img Source Attribute to Enable Lazyload in Larger Screen Sizes
                            if( ($img.attr('src') ) && !($img.hasClass('flickity-lazyloaded') ) ) {
                            var $data_source = $img.attr('src');
                                $img.removeAttr("src");
                                $img.attr('data-flickity-lazyload',$data_source);
                            }
                        }); 

                    }else if ($slider_type == 'be-centered' || $slider_type == 'be-fullscreen'){

                        $given_slider_height = $this.attr('data-height');//100;
                        //Larger Screens
                        if(jQuery('#bottom-widgets').length){
                            var $footer_height = 0;
                        }else{
                            var $footer_height = Number(jQuery('#footer').innerHeight()) ;
                        }                            
                        var $window_height_addl = $window_height-((Number(jQuery('.layout-box-bottom:visible').height())*$border_length)+$footer_height);

                        //Set Height and Width according to above Calculations
                        var $slider_height = (($window_height_addl/100)*parseInt($given_slider_height)),
                            $padding = ($window_height_addl-$slider_height)/2;

                        $this.find('.be-flickity').css('padding', $padding+'px 0px '+$padding+'px 0px').css('opacity', 1);
                        $this.find('.img-wrap').height($slider_height).width('100%'); 

                        $this.find('.be-flickity .img-wrap').each(function(){
                            var $this_img = jQuery(this),
                                $img = $this_img.find('img');
                            //Reassign Img Source Attribute to Enable Lazyload in Larger Screen Sizes
                            if( ($img.attr('src') ) && !($img.hasClass('flickity-lazyloaded') ) ) {
                            var $data_source = $img.attr('src');
                                $img.removeAttr("src");
                                $img.attr('data-flickity-lazyload',$data_source);
                            }
                        });
                    }
                }
            } 
            // $this.find('iframe').fitVids();
            //Calculation of Thumbnail Position if Flickity is Enabled for Mobile Devices
            if($mobile_calculation == true){
                if($window_width <= 960){
                    var $thumbnail_position =  $window_height+37 - Number(jQuery('#header').innerHeight()); 
                    jQuery('.portfolio-sliders .single-portfolio-slider.carousel_bar_area').css('top',$thumbnail_position);  
                }else{
                    jQuery('.portfolio-sliders .single-portfolio-slider.carousel_bar_area').css('top','initial'); 
                }
            }
        }
    }

    function be_flickity_call(){
        var $flickity_gallery = jQuery('.main-gallery.be-flickity'),
            $slider_type = $flickity_gallery.closest('.portfolio-sliders').attr('data-slider-type'),
            $nav_arrow = Boolean($flickity_gallery.attr('data-nav-arrow')),
            $auto_play_time = Boolean($flickity_gallery.attr('data-auto-play')),
            $free_scroll = Boolean($flickity_gallery.attr('data-free-scroll')),
            $keyboard_crtl = Boolean($flickity_gallery.attr('data-keyboard-crtl')),
            $loop_ctrl = Boolean($flickity_gallery.attr('data-loop-crtl')),
            $cell_align = 'center',
            $percentPosition = true;

        if($slider_type == 'be-ribbon-carousel'){
            $cell_align = 'left';
            $percentPosition = false;
        }
        if($slider_type == 'be-center-carousel'){
            $cell_align = 'center';
            $percentPosition = false;
        }
        if((Number(jQuery(window).width()) + jQuery.getScrollbarWidth()) <= 960){
            $free_scroll = false;
        }
        var $flickity_gallery = jQuery('.main-gallery.be-flickity').flickity({
            lazyLoad: 3,
            prevNextButtons: $nav_arrow,
            wrapAround: $loop_ctrl,
            freeScroll: $free_scroll,
            accessibility: $keyboard_crtl,
            autoPlay: $auto_play_time,
            contain: true,
            cellAlign: $cell_align,
            percentPosition:$percentPosition,
            pageDots: false,
            watchCSS: true,
            arrowShape: { 
              x0: 20,
              x1: 40, y1: 20,
              x2: 45, y2: 20,
              x3: 25
            }   
        });
        var $flickity_instance = $flickity_gallery.data('flickity');
       
        var iframes = $flickity_gallery.find('.img-wrap iframe');
        if($slider_type == 'be-ribbon-carousel' || $slider_type == 'be-center-carousel'){
            be_flickity_resetGutter($flickity_gallery);
        }
        $flickity_gallery.on('lazyLoad',function(event, cellElement){
            var img = event.originalEvent.target;

            // Resize to Parent
            if($slider_type != 'be-centered'){
                if(Number(jQuery(window).width()) > 960){
                    jQuery(img).resizeToParent(); 
                }
            }
            jQuery(img).css('opacity',1);
        })
        // Apply Fit Vids
        $flickity_gallery.find('.img-wrap iframe').fitVids();
        $flickity_gallery.find('.img-wrap iframe').css('opacity',1);
        $flickity_gallery.find('.img-wrap .img-overlay-wrap').css('display','block');

        if($slider_type == 'be-fullscreen'){
            $flickity_gallery.flickity('resize');
        }

        $flickity_gallery.on( 'settle', function( event, pointer ){
            // Pause Video on Slider Movement
            iframes.each( function() {
                var iframe_id = jQuery(this).attr('id');
                if( iframe_id ) {
                    var iframe = document.getElementById( iframe_id );
                    var player = $f(iframe);
                    player.api("pause");
                }
            });

            var $this_img_wrap = jQuery($flickity_instance.selectedElement);
            // Increment Slider Count
            jQuery('.current-slide-count').text(($flickity_instance.selectedIndex) + 1);
            // Background Check
            if($slider_type == 'be-fullscreen' && ($this_img_wrap.find('iframe').length <= 0) ){
                
                BackgroundCheck.init({
                    targets: '#header #header-inner-wrap, .portfolio-sliders .transparent-nav-bar',
                    images: '.be-fullscreen .img-wrap.is-selected img'
                });
                
                BackgroundCheck.refresh();
            }
        })
        // BackgroundCheck.destroy();
    }

    function flickity_resize(){
        var $flickity_gallery = jQuery('.main-gallery.be-flickity'),
            $slider_type = $flickity_gallery.closest('.portfolio-sliders').attr('data-slider-type'); 

        if($slider_type != 'be-centered'){
            if(Number(jQuery(window).width()) > 960){
                $flickity_gallery.find('.img-wrap img').resizeToParent(); 
            }
        }
    }

    function be_flickity_resetGutter(onFlickityGallery){
        var $flickity_slider = onFlickityGallery.find('.flickity-slider'),
            $flickity_wrapper = onFlickityGallery.closest('#content'),
            $gutter_width = $flickity_wrapper.attr('data-gutter-width');
        
        if(Number(jQuery(window).width()) <= 960 ) {
            $flickity_slider.css('left',0);
        }else{
            $flickity_slider.css('left',Number($gutter_width)); 
        }
    }

    function be_flickity_thumb_call(){

        var $flickity_thumb_gallery = jQuery('.be-flickity-thumb').flickity({
            asNavFor: '.main-gallery', 
            freeScroll: true,
            contain: true, 
            pageDots: false,
            prevNextButtons: false
        });
    }

    function be_carousel_thumb_call(){

        var $flickity_thumb_gallery = jQuery('.be-carousel-thumb').flickity({
            freeScroll: true,
            contain: true, 
            pageDots: false,
            prevNextButtons: false
        });
    }

    /************************************
        DOCUMET READY EVENT
    ************************************/
    jQuery(document).ready(function () {
        do_ajax_complete();

        /**************************************
            EVENTS
        **************************************/
        jQuery(document).on('click', '.header-search-controls .search-button', function () {
            jQuery('.search-box-wrapper').fadeToggle().find('.s').focus();
            if (jQuery('.search-box-wrapper').hasClass('style2-header-search-widget')) {
                jQuery('html').toggleClass('hide-overflow');
            }
        });

        jQuery(document).on('click','#mobile-menu li a', function() {
            be_close_mobilemenu();
        });
        /********************************
            Navigations 
        ********************************/
        jQuery(document).on('click', '.mobile-nav-controller-wrap', function () {
            jQuery('.mobile-menu').slideFadeToggle();
            jQuery('.mobile-nav-controller .be-mobile-menu-icon').toggleClass('is-clicked'); 
        });
        jQuery(document).on('click', '.mobile-sub-menu-controller', function () {
            jQuery(this).siblings('.sub-menu').slideFadeToggle();
            if (jQuery(this).find('i').hasClass('icon-angle-down')) {
                jQuery(this).find('i').removeClass('icon-angle-down');
                jQuery(this).find('i').addClass('icon-angle-up');
            } else {
                jQuery(this).find('i').removeClass('icon-angle-up');
                jQuery(this).find('i').addClass('icon-angle-down');
            }
        });
        jQuery(document).on('click', '.menu-falling-animate-controller', function () {
            var delay = 1, $this = jQuery(this);
            if(jQuery('body').hasClass('menu-animate-fall-active')) {
                jQuery('#navigation').find('#menu').children('.menu-item').each(function() {
                    jQuery(this).delay(delay).removeClass('return-position', 400);
                    delay += 50;
                }).promise().done( function(){ 
                    jQuery('body').removeClass('menu-animate-fall-active');
                    $this.find('.font-icon').removeClass('active');
                });
            } else {
                jQuery('#navigation').find('#menu').children('.menu-item').each(function() {
                    jQuery(this).delay(delay).addClass('return-position', 400);
                    delay += 50;
                }).promise().done( function(){ 
                    jQuery('body').addClass('menu-animate-fall-active');
                    $this.find('.font-icon').addClass('active');
                });
            }
        });
        /********************************
            Portfolio 
        ********************************/
        // jQuery(document).on('click', '.trigger_load_more.blog_load_more:not(.disabled)', function () {
        //     var $this = jQuery(this),
        //         $action = $this.closest('.portfolio').attr("data-action"),
        //         $showposts = $this.closest('.portfolio').attr("data-showposts"),
        //         $data_gutter_width = Number($this.closest('.portfolio').attr("data-gutter-width")),
        //         $paged = Number($this.closest('.portfolio').attr("data-paged"));
        //     jQuery('.page-loader').fadeIn();
        //     $this.addClass('disabled');
        //     jQuery.ajax({
        //         type: "POST",
        //         url: ajax_url,
        //         data: "action=" + $action + "&showposts=" + $showposts + "&paged=" + $paged + "&gutter_width=" + $data_gutter_width,
        //         success: function (data) {
        //             if (data) {
        //                 var $newItems = jQuery(data);
        //                 $newItems.imagesLoaded(function () {
        //                     $this.closest('.portfolio').find('.portfolio-container').append($newItems).isotope('appended', $newItems);
        //                     $newItems.find('.be-flex-slider').each(function () {
        //                         var $animation_type = jQuery(this).attr('data-animation'), $slideshow = false, $slide_interval = Number(jQuery(this).attr('data-slide-interval'));
        //                         if (jQuery(this).attr('data-auto-slide') === 'yes') {
        //                             $slideshow = true;
        //                         }
        //                         jQuery(this).flexslider({
        //                             start : function (slider) {
        //                                 slider.closest(".be-flex-slider").removeClass('flex-loading');
        //                                 slider.closest(".be-flex-slider").find('.loader-icon').remove();
        //                                 if (slider.find('ul.slides li').length < 2) {
        //                                     slider.closest(".be-flex-slider").find('.flex-control-nav,.flex-direction-nav').remove();
        //                                 }
        //                                 if (slider.closest('.portfolio-container').length > 0) {
        //                                     // jQuery(window).trigger('resize');
        //                                 }
        //                             },
        //                             after: function (slider) {
        //                                 if (slider.closest('.portfolio-container').length > 0) {
        //                                     // jQuery(window).trigger('resize');
        //                                 }
        //                             },
        //                             animation : $animation_type,
        //                             slideshow : $slideshow,
        //                             slideshowSpeed : $slide_interval,
        //                             controlNav : true,
        //                             smoothHeight : true,
        //                             directionNav : true,
        //                             prevText : '',
        //                             nextText : ''
        //});
        //                     });
        //                     $newItems.fitVids();
        //                     jQuery(window).trigger('resize');
        //                     $this.closest('.portfolio').attr("data-paged", $paged + 1);
        //                     $this.attr("data-total-items", function () {
        //                         return (Number(jQuery(this).attr('data-total-items')) - $newItems.find('.element-inner').length);
        //                     });
        //                     if ($this.attr("data-total-items") < 1) {
        //                         $this.fadeOut(500, function () {
        //                             $this.remove();
        //                         });
        //                     }
        //                     $this.removeClass('disabled');
        //                     jQuery('.page-loader').fadeOut();
        //                     be_lightbox();
        //                 });
        //             } else {
        //                 $this.addClass('disabled');
        //                 jQuery('.page-loader').fadeOut();
        //             }
        //         }
        //     });
        // });
        /********************************
            Local Scroll
        ********************************/
        jQuery(document).on('click', 'a[href="#"]', function (e) {
            e.preventDefault();
        });
        jQuery(document).on('click', 'a', function (e) {
            var $link_to = jQuery(this).attr('href'), url_arr, $element, $path = window.location.href;
            if (jQuery(this).hasClass('ui-tabs-anchor')) {
                return false;
            }
            if ($link_to) {
                url_arr = $link_to.split('#');
                if ($link_to.indexOf('#') >= 0 && $path.indexOf(url_arr[0]) >= 0) {
                    $element = $link_to.substring($link_to.indexOf('#') + 1);
                    if ($element) {
                        if (jQuery('#' + $element).length > 0) {
                            e.preventDefault();
                            if (jQuery(window).width() < 960) {
                                jQuery('.mobile-menu').slideUp(500, function () {
                                    be_animate_scroll(jQuery('#' + $element));
                                });
                            } else {
                                be_animate_scroll(jQuery('#' + $element));
                            }
                        }
                    }
                }
            }
        });
        /********************************
            Menu Sidebar
        ********************************/
        jQuery(document).on('click', '.sliderbar-nav-controller-wrap', function () {
             
            if(jQuery('body').hasClass('top-overlay-menu')) {
                jQuery('.sb-slidebar').fadeIn(600);
                if (jQuery('html, body').hasClass('top-overlay-menu')) {
                    jQuery('html').toggleClass('hide-overflow');
                }
            } else {
                jQuery('.sliderbar-menu-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                jQuery('.sb-slidebar').toggleClass('opened');
                jQuery('html,body').toggleClass('slider-bar-opened');
                if (jQuery('html,body').hasClass('top-overlay-menu')) {
                    jQuery('html').toggleClass('hide-overflow');
                }
            }
            if ((jQuery('#main').hasClass('layout-border')) && (jQuery('body').hasClass('top-right-sliding-menu'))) {
                jQuery('.sliderbar-menu-controller .be-mobile-menu-icon').toggleClass('is-clicked');
                if ((jQuery('.layout-box-right').css('display')) === 'block') {
                    jQuery('.layout-box-right').css('display', 'none');
                }
                if ((jQuery('.layout-box-right').css('display') === 'none')) {
                    jQuery('.layout-box-right').css('display', 'block');
                }
            }
        });
        jQuery(document).on('click', '.left-strip-wrapper #sb-left-strip', function () {
            if(jQuery('body').hasClass('top-overlay-menu') || jQuery('body').hasClass('left-overlay-menu')) {
                jQuery('.sb-slidebar').fadeIn(600);
            } else {
                jQuery('.sb-slidebar').toggleClass('opened');
            }
            jQuery('.left-strip-wrapper').toggleClass('hide');
            jQuery('#main-wrapper').toggleClass('hidden-strip');
            if (jQuery('html,body').hasClass('left-overlay-menu')) {
                jQuery('html').toggleClass('hide-overflow');
            }
            if ((jQuery('#main').hasClass('layout-border')) && (jQuery('html,body').hasClass('left-overlay-menu'))) {
                jQuery('.layout-box-left').css('display', 'block');
            }
            jQuery('html, body').toggleClass('slider-bar-opened');
        });
        // jQuery(document).on('click', '.overlay-menu-close', function () {
        jQuery(document).on('click', '.overlay-menu-close', function () {    
            be_close_sidebar();
            be_hide_close_overlay();
            be_open_leftstrip();
            if ((jQuery('#main').hasClass('layout-border')) && (jQuery('html,body').hasClass('left-overlay-menu'))) {
                jQuery('.layout-box-left').css('display', 'none');
            }
        });
        /********************************
            Portfolio Custom Gallery
        ********************************/
        jQuery(document).on('click', '.single_portfolio_info_close', function () {
            jQuery(this).closest('.gallery_content').toggleClass('show');
            jQuery(".gallery_content_area").mCustomScrollbar("update");
            // jQuery(window).trigger('resize');
        });
        jQuery(document).on('mouseenter', '.carousel_bar_area', function () {
            jQuery(this).find('.carousel_bar_wrap').css('opacity', '0').stop().animate({ opacity: 1, bottom: '0px' }, 500);
        });
        jQuery(document).on('mouseleave', '.carousel_bar_area', function () {
            jQuery(this).find('.carousel_bar_wrap').stop().animate({ opacity: 0, bottom: '-500px' }, 500);
        });
        /********************************
            Close Custom Popups
        ********************************/
        jQuery(document).on('mouseup', '.sliderbar-menu-controller, .sb-slidebar, .mobile-nav-controller, .mobile-menu, .header-search-controls .search-button, .search-box-wrapper', function () {
            if (jQuery(this).hasClass('sliderbar-menu-controller') || jQuery(this).hasClass('sb-slidebar')) {
                be_close_mobilemenu();
                be_close_searchbox();
            }
            if (jQuery(this).hasClass('mobile-nav-controller') || jQuery(this).hasClass('mobile-menu')) {
                be_close_sidebar();
                be_close_searchbox();
            }
            if (jQuery(this).hasClass('search-button') || jQuery(this).hasClass('search-box-wrapper')) {
                be_close_mobilemenu();
                be_close_sidebar();
            }
            return false;
        });

        jQuery(document).on('mouseup', function () {
            be_close_sidebar();
            be_open_leftstrip();
            be_close_mobilemenu();
            be_close_searchbox();
            be_hide_close_overlay();
        });
        jQuery(document).on('keyup', function (e) {
            if (e.keyCode === 27) {
                be_close_sidebar();
                be_open_leftstrip();
                be_hide_close_overlay();
                be_close_searchbox();
                if (jQuery('.gallery_content').hasClass('show')) {
                    jQuery('.gallery_content').removeClass('show');
                } else {
                    if (jQuery('.gallery-slider-wrap').hasClass('opened')) {
                        jQuery('html').removeClass('overflow-hidden');
                        // jQuery(window).trigger('resize');
                        jQuery('.gallery-slider-wrap').css('left', '100%').css('opacity', 0);
                        setTimeout(function () {
                            jQuery('.gallery-slider-wrap').removeClass('opened');
                            jQuery('.gallery-slider-content').empty();
                            jQuery('.gallery-slider-wrap').css('left', '-100%');
                            // jQuery(window).trigger('resize');
                        }, 300);
                    }
                }
            }
        });
        jQuery(document).on('click', '.header-search-form-close', function (e) {
            e.preventDefault();
            be_close_searchbox();
        });
        /********************************
            MouseMove Parallax
        ********************************/
        jQuery(document).on('mousemove', '.be-bg-mousemove-parallax', function (e) {
            var amountMovedX = (event.pageX / jQuery(this).width()) * 100, amountMovedY = (event.pageY / jQuery(this).height()) * 100;
            if (amountMovedX > 100) {
                amountMovedX = 100;
            } else if (amountMovedX < 0) {
                amountMovedX = 0;
            }
            if (amountMovedY > 100) {
                amountMovedY = 100;
            } else if (amountMovedY < 0) {
                amountMovedY = 0;
            }
            jQuery(this).stop(true, false).animate({backgroundPosition: amountMovedX + '% ' + amountMovedY + '%'}, 200);
        });
        /********************************
            Back To Top
        ********************************/
        jQuery(document).on('click', '#back-to-top, .back-to-top', function (e) {
            e.preventDefault();
            jQuery('body,html').animate({ scrollTop: 0 }, 1000, 'easeInOutQuint');
        });
        /*jQuery(document).on('mousewheel', '.be-section, #hero-section', function (event) {
            var $scroll = false;
            if(jQuery(this).hasClass('be-section')) {
                if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                    if(jQuery(this).prev('.be-section').length > 0) {
                        $scroll = jQuery(this).prev('.be-section');
                    } else if(jQuery('#hero-section').length > 0) {
                        $scroll = jQuery('#hero-section');
                    }
                }
                else {
                    if(jQuery(this).next('.be-section').length > 0) {
                        $scroll = jQuery(this).next('.be-section');
                    }
                }   
            }
            if(jQuery(this).hasClass('header-hero-section')) {
                if (!(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0)) {
                    if(jQuery('#content').find('.be-section').length > 0) {
                        $scroll = jQuery('#content').find('.be-section').first();
                    }
                }   
            }
            if($scroll && jQuery('body').hasClass('section-scroll')) { 
                event.preventDefault();
                be_animate_scroll($scroll);
            }
        });*/
    });// END DOCUMENT READY EVENT


    jQuery(window).smartresize(function () {
        resize_gallery_video();
        be_flickity_default_header();
        be_flickity_getHeight();
        var $flickity_gallery = jQuery('.main-gallery.be-flickity'); 
        $flickity_gallery.flickity('reloadCells');
        // Resize to Parent
        flickity_resize();
        be_flickity_resetGutter($flickity_gallery);
        be_flickity_thumb_call();
        be_carousel_thumb_call();

        jQuery(".gallery_content_area, .ps-content-inner").mCustomScrollbar("update");
        be_sticky_sidebar();
        be_resize_background_video();
        munu_item_update();
        if (jQuery(window).width() > 960) {
            jQuery('.mobile-menu').slideUp();
        }
    });// END WINDOW RESIZE EVENT
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > 10) {
            jQuery('#back-to-top').fadeIn();
        } else {
            jQuery('#back-to-top').fadeOut();
        }
        munu_item_update();
        be_sticky_sidebar();
    });// END WINDOW SCROLL EVENT
    jQuery(window).load(function () {
        setTimeout(function () {
            jQuery('body').imagesLoaded(function () {
                var $hash = window.location.hash;
                if ($hash) {
                    if (jQuery($hash).length > 0) {
                        be_animate_scroll(jQuery($hash));
                    }
                }
                be_sticky_sidebar();
                $page_loader.fadeOut();
            });
            // jQuery(window).trigger('resize');
        }, 200);
        be_custom_scrollbar();
    });// END WINDOW LOAD EVENT
}(jQuery));