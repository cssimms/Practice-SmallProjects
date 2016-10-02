var ServerActions = require('../actions/server_actions');

var ApiUtil = {
  fetchBenches: function () {
    $.ajax({
      url: "api/benches",
      type: "GET",
      success: function(response){
        ServerActions.receiveBenches(response);
      }
    });
  }
};


window.ApiUtil = ApiUtil;

module.eports = ApiUtil;
