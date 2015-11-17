//main app
const vendorCDN = require('./vendor/vendor-cdn.js');

//name space loading
const siteNameSpace  = {
  common: {
    onload: function () {
      require('./component/common.js');
    }
  },
  home: {
    onload: function() {
      require.ensure(['./vendor/vendor-index.js'], function (require) {
        require('./page/home.js');
      });
    }
  },
  contact: {
    onload: function() {
     // onload stuff for contact us page
    }
  }
};

//This will check vendor scripts loaded from a cdn since they are
//being loaded async. If the scripts is not present after 4s it
//pulls in the local script dynamically
const cdnVendorScripts = ['jQuery', 'TweenMax'];
ASQ()
  .seq(vendorCDN.cdnLoader(cdnVendorScripts))
  .then(function (done) {
    done($(document).ready(function () {
      //load common
      siteNameSpace.common.onload();
      //load page
      siteNameSpace[ document.body.id.toLowerCase() ].onload();
    }));
  });
