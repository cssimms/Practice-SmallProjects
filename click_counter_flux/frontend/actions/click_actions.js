var dispatcher = require('../dispatcher');

var ClickActions = {
  increment: function(){
    dispatcher.dispatch({
      actionType: "COUNT"
    });
  }
};

module.exports = ClickActions;
