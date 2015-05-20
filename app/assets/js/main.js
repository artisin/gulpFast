console.log('App loaded');
//Header
require('./nav');

//Particle background
var pg = require('./particle');
pg.pause();

//tabs
require('./tabs');


//App Intro
$(document).ready(function() {
  //Center text
  var cetnerIntroText = function () {
    $('.introTitle').each(function (index, elm) {
      elm = $(elm);
      var text = elm.children();
      var adjust = ($(text).outerWidth() / 2 + 20) * -1;
      elm.css('width', $(text).outerWidth() + 30);
      elm.css('margin-left', adjust);
    });
  };
  var cetnerTitleText = function () {
    $('.titleText').each(function (index, elm) {
      elm = $(elm);
      var text = elm.children();
      var extraAdj = 0;
      //adj
      if (index === 3) {
        extraAdj = -10;
      }
      var adjust = ($(text).outerWidth() / 2 + (20 + extraAdj)) * -1;
      elm.css('width', $(text).outerWidth() + 30);
      elm.css('margin-left', adjust);
    });
  };

  cetnerIntroText();
  cetnerTitleText();
  //Resize
  $(window).resize(
    function () {
    cetnerIntroText();
    cetnerTitleText(); 
  });



  var tl = new TimelineLite();
  //Intro 
  tl.to('.mainLogo', 0.9, {opacity:1})
    // .to('.introOne', 0.9, {css:{opacity: 1, transform:"scale(1)"}})
    // .to('.introOne', 0.35, {css:{autoAlpha:0, transform:"scale(0)"}})
    // .to('.introTwo', 0.9, {css:{opacity: 1, transform:"scale(1)"}})
    // .to('.introTwo', 0.35, {css:{autoAlpha:0, transform:"scale(0)"}})
    // .to('.introThree', 0.9, {css:{opacity: 1, transform:"scale(1)"}})
    // .to('.introThree', 0.35, {css:{autoAlpha:0, transform:"scale(0)"}})
    // .to('.introFour', 0.9, {css:{opacity: 1, transform:"scale(1)"}})
    // .to('.introFour', 0.35, {css:{autoAlpha:0, transform:"scale(0)"}})
    .to('.inF1', 0.35, {css:{opacity: 1, transform:"scale(1)"}})
    .to('.inF2', 0.35, {css:{opacity: 1, transform:"scale(1)"}})
    .to('.inF3', 0.35, {css:{opacity: 1, transform:"scale(1)"}})
    .to('.inF4', 0.35, {css:{opacity: 1, transform:"scale(1)"}})
    .to('.mainLogo', 0.6, {top:"25%"})
    .to('.titleText', 0.6, {top: "25%"}, "-=0.6")
    .to('nav', 0.5, {css:{opacity: 1, transform:"translateY(0%)"}}, "-=1.2")
    .to('nav', 0.5, {onComplete:particle}); 

});

function particle () {
  pg.start();
}


