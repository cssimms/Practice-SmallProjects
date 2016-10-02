var React = require('react'),
  Display = require('./display'),
  Buttons = require('./buttons');

var Watch = React.createClass({
  getInitialState: function(){
    return {elapsed: 0, running: true, splits: []};
  },

  tick: function(){
    if (this.state.running){
      this.setState({elapsed: this.state.elapsed + 1});
    }
  },

  click1: function(){
    if (this.state.running){
      this.setState({running: false});
    } else {
      this.setState({running: true});
    }
  },

  click2: function(){
    if (this.state.running){
      var newSplits = this.state.splits;
      newSplits.push(this.state.elapsed);
      this.setState({split: newSplits});
    } else {
      this.setState({elapsed: 0, splits: []});
    }
  },

  render: function(){
    return (
      <div>
        <Display elapsed={this.state.elapsed}/>
        <Buttons running={this.state.running}
          clickButton1={this.click1}
          clickButton2={this.click2}/>
        <p>{this.state.splits}</p>
      </div>
    );
  },

  componentDidMount: function(){
    setInterval(this.tick, 1000);
  }
});

module.exports = Watch;
