require.ensure(['jquery'], function (require) {
  //pull in pjax
  let pjax = require('./../vendor/vendor-index.js').pjax();
  if ($.support.pjax) {
    $(document).on('click', 'a[data-pjax]', function(event) {
      var container = $('body').find('[data-pjax-container]');
      $.pjax.click(event, {container: container});
    });
  }
});
