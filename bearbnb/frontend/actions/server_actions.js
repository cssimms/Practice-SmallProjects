var Dispatcher = require('../dispatcher/dispatcher'),
BenchConstants = require('../constants/bench_constants');

var ServerAction = {
  receiveBenches: function (res) {
    Dispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: res
    });
  }
};


module.exports = ServerAction;
