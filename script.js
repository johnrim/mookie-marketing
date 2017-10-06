// Initiate Angular and specify dependencies
var app = angular.module("syndioMarketingApp", ["ngRoute"]);

app.config(function($routeProvider) {

    $routeProvider.when("/", {
        controller: "HomeCtrl",
        templateUrl: "templates/home.html"
    })

    $routeProvider.when("/recommend", {
        templateUrl: "templates/recommend.html"
    })
});

// Nav items hover effect
1
$('.link__1').hover(function() {
    $('.highlight1').toggleClass("hover")
});

$('.link__2').hover(function() {
    $('.highlight2').toggleClass("hover")
});

$('.link__3').hover(function() {
    $('.highlight3').toggleClass("hover")
});


// When the user scrolls the webpage, the navigation bar changes color
$(window).scroll(function() {
	if ($(window).scrollTop() > 1) {
		// Change the navigation bar background color if the window is not at the top of the page while scrolling
		$('#navbar').addClass('navbar--change-color');
		$('.navbar__menu__link').addClass('navbar__menu__link--change-color');
        $('.contact p').addClass('navbar__menu__link--change-color');
        $('#hamburger-icon').addClass('navbar__menu__hamburger__icon--change-color');
		$('#navbar__logo__dark').show();
		$('#navbar__logo__light').hide();
	} else {
		// Revert the navigation bar background color to the original if the window is at the top of the page
		$('#navbar').removeClass('navbar--change-color');
		$('.navbar__menu__link').removeClass('navbar__menu__link--change-color');
        $('.contact p').removeClass('navbar__menu__link--change-color');
        $('#hamburger-icon').removeClass('navbar__menu__hamburger__icon--change-color');
		$('#navbar__logo__dark').hide();
		$('#navbar__logo__light').show();
	}
});

app.controller("NavbarCtrl", function($scope, $location) {
    // Store sections belonging to each page in arrays
    homeSections = ['hero', 'philosophy', 'services', 'team'];

    // When a link is clicked, the page scrolls (with animation) or routes to the relevant element
    $scope.navigateTo = function(elementName) {
        // Get the name of element ID
        var element = $('#' + elementName);

        // Identify which page contains the element
        if (homeSections.indexOf(elementName) > -1) {
            if ($location.path() !== '/') {
                // If not on the correct page, route to the correct page
                $location.path('/');
                if (elementName !== 'hero') {
                    setHash(elementName);
                }
            } else {
                // If on correct page, animated scroll to element
                $('html, body').animate({
                    scrollTop: element.offset().top -65
                }, 'slow');
                setHash(elementName);
            }
        } else if (recommendSections.indexOf(elementName) > -1) {
            setHash('');
            $location.path('/recommend');
        }
    };

    // Change the hash in the URL bar (set to non-existent hash at first to avoid bug with persisting hash)
    setHash = function(hashName) {
        $location.hash('redirect');
        $location.hash(hashName);
    }

    // Toggle hamburger menu for mobile navigation
    $scope.toggleHamburger = function() {
        if ($('#hamburger-content').is(':visible')) {
            $('#hamburger-content').hide();
        } else {
            $('#hamburger-content').show();
        }   
    };

    // Allow user to deactivate the hamburger menu when clicking outside of the menu
    $(window).click(function(event) {
        if ($('#hamburger-content').is(':visible') && event.target.id !== 'hamburger-icon') {
            $('#hamburger-content').hide();
        }
    }); 
});

app.controller('HomeCtrl', function($scope) {
    // Keep lightbox invisible on default
    $scope.isModalShowing = false;

    // Animated scroll to specified element on the page
    $scope.scrollTo = function(elementName) {
        var element = $('#' + elementName);
        $('html, body').animate({
            scrollTop: element.offset().top -65
        }, 'slow');
        setHash(elementName);
    };

});