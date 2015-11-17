//vender

module.exports = {
  /**
   * Since the cdns are decalred/loaded asycn we have to make sure
   * they are loaded and ready to make majic happen. If the cdn
   * fails to load then we load the script locally via req.ensure
   * @param  {arr} cndArr -> the cdn array
   * @return {prm}        -> completeion promis
   */
  cdnLoader: function (cndArr) {
    const sq = ASQ();
    const callCount = {};
    /**
     * Fn Call Counter
     * @param {str} cdn
     * @param {num} limit
     */
    const addCallCount = function (cdn, limit) {
      if (callCount[cdn] !== undefined) {
        //reached limit
        if (callCount[cdn] > limit) {
          return false;
        }
        return callCount[cdn]++;
      }
      callCount[cdn] = 0;
      return true;
    };
    /**
     * Fn to indication completeion of cdn else load dynamically
     * @param  {str} cdn
     */
    const cndFns = cndArr.map(function (cdn) {
      return function cdnCheck(done, cb) {
        //check if cdn loaded
        if (window[cdn]) {
          done();
        }else {
          //otherwise cycle call fn
          setTimeout(function () {
            if (addCallCount(cdn, 40)) {
              cdnCheck(done);
            }else {
              //cdn failed to load, load ascny in chunk
              window[cdn] = require.ensure([], function (require) {
                //throw warning
                console.warn(cdn + ' CND failed to load, loading local...');
                // You cant do this dynamically since webpack will throw a
                // warning so we have to do this by hand
                if (cdn === 'jquery') {
                  cdn = require('jquery');
                }else if (cdn === 'TweenMax') {
                  cdn = require('TweenMax');
                }
                done();
                return cdn;
              });
            }
          }, 100);
        }
      };
    });
    return sq
      //cycle through all specified
      .all.call(cndFns.forEach(function (fn) {
        return this.then(function (done) {
          fn(done);
        });
      }, sq));
  }
};
