define([
    'jquery',
    'underscore',
    'js/lib/moment',
    'js/app/home'
], function ($, _, Moment, Tmpst) {

    function scrollToInternalLink($dom, section) {
        var $target = $dom.find('[data-section="' + section + '"]');
        if ($target.length) {
            var newTop = $target.position().top,
                scrollDiff = Math.abs($(document).scrollTop() - newTop);
            if (scrollDiff > 1e3) $("html,body").scrollTop(newTop);
            else $("html,body").animate({
                scrollTop: newTop
            }); if (Tmpst.multitracker) {
                Tmpst.multitracker.push([document.title.split(" |")[0] + " " + section, "Open"]);
            }
        }
    }


    return {
        scrollToInternalLink: scrollToInternalLink
    }
});