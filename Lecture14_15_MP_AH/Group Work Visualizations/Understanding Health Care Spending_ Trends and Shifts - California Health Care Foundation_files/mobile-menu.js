jQuery(document).ready(function ($) {
	"use strict";

	const KEYCODE = {
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		SPACE: 32,
		PAGEUP: 33,
		PAGEDOWN: 34,
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
	};

	// Create mobile menu container, create mobile bar, and clone the main
	// menu in the navigation region.
	var $mobileNav = $('<nav class="mobile-menu" role="navigation"></nav>'),
		$mobileBar = $(
			'<div class="mobile-menu__bar"><div class="button-wrapper"><button class="mobile-menu__button js-mobile-menu-button mobile-menu__button--menu"><span class="mobile-menu__icon mobile-menu__icon--menu">Menu</span></div></div>'
		),
		$mobileLinks = $('<div class="mobile-menu__links" hidden></div>'),
		$mainMenu = $(".nav--primary .nav").first().clone(),
		$utilityMenu = $(".utility .nav").first().clone(),
		$searchBar = $(".searchform-wrapper").first().clone(),
		$siteName = $(".site-name").first().clone(),
		$body = $("body");

	// Only create mobile menu if there is a main menu.
	if ($mainMenu.length <= 0) {
		return;
	}

	var closeMenu = function (e, forceClose) {
		e.preventDefault();
		let $button = $(".js-mobile-menu-button");

		if (forceClose) {
			$button.removeClass("is-active");
			$mobileLinks.attr("hidden", "true");
			$body.removeClass("no-scroll");
		} else {
			$button.toggleClass("is-active");
			$mobileLinks.attr("hidden", !$mobileLinks.attr("hidden"));
			$body.toggleClass("no-scroll");
		}
	};

	// Remove menu id, add class, and format subnav menus.
	$mainMenu
		.removeAttr("id")
		.attr("class", "nav nav--mobile-menu")
		.find("ul")
		.each(function () {
			var $parentLink = $(this).siblings("button");
			$parentLink
				.addClass("nav__link--parent")
				.parent("li")
				.addClass("nav__item--parent");
		});

	// Insert the cloned menus into the mobile menu container.
	$searchBar.appendTo($mobileLinks);
	$mainMenu.appendTo($mobileLinks);
	$utilityMenu.appendTo($mobileLinks);
	$siteName.appendTo($mobileBar);
	$mobileBar.prependTo($mobileNav);
	$mobileLinks.appendTo($mobileNav);

	// Add mobile menu to the page.
	$(".skiplinks").after($mobileNav);

	// Open/close mobile menu when menu button is clicked.
	$(".js-mobile-menu-button").on("click", function (e) {
		closeMenu(e, false);
	});

	// IDs need to be unique
	$mobileNav.find("[id], [aria-controls]").each(function () {
		let $this = $(this);
		if ($this.attr("id")) {
			$this.attr("id", $this.attr("id") + "-mobile");
		}
		if ($this.attr("aria-controls")) {
			$this.attr(
				"aria-controls",
				$this.attr("aria-controls") + "-mobile"
			);

			$this.click(function (e) {
				if ($this.attr("aria-expanded") == "true") {
					$this.attr("aria-expanded", "false");
				} else {
					$this.attr("aria-expanded", "true");
				}
			});
		}
	});

	// Manage focus when keyboard is used to navigate
	var handleKeyDown = function (event) {
		// Select all focusable items
		const focusable = $mobileLinks
			.get(0)
			.querySelectorAll(
				'button[type=submit], [href], input, select, textarea,[tabindex]:not([tabindex="-1"]'
			);

		const numberFocusElements = focusable.length;
		const firstFocusableElement = focusable[0];
		const lastFocusableElement = focusable[numberFocusElements - 1];

		// Close modal
		if (event.keyCode === KEYCODE.ESC) {
			closeMenu(event, true);
		}

		// Trap Tab
		if (event.keyCode === KEYCODE.TAB && event.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				event.preventDefault();
				lastFocusableElement.focus();
			}
		} else if (event.keyCode === KEYCODE.TAB) {
			if (document.activeElement === lastFocusableElement) {
				event.preventDefault();
				firstFocusableElement.focus();
			}
		}
	};

	$(window).on("resize", function (e) {
		if ($mobileLinks.attr("hidden")) {
			closeMenu(e, true);
		}
	});

	$body.on("keydown", function (e) {
		if (!$mobileLinks.attr("hidden")) {
			handleKeyDown(e);
		}
	});
});
