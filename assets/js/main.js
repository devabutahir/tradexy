/* ==============
 ========= js documentation ==========================
 
 * Template Name: Tradexy 
 * Version: 1.0
 * Author: pixelaxis
 * Author URI: https://themeforest.net/user/pixelaxis
 * Description: Forex & Stock Broker Trading Signals, Review, Tutorial Website Template
 
 * ==================================================
    
     01. preloader
     -------------------------------------------------
     02. on scroll actions
     -------------------------------------------------
     03. scroll top
     -------------------------------------------------
     04. navbar active color
     -------------------------------------------------
     05. magnificPopup
     -------------------------------------------------
     06. data background
     -------------------------------------------------
     07. reply
     -------------------------------------------------
     07. nav-right__search
     -------------------------------------------------
     08. sidebar_btn
     -------------------------------------------------
     09. faq
     -------------------------------------------------
     10. browse-spaces-filter__tab
     -------------------------------------------------
     11. contact ajax
     -------------------------------------------------
     12. btn_theme
     -------------------------------------------------
     13. price-range
     -------------------------------------------------
     13. calculator_submit
     -------------------------------------------------
     14. copyright year
     -------------------------------------------------
     
    ==================================================
============== */


    jQuery(document).ready(function () {

        // pre_loader
        $(function () {
            $(".preloader").delay(300).fadeOut(800);
        });

        // on scroll actions
        $(function () {
            var scrollOffset = 120;
            var $header = $(".header-section");
        
            if ($header.length) {
                $(window).on("scroll", function () {
                    $header.toggleClass("header-active", $(this).scrollTop() > scrollOffset);
                });
            }
        });

        // scroll top
        $(function () {
            $(window).on("scroll", function () {
                $(".scrollToTop").toggleClass("topActive", $(this).scrollTop() > 500);
            });
        });

        // navbar active color
        $(function () {
            $(".navbar-nav").on("click", ".nav-item a", function () {
                $(".nav-item a").removeClass("active");
                $(this).addClass("active");
            });
        });

        //Password Viewer
        const inputs = document.querySelectorAll('.passwordInput');
        inputs.forEach(input => {
            const eye = input.querySelector('.bi-eye'); // Corrected class name
            const eyeSlash = input.querySelector('.bi-eye-slash'); // Corrected class name
            const password = input.querySelector('input');
            if (eye && eyeSlash && password) {
                eyeSlash.addEventListener('click', () => {
                    password.type = 'text';
                    eye.style.display = 'inline-block';
                    eyeSlash.style.display = 'none';
                });
                eye.addEventListener('click', () => {
                    password.type = 'password';
                    eye.style.display = 'none';
                    eyeSlash.style.display = 'inline-block';
                });
            }
        });

        // magnificPopup
        $(function () {
            if ($.fn.magnificPopup) {  // Ensure the plugin is loaded
                $(".popup_img").magnificPopup({
                    type: "image",
                    gallery: {
                        enabled: true
                    }
                });
            } else {
                console.error("Magnific Popup plugin not found.");
            }
        });

        // data background
        $(function () {
            $("[data-background]").each(function () {
                var bg = $(this).attr("data-background");
                if (bg) {
                    $(this).css("background-image", `url(${bg})`);
                }
            });
        });

        // reply/View All Content
        $(function () {
            $(".reply").on("click", function () {
                $(this).toggleClass("reply-active")
                .parent()
                .next(".reply__content")
                .stop(true, true)
                .slideToggle();
            });
            //--View All Content
            $(".view-btn").on("click", function () {
                $(this).toggleClass("view-active");
                $(this).parents().next(".view-content-wrap").toggleClass("active").slideToggle();
            });        
        });


        // nav-right__search
        $(function () {
            $(".nav-right__search-icon").on("click", function (event) {
                event.stopPropagation(); // Prevents event bubbling
                $(this).toggleClass("active")
                       .parent()
                       .next(".nav-right__search-inner")
                       .stop(true, true)
                       .slideToggle();
            });
        
            $(document).on("click", function (event) {
                if (!$(event.target).closest(".nav-right__search-icon, .nav-right__search-inner").length) {
                    $(".nav-right__search-inner").stop(true, true).slideUp();
                    $(".nav-right__search-icon").removeClass("active");
                }
            });
        });
        
        // sidebar_btn
        $(function () {
            $(".sidebar_btn").on("click", function () {
                $(".cus_scrollbar").toggleClass("show");
            });
        });

        // faq
        $(function () {
            $(".accordion-header").on("click", function () {
                var $accordionItem = $(this).closest('.accordion-item'); // Find the closest accordion item
                
                $('.accordion-item').removeClass("accordion_bg"); // Remove class from all items
                $accordionItem.toggleClass("accordion_bg"); // Toggle the class on the clicked item
            });
        });

        // copyright year
        $(function () {
            $("#copyYear").text(new Date().getFullYear());
        });

    });

    // btn_theme
    $(document).on('mouseenter mouseout', '.btn_theme', function (e) {
        var parentOffset = $(this).offset(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        $(this).find('span').css({ top: relY, left: relX });
    });
   
    (function () {
        // Function to handle multiple sliders
        function RangeSlider(sliderOneId, sliderTwoId, minValId, maxValId, totalOutputId, sliderTrackSelector) {
            // Get DOM elements
            let sliderOne = document.getElementById(sliderOneId);
            let sliderTwo = document.getElementById(sliderTwoId);
            let displayValOne = document.getElementById(minValId);
            let displayValTwo = document.getElementById(maxValId);
            let totalOutput = document.getElementById(totalOutputId);
            let sliderTrack = document.querySelector(sliderTrackSelector);
            let minGap = 0;
            let sliderMaxValue = sliderOne.max;
    
            // Update first slider value
            function slideOne() {
                if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                    sliderOne.value = parseInt(sliderTwo.value) - minGap;
                }
                displayValOne.textContent = sliderOne.value;
                updateTotal();  
                fillColor();  
            }
    
            // Update second slider value
            function slideTwo() {
                if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                    sliderTwo.value = parseInt(sliderOne.value) + minGap;
                }
                displayValTwo.textContent = sliderTwo.value;
                updateTotal(); 
                fillColor();  
            }
    
            // Update the total price range and display it
            function updateTotal() {
                let total = sliderTwo.value - sliderOne.value;
                totalOutput.textContent = `Years: ${total}`;
            }
    
            // Update slider track background color
            function fillColor() {
                let percent1 = (sliderOne.value / sliderMaxValue) * 100;
                let percent2 = (sliderTwo.value / sliderMaxValue) * 100;
                sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #074C3E ${percent1}% , #074C3E ${percent2}%, #dadae5 ${percent2}%)`;
            }
    
            // Bind events using .on() method
            $(sliderOne).on('input', slideOne);
            $(sliderTwo).on('input', slideTwo);
    
            slideOne();
            slideTwo();
        }
    
        // Initialize all sliders on the page
        $(document).ready(function () {
            if (document.getElementById('range-slider-1') && document.getElementById('range-slider-2')) {
                new RangeSlider('range-slider-1', 'range-slider-2', 'min-value', 'max-value', 'range-output', '.slider-track');
            }
    
            if (document.getElementById('range-slider-3') && document.getElementById('range-slider-4')) {
                new RangeSlider('range-slider-3', 'range-slider-4', 'min-value-2', 'max-value-2', 'range-output-2', '.slider-track-2');
            }
        });
    
        // Calculator logic with event binding via .on()
        const amount = document.getElementById('amount'),
            interest = document.getElementById('interest'),
            year = document.getElementById('year'),
            monthly_cost = document.getElementById('monthly_cost'),
            calculate = document.getElementById('calc_submit'),
            total_value = document.getElementById('total_value');
    
        const amount2 = document.getElementById('amount2'),
            interest2 = document.getElementById('interest2'),
            year2 = document.getElementById('year2'),
            monthly_cost2 = document.getElementById('monthly_cost2'),
            calculate2 = document.getElementById('calc_submit2'),
            total_value2 = document.getElementById('total_value2');
    
        // Using .on() for event binding
        if (calculate) {
            $(calculate).on('click', function (e) {
                e.preventDefault();
                if (amount && interest && year) {
                    let total = (amount.value / 100 * interest.value) + parseInt(amount.value);
                    total_value.innerHTML = total.toFixed(2);
                    monthly_cost.innerHTML = (total / (year.value * 12)).toFixed(2);
                }
                if (amount2 && interest2 && year2) {
                    let total2 = (amount2.value / 100 * interest2.value) + parseInt(amount2.value);
                    total_value2.innerHTML = total2.toFixed(2);
                    monthly_cost2.innerHTML = (total2 / (year2.value * 12)).toFixed(2);
                }
            });
        }
    
        // Additional event listener for second calculator (if applicable)
        if (calculate2) {
            $(calculate2).on('click', function (e) {
                e.preventDefault();
                if (amount2 && interest2 && year2) {
                    let total2 = (amount2.value / 100 * interest2.value) + parseInt(amount2.value);
                    total_value2.innerHTML = total2.toFixed(2);
                    monthly_cost2.innerHTML = (total2 / (year2.value * 12)).toFixed(2);
                }
            });
        }
    })();    
    
