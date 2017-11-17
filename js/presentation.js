define(function(require) {
	var Adapt = require('core/js/adapt');

	var currentBlock;
	var $blocks;

	Adapt.on('pageView:postRender', function(view) {
		$('#wrapper').append(Handlebars.templates['pageCount']());

		_.defer(function() {
			$blocks = view.$('.block');
			$('#pageCount .current').text(0);
			$('#pageCount .total').text($blocks.length);
			currentBlock = -1;
		});
	});

	// toggle nav styling on scroll
	$(document).scroll(function(event) {
		var triggerAmount = $('.navigation').height()*1.5;
		var showClass = $(event.currentTarget).scrollTop() > triggerAmount;
		$('.navigation').toggleClass('minimised', showClass);
	});

	$(document).keydown(function(event) {
		switch(event.keyCode) {
			case 38: // up key
				slideUp();
				break;
			case 40: // down key
				slideDown();
				break;
		}

		function slideUp() {
			if(currentBlock > 0) {
				slide($($blocks[--currentBlock]));
				return;
			}
			if(currentBlock === 0) {
				slide($('body'));
				currentBlock--;
			}
		}

		function slideDown() {
			if(currentBlock < $blocks.length-1) {
				slide($($blocks[++currentBlock]));
			}
		}


		function slide($div) {
			$('html,body').stop().animate({
				scrollTop: $div.offset().top
			}, 1000, updatePageCount);
		}

		function updatePageCount() {
			$('#pageCount .current').text(currentBlock+1);
		}
	});
});
