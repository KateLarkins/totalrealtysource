document.addEventListener("DOMContentLoaded", function() {
    const propertyCarousel = document.querySelector('.property-carousel');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const widgetWidth = propertyCarousel.offsetWidth / 3;
    let currentIndex = 0;

    arrowLeft.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            propertyCarousel.style.transform = `translateX(-${currentIndex * widgetWidth}px)`;
        }
    });

    arrowRight.addEventListener('click', function() {
        if (currentIndex < propertyCarousel.children.length - 3) {
            currentIndex++;
            propertyCarousel.style.transform = `translateX(-${currentIndex * widgetWidth}px)`;
        }
    });
});
// navabr
class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();

// Paralax- I dont like it

// window.addEventListener('scroll', function() {
//     const parallax = document.querySelector('.parallax-bg');
//     let scrollPosition = window.pageYOffset;
//     parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
// });
// navbar scroll

$(document).ready(function() {
	// Transition effect for navbar 
	$(window).scroll(function() {
	  // checks if window is scrolled more than 500px, adds/removes solid class
	  if($(this).scrollTop() > 500) { 
		  $('.navbar').addClass('solid');
	  } else {
		  $('.navbar').removeClass('solid');
	  }
	});
});