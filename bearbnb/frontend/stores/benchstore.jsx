     var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
BenchConstants = require('../constants/bench_constants');

var BenchStore = new Store(Dispatcher);

var _benches = {};

BenchStore.all = function () {
  return Object.assign({}, _benches);
};

BenchStore.__onDispatch = function(payload){
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
     _benches = payload.benches;
     console.log(payload);
     break;
  }
  this.__emitChange();

};

window.BenchStore = BenchStore;

module.exports = BenchStore;
