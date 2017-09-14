import svg4everybody from 'svg4everybody';
// import $ from 'jquery';
import 'slider-pro';

(function ($) {

	$(function() {
		svg4everybody();


		/**
		 * Slider
		 */

		$('.slider_main').sliderPro({
			arrows: true,
			fade: true,
			autoplay: false,
			fullScreen: true,
			touchSwipe: true,
			width: '100%',
			height: '100%',
			visibleSize: '100%'
			// forceSize: 'fullWidth'
			// slideDistance: 0,

		});


		/**
		 * Main menu show
		 */
		$(window).on('scroll', function(e) {
			if($(window).scrollTop() > $('.section_object').height() ) {
				$('.menu').show();
			} else {
				$('.menu').hide();
			}
		});

		/**
		 * Main menu mobile
		 */
		// var mmenu = $(".body-box .main__menu--links.hidden");
		// var cloneMmenu = mmenu.clone(true);
		// cloneMmenu.addClass('visible-sm visible-md visible-lg').insertAfter(mmenu);
		// mmenu.mmenu({
		// 	// options
		// });
		// mmenu.removeClass('hidden');
		// var API = mmenu.data( "mmenu" );
		// $('.body-box .main__menu').appendTo('body');
		// $('.main__menu--actions').clone(true).appendTo('.mm-listview');

		// $("#my-button").click(function(e) {
		// 	e.preventDefault();
		// 	if($('html').hasClass('mm-opened')) {
		// 		API.close();
		// 	} else {
		// 		API.open();
		// 	}
		// });
		// $('.mm-listview a').on('click', function(e) {
		// 	if($('html').hasClass('mm-opened')) {
		// 		API.close();
		// 	}
		// });

		$('a').on('click', function(e) {
			var _scroll = $(this).attr('href');
			if (_scroll != '#' && $(_scroll).length) {
				$('html, body').animate({ scrollTop: $(_scroll).offset().top - 80 }, 800);
			}
		});

		/**
		 * Animation
		 */
		var iasd = 0;

		function communications_home() {
			$('.animate-04, .animate-08, .animate-12').addClass('up_top');
		}
		function hr_anime() {
			$('.new_services .head p:nth-child(2)').addClass('hr_anim');
		}

		$(window).on('scroll', function (e) {

			if (
					($(window).scrollTop() + $(window).height()) >= $('#main').height()/2
			) {
				if (iasd != 1) {
					iasd = 1;
					communications_home();
				}
			}
		});
		$(window).trigger('scroll');

		$('.slider-pro').each(function(id, el) {
			var _target = $(el).parents('.additional').find('.additional__control-item_active .additional__control-link').data('target');
			var startSlide = $(el).find('.sp-slide[data-level="' + _target + '"]').eq(0).index();

			// console.log($(el));

			$(el).sliderPro({
				arrows: true,
				autoplay: false,
				fullScreen: true,
				width: '100%',
				height: '100%',
				forceSize: 'fullWidth',
				// slideDistance: 0,
				startSlide: startSlide,
				gotoSlide: function (event) {
					var _slides = $(this.instance).find('.sp-slide');
					var _prev = _slides.eq(event.previousIndex);
					var _current = _slides.eq(event.index);

					if (_prev.data('level') != _current.data('level')) {
						var menu_items = $(this.instance).parents('.section_additional').find('.additional__control-item');
						// console.log(menu_items);

						menu_items.removeClass('additional__control-item_active');
						menu_items.find('a[data-target="' + _current.data('level') + '"]').parents('li:first').addClass('additional__control-item_active');
					}
				}
			});
		});

		function resize () {
			var diff = $('.additional__control:first').height();
			if ($(window).scrollTop() > $('.section_object').height()) {
				diff += $('.menu').height()
			}
			$('.slider_additional').css('height', function() {
				return $(window).height() - diff;
			})
		}
		resize();
		$(window).on('resize', resize);

		$('.additional').each(function (id, el) {
			var _menu = $(el).find(".additional__control");
			$(el).find('.additional__control-link').on('click', function (e) {
				e.preventDefault();
				var _target = $(this).data('target');
				var slide_num = $(el).find('.sp-slide[data-level="' + $(this).data('target') + '"]').eq(0).index();
				console.log(slide_num);
				$(el).find('.slider-pro').sliderPro( 'gotoSlide', slide_num );
			})
		});


		/**
		 * Map
		 */

		ymaps.ready(init);
			var myMap;
			var myPlacemark;

			function init() {

					myMap = new ymaps.Map("map", {
						center: [ 55.774505, 36.946443 ],
						zoom: 17,
						controls: ["zoomControl"],
						type: 'yandex#satellite'
					});

					myPlacemark = new ymaps.Placemark([ 55.774505, 36.946443 ], {
						iconCaption: 'Малая Пролетарская, 18'

					}
					// {
					// 	preset: 'islands#blueCircleDotIconWithCaption'
					// }
					);

					myMap.geoObjects.add(myPlacemark);

			}



	});


})(jQuery);




