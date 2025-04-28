// Custom scripts file

/**
 * CHCF-4
 */
jQuery(window).on("load", function () {
	var currenthash = window.location.hash;
	var target = currenthash ? $(currenthash) : null;
	if (target) {
		if (target.parent().hasClass("hidden-section")) {
			target.parent().prevAll(".hidden-section").show();
			target.parent().show();
			target.parent().removeClass("hidden-section");
		}
		target = target.length
			? target
			: $("[name=" + this.hash.slice(1) + "]");
		if (target.length) {
			if ($("body").hasClass("admin-bar")) {
				$("html, body").animate(
					{
						scrollTop: target.offset().top - 70,
					},
					1000
				);
			} else {
				$("html, body").animate(
					{
						scrollTop: target.offset().top - 38,
					},
					1000
				);
			}
			$(".active").removeClass("active");
			$('a[href="' + currenthash + '"]').addClass("active");
			return false;
		}
	}
});

/**
 * CHCF-4
 */
jQuery(function () {
	$(window).on("hashchange", function () {
		let hash = window.location.hash;
		if (hash) {
			$(".active").removeClass("active");
			$('a[href="' + hash + '"]').addClass("active");
		}
	});
});

jQuery(document).ready(function ($) {
	"use strict";

	/**
	 * CHCF-4
	 */
	if (window.innerWidth > 900) {
		// CHCFS-273
		if ($("body").hasClass("admin-bar")) {
			$("#sidebar__navigation").stick_in_parent({
				offset_top: $("#wpadminbar").outerHeight(true) + 38,
			});
		} else {
			$("#sidebar__navigation").stick_in_parent({ offset_top: 38 });
		}
	}

	/**
	 * CHCF-4
	 */
	$('a[class*="sidebar-nav"][href*="#"]:not([href="#"])').click(function () {
		var clicked = $(this);
		if (
			location.pathname.replace(/^\//, "") ==
			this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			if (target.parent().hasClass("hidden-section")) {
				target.parent().prevAll(".hidden-section").show();
				target.parent().show();
				target.parent().removeClass("hidden-section");
			}
			target = target.length
				? target
				: $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				if ($("body").hasClass("admin-bar")) {
					$("html, body").animate(
						{
							scrollTop: target.offset().top - 32,
						},
						1000
					);
					history.replaceState(
						"data",
						"title",
						location.origin +
						location.pathname +
						"#" +
						target.attr("id")
					);
					$(".active").removeClass("active");
					clicked.addClass("active");
				} else {
					$("html, body").animate(
						{
							scrollTop: target.offset().top - 0,
						},
						1000
					);
					history.replaceState(
						"data",
						"title",
						location.origin +
						location.pathname +
						"#" +
						target.attr("id")
					);
					$(".active").removeClass("active");
					clicked.addClass("active");
				}

				return false;
			}
		}
	});

	$(".grid").masonry({
		itemSelector: ".grid-item",
	});

	$(document).on("facetwp-loaded", function () {
		if (FWP.loaded) {
			$("html, body").animate(
				{
					// CHCF-223
					scrollTop: $(".search__options").offset().top,
				},
				500
			);
			// CHCF-239
			$(".grid").masonry({
				// options...
				itemSelector: ".grid-item",
			});
		}
	});

	$(".show-more-button").click(function (event) {
		event.preventDefault();
		var img_height = $(this)
			.closest(".col-info")
			.prev(".col-image")
			.height();
		$(this).closest(".col-info").find(".show-more-content").slideToggle();
		$(this).closest(".col-info").prev(".col-image").height(img_height);
		if ($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).html("Show More");
		} else {
			$(this).addClass("less");
			$(this).html("Show Less");
		}
	});

	/**
	 * CHCF-4
	 */
	$(".show-more-publication-button").click(function (event) {
		event.preventDefault();
		$(this).parent().parent().next().show("slow");
		if ($(this).parent().parent().next().hasClass("hidden-section")) {
			//history.replaceState("data","title",location.origin + location.pathname + "#" + $(this).parent().parent().next().find('.anchor').attr('id'));
			$(this).parent().parent().next().removeClass("hidden-section");
		}
	});

	/**
	 * CHCF-4
	 */
	$("#download-button-long-form").click(function (event) {
		event.preventDefault();
		event.stopPropagation();
		$(".hidden-section").show();
		$(".hidden-section").removeClass("hidden-section");
		var aid = "related-links-and-downloads";
		var target = $("#related-links-and-downloads");
		if (target.length) {
			if ($("body").hasClass("admin-bar")) {
				$("html, body").animate(
					{
						scrollTop: target.offset().top - 70,
					},
					1000
				);
				history.replaceState(
					"data",
					"title",
					location.origin +
					location.pathname +
					"#" +
					target.attr("id")
				);
			} else {
				$("html, body").animate(
					{
						scrollTop: target.offset().top - 38,
					},
					1000
				);
				history.replaceState(
					"data",
					"title",
					location.origin +
					location.pathname +
					"#" +
					target.attr("id")
				);
			}

			return false;
		}
	});

	/**
	 * CHCF-4
	 */
	$(window).scroll(function () {
		$(".show-more-publication-button").each(function (i) {
			if (
				$(this).isFullyInViewport() &&
				!$(this).parent().parent().hasClass("hidden-section")
			) {
				$(this).text("Loading...");
				$(this).trigger("click");
				$(this).fadeTo(100, 0);
			}
		});
	});

	/**
	 * CHCF-4
	 */
	$(window).scroll(function () {
		var navHighlightAction = function (i, e) {
			var offsetheight = 0;
			if ($("body").hasClass("admin-bar")) {
				offsetheight = 70;
			} else {
				offsetheight = 38;
			}
			if (
				$(window).scrollTop() >=
				$(this).position().top - offsetheight &&
				!$(this).parent().hasClass("hidden-section") &&
				$(this).visible(true, true, "both")
			) {
				var hash = $(this).prev().attr("id");
				if (hash) {
					history.replaceState(
						"data",
						"title",
						location.origin + location.pathname + "#" + hash
					);
					$(".active").removeClass("active");
					$('a[href="#' + hash + '"]').addClass("active");
				}
			}
		};
		$(".section-header").each(navHighlightAction);
		$(".related-materials").each(navHighlightAction);
	});

	/**
	 * CHCF-4
	 */
	$.fn.isFullyInViewport = function () {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementTop >= viewportTop && elementBottom <= viewportBottom;
	};

	/**
	 * ZenDesk 12585
	 *
	 * @param options
	 */
	$.fn.chcfToggle = function (options) {
		var _parent = this;
		var button = this.find(".toggle-button");

		var text = this.find(".toggle-text");

		var default_button_options = {
			on: "Show More",
			off: "Show Less",
		};

		var button_options = $.extend(default_button_options, {
			on: button.data("chcf-toggle-on"),
			off: button.data("chcf-toggle-off"),
		});

		if (typeof button != "undefined") {
			button.click(function (event) {
				event.preventDefault();
				text.slideToggle();
				if ($(this).hasClass("chcf-toggle-less")) {
					$(this).removeClass("chcf-toggle-less");
					$(this).html(button_options.on);
				} else {
					$(this).addClass("chcf-toggle-less");
					$(this).html(button_options.off);
				}
			});
		}
	};
	$(".wp-block-chcf-toggle-wrapper").chcfToggle();
	/**
	 * ZenDesk 12730
	 */
	$("a").hover(
		function (e) {
			var overrideHoverColor = $(this).data("override-hover");
			if (overrideHoverColor == true) {
				var backgroundColor = $(this).data("background-color-on");
				var color = $(this).data("text-color-on");

				if (backgroundColor != "") {
					$(this).css("background-color", backgroundColor);
				}

				if (overrideHoverColor != "") {
					$(this).css("color", color);
				}
			}
		},
		function (e) {
			var overrideHoverColor = $(this).data("override-hover");
			if (overrideHoverColor == true) {
				$(this).css("background-color", "");
				$(this).css("color", "");
			}
		}
	);

	/**
	 * CHCF-4
	 */
	$(".searchform__input")
		.on("keyup input" ,function () {
			if ($(this).val() == "") {
				$(".searchform__button").attr("disabled", true);
			} else {
				$(".searchform__button").removeAttr("disabled");
			}
		});

	/**
	 * CHCF-161
	 */
	$(".modal__link").click(function (event) {
		event.preventDefault();
		$(this)
			.closest(".image-search__post")
			.find(".modal--image-details")
			.removeClass("is-hidden");
	});

	$(".modal__close").click(function (event) {
		event.preventDefault();
		$(this).parents(".modal--image-details").addClass("is-hidden");
	});

	/**
	 * CHCFS-401
	 */
	$(".lightbox__link").click(function (event) {
		event.preventDefault();
		var image_src = this.href;
		var lightbox_image = $("<img>").attr("src", image_src);
		$("#chcf-lightbox .modal__image-wrapper").append(lightbox_image);
		$("#chcf-lightbox").removeClass("is-hidden");
	});

	$("#chcf-lightbox, .lightbox__close").click(function (event) {
		event.preventDefault();
		$("#chcf-lightbox .modal__image-wrapper").find("img").remove();
		$("#chcf-lightbox").addClass("is-hidden");
	});

	/**
	 * Toolkit subnav stickiness
	 */
	let toolkitSidebar = $(".single-toolkit .l-sidebars__sidebar__inner");
	let toolkitSidebarHeight;
	let toolkitContent = $(".single-toolkit .l-sidebars__main .l-sidebars__main");
	let toolkitContentHeight;
	let toolkitSidebarMargin;
	let toolkitStickyStart;
	let toolkitStickyEnd;
	const TOOLKIT_TOP_MARGIN = 18;

	if (toolkitSidebar.length && toolkitContent.length) {
		toolkitStickyStart = toolkitSidebar.offset().top - TOOLKIT_TOP_MARGIN;
	}

	function calculateToolkitSubnavDimensions() {
		if (toolkitSidebar.length && toolkitContent.length) {
			toolkitSidebarHeight = toolkitSidebar.height();
			toolkitContentHeight = toolkitContent.height();
			toolkitSidebarMargin = toolkitContentHeight + TOOLKIT_TOP_MARGIN - toolkitSidebarHeight;
			toolkitStickyEnd = toolkitStickyStart + toolkitContentHeight + (TOOLKIT_TOP_MARGIN * 2) - toolkitSidebarHeight;
		}
	}

	// Set initial dimensions.
	calculateToolkitSubnavDimensions();

	// Update dimensions when all content, including images and fonts, is loaded.
	window.addEventListener('load', calculateToolkitSubnavDimensions);
	if (document.fonts) {
		document.fonts.ready.then(calculateToolkitSubnavDimensions);
	}

	// Update dimensions when Gravity Forms loads.
	$(document).on("gform_post_render", calculateToolkitSubnavDimensions);

	// Update dimensions if any elements are added or removed.
	const observer = new MutationObserver((mutationList) => {
		mutationList.forEach(calculateToolkitSubnavDimensions);
	});
	const config = { childList: true, subtree: true };
	observer.observe(document.getElementById('main'), config);

	// Update dimensions on window resize.
	$(window).resize(calculateToolkitSubnavDimensions);

	// Catch-all because some third-party plugin or script is impacting the height,
	// despite all of the above listeners. So wait a bit, then update the dimensions.
	setTimeout(calculateToolkitSubnavDimensions, 3000);

	$(window).on("scroll", function () {
		// Screen below 700px? No sticky sidebar.
		if (window.matchMedia("(max-width: 700px)").matches) {
			$(toolkitSidebar).removeClass("fixed").removeClass("sticky");
		} else {
			// If the sidebar is taller than the content, no sticky sidebar.
			if (toolkitContentHeight < toolkitSidebarHeight) {
				$(toolkitSidebar).removeClass("fixed").removeClass("sticky");
			} else {
				// If the sidebar is shorter than the content, proceed with the sticky sidebar.
				if ( toolkitSidebarHeight < ( $(window).height() || $(".single-toolkit .l-sidebars").height() ) ) {
					const currentScrollTop = $(window).scrollTop();
					// If the current scroll position is between the sticky start and end points,
					// set the sidebar to stick in place.
					if (
						currentScrollTop > toolkitStickyStart &&
						currentScrollTop < toolkitStickyEnd
					) {
						toolkitSidebar
							.addClass("fixed")
							.removeClass("sticky")
							.css("top", TOOLKIT_TOP_MARGIN);
					}
					// If the current scroll position is at or below the sticky end point,
					// fix it to the bottom of the section.
					else if (
						currentScrollTop >= toolkitStickyEnd || currentScrollTop + toolkitSidebarHeight >= toolkitContentHeight
					) {
						toolkitSidebar
							.removeClass("fixed")
							.addClass("sticky")
							.css("top", toolkitSidebarMargin);
					}
					// Otherwise, we haven't scroll far enough yet, so leave it
					// in its initial position.
					else {
						toolkitSidebar.removeClass("fixed").removeClass("sticky");
					}
				} else {
					toolkitSidebar.removeClass("fixed").removeClass("sticky");
				}
			}
		}
	});

	/**
	 * CHCF-322
	 */
	$(".page_item_has_children span").click(function (event) {
		event.preventDefault();
		$(this).parent().toggleClass("is-open").children(".children").toggle();
		calculateToolkitSubnavDimensions();
	});

	$(".current_page_parent").addClass("is-open");

	$(".page_item_has_children.current_page_item")
		.addClass("is-open")
		.children(".children")
		.toggle();

	// Toolkit wrapper has image
	if ($(".hero-toolkit__wrapper .hero-toolkit__image").length) {
		$(".hero-toolkit__wrapper").addClass("has-image");
	}

	/**
	 * CHCF-511 Staff toggle
	 */
	$(".staff-list .section-head").click(function (event) {
		event.preventDefault();
		$(this).toggleClass("open closed");
	});

	/* CHCFS-599 - Post Carousel ("What's Trending") */
	const sliders = document.querySelectorAll(".post-carousel__section");

	sliders.forEach((elem) => {
		// Avoid repeated inits when this block appears more than once.
		if (elem.classList.contains("is-active")) {
			return;
		}

		const list = elem.querySelector(".post-carousel");
		const controls = elem.querySelector(".post-carousel__nav");
		const links = elem.querySelectorAll(".card__link");

		const slider = tns({
			container: list,
			autoplay: false,
			fixedWidth: 320,
			gutter: 24,
			responsive: {
				768: {
					fixedWidth: 400,
					gutter: 30,
				},
			},
			loop: false,
			nav: false,
			controlsContainer: controls,
			rewind: false,
			onInit: () => {
				elem.classList.add("is-active");
				// The live region is interfering with focusing on the item links.
				const liveRegion = elem.querySelector(".tns-liveregion");
				if (liveRegion) {
					liveRegion.removeAttribute("aria-live");
					liveRegion.removeAttribute("aria-atomic");
				}

				links.forEach((link, index) => {
					link.addEventListener("focus", () => slider.goTo(index));
				});
			},
		});

		const allowTabbing = () => {
			links.forEach((item) => {
				item.removeAttribute("tabindex");
				item.removeAttribute("aria-hidden");
			});
		};

		slider.events.on("transitionEnd", allowTabbing);
	});

	/* CHCFS-679 - Alert box */
	var dismissed = sessionStorage.getItem("dismissed");

	if(!dismissed){
		$("#alert").addClass("show");
		} else {
		$("#alert").removeClass("show");
	}

	$("#alert__close").click(function (event) {
		event.preventDefault();
		$("#alert").removeClass("show");
		sessionStorage.setItem("dismissed", true);
	});
});
