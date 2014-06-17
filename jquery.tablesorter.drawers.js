/*! tablesorter Grouping widget - updated 10/28/2013
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rod Rozin
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";

$.tablesorter.addWidget({
	id: 'drawers',
	init: function(table, thisWidget, options, wo){
		var drawer_callback = (wo.drawer_callback !== undefined) ? wo.drawer_callback : function(){return;},
			drawer_exceptions = wo.drawer_exceptions,
			hasExceptions = (drawer_exceptions !== '') ? true : false,
			$table = $(table).find('tbody'),
			$row = $table.find('tr').not('.drawer'),
			$drawer = $table.find('tr.drawer'),
			that = this;

		$row.on('click', function(e) {
			var clickedEl = e.target,
				$elem = $(this);

			if(hasExceptions){
				if(drawer_exceptions.constructor === Array) {
					for(var i = 0, len = drawer_exceptions.length; i < len; ++i) {
						var exception = e.currentTarget.querySelector(drawer_exceptions[i]);

						if(that.exceptionElem(clickedEl) === exception) {
							return;
							break;
						}
					}
				}
			}

			if(!$elem.hasClass('open')) {
				$elem.addClass('open');
				
				$elem.next().find('.drawer-content').slideDown('fast', function() {
					drawer_callback(e);
				});
			} else {
				$elem.removeClass('open');
				$elem.next().find('.drawer-content').slideUp('fast', function() {
					drawer_callback(e);
				});
			}
		});
	},
	exceptionElem: function(elem) {
		var clickedEl = elem;

		while (clickedEl.nodeName.toUpperCase() !== 'TD') {
	    	clickedEl = clickedEl.parentNode;
	    }

	    return clickedEl;
	},
	format: function(table, c, wo) {},
	remove : function(table, c, wo){}
});

})(jQuery);
