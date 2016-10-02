var React = require('react');

var Buttons = React.createClass({
  render: function(){
    var button1Text = "",
        button2Text = "";

    if (this.props.running){
      button1Text = "Stop";
      button2Text = "Split";
    } else {
      button1Text = "Start";
      button2Text = "Reset";
    }

    return (
      <div>
        <button onClick={this.props.clickButton1}>{button1Text}</button>
        <button onClick={this.props.clickButton2}>{button2Text}</button>
      </div>
    );
  },


});

module.exports = Buttons;
