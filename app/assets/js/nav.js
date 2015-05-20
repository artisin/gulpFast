var pg =  require('./particle');

$(function(){

  var shrinkHeader = 200,
      isShrunk = false;

  var shrunkVar = function () {
    isShrunk ? isShrunk = false : isShrunk = true;
  };

  var shrink = function () {
    //Pause particle effect
    pg.pause();
    //Shrink nave
    $('.nav_Wrapper').addClass('shrunk')
    $('.splash_Container img').addClass('shrunk')
    shrunkVar();
  };

  var expand = function () {
    //Start particle effect
    pg.start();
    //Expand nav
    $('.nav_Wrapper').removeClass('shrunk')
    $('.splash_Container img').removeClass('shrunk')
    shrunkVar();
  };

  $(window).scroll(function() {
    var scroll = getCurrentScroll();
      if ( scroll >= shrinkHeader ) {
          if (!isShrunk) {
            shrink();
          };
        }
        else {
          if (isShrunk) {
            expand();
          };
        }
  });

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});


//Nav
$(".navAbout" ).click(function(e) {
  e.preventDefault();
  var pos = $('.about_Wrapper').offset().top;
  var adj = $('.styleBreak')[0].offsetHeight - 14;
  TweenLite.to(window, 2, {scrollTo:{y: pos - adj}, ease:Power2.easeOut});
});

$(".navProjects" ).click(function(e) {
  e.preventDefault();
  var pos = $('.project_Wrapper').offset().top;
  var adj = $('.styleBreak')[0].offsetHeight - 14;
  TweenLite.to(window, 2, {scrollTo:{y: pos - adj}, ease:Power2.easeOut});
});



var bodyH = $('body').outerHeight();
var tl = new TimelineLite();
var phoneTrigger = false;

$(window).scroll(function() {
  var scrollPos = $(window).scrollTop();



  //phone
  // console.log(scrollPos + $(window).outerHeight())
  // console.log(bodyH)
  if ((bodyH - 180) < scrollPos + $(window).outerHeight())  {

  }else{
    var phoneTrigger = true;


  }

});