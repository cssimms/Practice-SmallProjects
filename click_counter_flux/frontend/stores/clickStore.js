var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher');

var _clickCount = 0;

var ClickStore = new Store(dispatcher);

ClickStore.count = function(){
  return _clickCount;
};

ClickStore.__onDispatch = function(payload){
  if(payload.actionType === "COUNT"){
    _clickCount++;
    ClickStore.__emitChange();
  }
};

module.exports = ClickStore;
