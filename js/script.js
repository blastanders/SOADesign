var lastScrollTop = 0;
var isAnimating = false;

function setFullWindow (divID) {
	var documentHeight = $(window).innerHeight();
	var documentWidth = $(window).innerWidth();

	//console.log(document.getElementById(divID));

	document.getElementById(divID).style.height= documentHeight +'px';
	document.getElementById(divID).style.width= documentWidth + 'px';

	//console.log("height: " + documentHeight + " - " + "width: " + documentWidth);
}

function setIsAnimatingFalse () {
	isAnimating = false;	
}

function getPageNumber (currentScrollPosition)
{
	var pageNumber = 0;

		if (currentScrollPosition <= $("#page1").offset().top) {
			pageNumber = 0;
		} else if (currentScrollPosition > $("#page1").offset().top && currentScrollPosition < $("#page2").offset().top) {
        	pageNumber = 1;
        } else if (currentScrollPosition >= $("#page2").offset().top && currentScrollPosition < $("#page3").offset().top) {
        	pageNumber = 2;
        } else if (currentScrollPosition >= $("#page3").offset().top && currentScrollPosition < $("#page4").offset().top) {
        	pageNumber = 3;
        } else if (currentScrollPosition >= $("#page4").offset().top) {
        	pageNumber = 4;
        };
        return pageNumber;
}


$(window).bind('mousewheel DOMMouseScroll', function(event){
	var currentScrollPosition = $(this).scrollTop();
	event.preventDefault();
	console.log(getPageNumber(currentScrollPosition));

	if(getPageNumber(currentScrollPosition) <= 1){
		$("#bannerLogo").removeClass("hidden");
        $("#bannerFullLogo").addClass("hidden");
	}else{
		$("#bannerLogo").addClass("hidden");
        $("#bannerFullLogo").removeClass("hidden");
	}

    if(isAnimating)
    	return;

	isAnimating = true;

    if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        // scroll up
        var targetPageNumber = getPageNumber(currentScrollPosition) - 1;
        var targetPageID = "#page";

    	if(getPageNumber(currentScrollPosition) <= 1)
		{
			isAnimating = false;
			return;
			console.log("adf");
		};

        if (targetPageNumber < 1)
        	targetPageNumber = 1;

        targetPageID = targetPageID + targetPageNumber;

        $('html, body').animate({scrollTop: $(targetPageID).offset().top}, 800);

        if(getPageNumber(currentScrollPosition) <= 1)
        {
        	isAnimating = false;
        }else{
        	window.setTimeout(setIsAnimatingFalse, 800);
        };
    }
    else {
        // scroll down
        var targetPageNumber = getPageNumber(currentScrollPosition) + 1;
        var targetPageID = "#page";

        if(getPageNumber(currentScrollPosition) >= 4)
		{
			isAnimating = false;
			return;
		};

        if (targetPageNumber > 4)
        	targetPageNumber = 4;

        if (targetPageNumber == 1)
        	targetPageNumber = 2;

        targetPageID = targetPageID + targetPageNumber;

        $('html, body').animate({scrollTop: $(targetPageID).offset().top}, 800);

        if(getPageNumber(currentScrollPosition) == 4)
        {
        	isAnimating = false;
        }else{
        	window.setTimeout(setIsAnimatingFalse, 800);
        };
    }

});