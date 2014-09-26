/*
	Template by HTML5 UP edited by Jacob Amaral
*/
(function ($) {

    skel.init({
        reset: 'full',
        breakpoints: {
            'global': { range: '*', href: 'css/style.css' },
            'desktop': { range: '641-', href: 'css/style-desktop.css', containers: 1200, grid: { gutters: 25 } },
        }
    });
    $(function () {

        var $window = $(window),
			$body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            $body.removeClass('is-loading');
        });

        // Forms (IE<10).
        var $form = $('form');
        if ($form.length > 0) {

            if (skel.vars.IEVersion < 10) {
                $.fn.n33_formerize = function () { var _fakes = new Array(), _form = $(this); _form.find('input[type=text],textarea').each(function () { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function () { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function () { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function () { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function (event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function (event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function (event) { event.preventDefault(); x.val(''); }); }); _form.submit(function () { $(this).find('input[type=text],input[type=password],textarea').each(function (event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function (event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function () { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function () { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
                $form.n33_formerize();
            }

        }

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Scrolly.
        $window.load(function () {

            var x = parseInt($('.wrapper').first().css('padding-top')) - 15;
            $('#nav a, .scrolly').scrolly(1000, x);

        });

    });
})(jQuery);

/*Initialize slider*/

// Only run everything once the page has completely loaded

$(window).load(function () {

    // Fancybox specific
    $(".gallery__link").fancybox({
        'titleShow': false,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic'
    });

    // Set general variables
    // ====================================================================
    var totalWidth = 0;

    // Total width is calculated by looping through each gallery item and
    // adding up each width and storing that in `totalWidth`
    $(".gallery__item").each(function () {
        totalWidth = totalWidth + $(this).outerWidth(true);
    });

    // The maxScrollPosition is the furthest point the items should
    // ever scroll to. We always want the viewport to be full of images.
    var maxScrollPosition = totalWidth - $(".gallery-wrap").outerWidth();

    // This is the core function that animates to the target item
    // ====================================================================
    function toGalleryItem($targetItem) {
        // Make sure the target item exists, otherwise do nothing
        if ($targetItem.length) {

            // The new position is just to the left of the targetItem
            var newPosition = $targetItem.position().left;

            // If the new position isn't greater than the maximum width
            if (newPosition <= maxScrollPosition) {

                // Add active class to the target item
                $targetItem.addClass("gallery__item--active");

                // Remove the Active class from all other items
                $targetItem.siblings().removeClass("gallery__item--active");

                // Animate .gallery element to the correct left position.
                $(".gallery").animate({
                    left: -newPosition
                });
            } else {
                // Animate .gallery element to the correct left position.
                $(".gallery").animate({
                    left: -maxScrollPosition
                });
            };
        };
    };

    // Basic HTML manipulation
    // ====================================================================
    // Set the gallery width to the totalWidth. This allows all items to
    // be on one line.
    $(".gallery").width(totalWidth);

    // Add active class to the first gallery item
    $(".gallery__item:first").addClass("gallery__item--active");

    // When the prev button is clicked
    // ====================================================================
    $(".gallery__controls-prev").click(function () {
        // Set target item to the item before the active item
        var $targetItem = $(".gallery__item--active").prev();
        toGalleryItem($targetItem);
    });

    // When the next button is clicked
    // ====================================================================
    $(".gallery__controls-next").click(function () {
        // Set target item to the item after the active item
        var $targetItem = $(".gallery__item--active").next();
        toGalleryItem($targetItem);
    });
});

