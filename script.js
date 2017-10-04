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

// When the user scrolls the webpage, the navigation bar changes color
$(window).scroll(function() {
	if ($(window).scrollTop() > 1) {
		// Change the navigation bar background color if the window is not at the top of the page while scrolling
		$('#navbar').addClass('navbar--change-color');
		$('.navbar__menu__link').addClass('navbar__menu__link--change-color');
        $('#hamburger-icon').addClass('navbar__menu__hamburger__icon--change-color');
		$('#navbar__logo__dark').show();
		$('#navbar__logo__light').hide();
	} else {
		// Revert the navigation bar background color to the original if the window is at the top of the page
		$('#navbar').removeClass('navbar--change-color');
		$('.navbar__menu__link').removeClass('navbar__menu__link--change-color');
        $('#hamburger-icon').removeClass('navbar__menu__hamburger__icon--change-color');
		$('#navbar__logo__dark').hide();
		$('#navbar__logo__light').show();
	}
});

app.controller("NavbarCtrl", function($scope, $location) {
    // Store sections belonging to each page in arrays
    homeSections = ['hero', 'team', 'contact'];
    recommendSections = ['recommend'];

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
                    scrollTop: element.offset().top
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
            scrollTop: element.offset().top
        }, 'slow');
        setHash(elementName);
    };

    // Show the Beta Sign Up Modal
    $scope.showModal = function() {
        $scope.isModalShowing = true;
        $('#beta-gform').show();
        $('#beta-confirmation').hide();
    };

    // Close the Beta Sign Up Modal
    $scope.closeModal = function() {
        $('#beta-gform-name').val('');
        $('#beta-gform-email').val('');
        $scope.isModalShowing = false;
    };

    // Check if email entered into form is valid
    var validEmail = function(email) {
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  		return re.test(email);
    };

    // Get all data in form and return object
    var getFormData = function() {
        var elements;
        if ($scope.isModalShowing) {
            elements = document.getElementById("beta-gform").elements;
        } else {
            elements = document.getElementById("gform").elements; // all form elements
        }
  		var fields = Object.keys(elements).map(function(k) {
    		if(elements[k].name !== undefined) {
      		return elements[k].name;
    		// special case for Edge's html collection
    		} else if (elements[k].length > 0) {
      			return elements[k].item(0).name;
    		}
  		}).filter(function(item, pos, self) {
   			return self.indexOf(item) == pos && item;
  		});
  		var data = {};
  		fields.forEach(function(k){
    		data[k] = elements[k].value;
    		var str = ""; // declare empty string outside of loop to allow
                  		  // it to be appended to for each item in the loop
      		if (elements[k].type === "checkbox") {      // special case for Edge's html collection
      			str = str + elements[k].checked + ", "; // take the string and append 
                                                        // the current checked value to 
                                                        // the end of it, along with 
                                                        // a comma and a space
      			data[k] = str.slice(0, -2); // remove the last comma and space 
                                            // from the  string to make the output 
                                            // prettier in the spreadsheet
    		} else if (elements[k].length) {
      			for (var i = 0; i < elements[k].length; i++) {
        			if (elements[k].item(i).checked) {
          				str = str + elements[k].item(i).value + ", "; // same as above
          				data[k] = str.slice(0, -2);
        			}
      			}
    		}
  		});
  		console.log(data);
  		return data;
    };

    // Handle the form submission event when the submit button is clicked
    $('#beta-submit').click(function(event) { // handles form submit without any jquery
        event.preventDefault();                  // we are submitting via xhr below
        var data = getFormData();                // get the values submitted in the form
        if (!validEmail(data.email)) {           // if email is not valid show error
            return false;
        } else {
            // var url = event.target.action;
            var url = 'https://script.google.com/macros/s/AKfycbz4bSWWDOQs6oqTNmg0hKD0AiJWMoLgiJjYE_ATE62UqyNDu4c/exec';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;WWW
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                console.log(xhr.status, xhr.statusText);
                console.log(xhr.responseText);
                $('#beta-gform-name').val('');
                $('#beta-gform-email').val('');
                $('#beta-gform').hide(); // hide form
                $('#beta-confirmation').show();
                return;
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&');
            xhr.send(encoded);


        }
    });

    // Handle the form submission event when the submit button is clicked
    $('#contact-submit').click(function(event) { // handles form submit without any jquery
  		event.preventDefault();                  // we are submitting via xhr below
  		var data = getFormData();                // get the values submitted in the form
  		if (!validEmail(data.email)) {           // if email is not valid show error
    		document.getElementById('email-invalid').style.display = 'block';
    		return false;
  		} else {
    		// var url = event.target.action;
    		var url = 'https://script.google.com/macros/s/AKfycby8uD5KPTf34vIlf9qr-HfDkdWFBDcRfkpVEuz9COd4n11NZxSZ/exec';
    		var xhr = new XMLHttpRequest();
    		xhr.open('POST', url);
    		// xhr.withCredentials = true;WWW
    		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    		xhr.onreadystatechange = function() {
		        console.log(xhr.status, xhr.statusText);
		        console.log(xhr.responseText);
		        document.getElementById('gform').style.display = 'none'; // hide form
		        document.getElementById('thankyou_message').style.display = 'block';
		        $('#thank-you').show();
		        $scope.scrollTo('thank-you');
		        return;
	    	};
		    // url encode form data for sending as post data
		    var encoded = Object.keys(data).map(function(k) {
		        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		    }).join('&');
		    xhr.send(encoded);
  		}
	});
});