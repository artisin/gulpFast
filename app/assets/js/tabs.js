


$(document).ready(function() {
    $('.box').on('click', function(e)  {
      e.preventDefault();
      
      var color = $(this).css('background-color');
      var colorVals = color.split(",");
      var newColor = '';
      for (var i = 0; i < colorVals.length; i++) {
        if (i === 3) {
          newColor = newColor + ", 0.8)";
        }else if(i !== 0){
          newColor = newColor + "," +colorVals[i];
        }else{
          newColor = newColor + colorVals[i];
        }
      }
      $(this).css('background-color', newColor);
      $(this).siblings().removeClass('active');
      $(this).siblings().removeAttr('style');
      $(this).addClass('active');

      var tl = TweenLite;
      var className = $(this).attr('class').split(' ')[0],
          id = "#" + className,
          removeElm = $(id).siblings().closest('.active');

      function removeId () {
        $(removeElm).removeClass('active');
        $(id).addClass('active');
        tl.to(id, 0.6, {x:"10%", opacity:1});
      }
      tl.to(removeElm, 0.6, {x:"200%", opacity:0, onComplete: removeId});
  


      // $(id).siblings().fadeOut();
      // $(id).fadeIn();



    });
});