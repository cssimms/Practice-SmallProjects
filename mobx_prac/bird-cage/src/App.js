import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject( 'BirdStore' )

@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.addDatBurb = this.addDatBurb.bind(this);
  }

  addDatBurb( event ) {
    event.preventDefault();

    const bird = this.bird.value;
    this.props.BirdStore.addBird(bird);
    this.bird.value = '';
  }

  getBurbList() {
    return (
      this.props.BirdStore.birds.map( (bird, index) => (
          <li key={index}>{bird}</li>
      ))
    )
  }

  render() {
     const { BirdStore } = this.props;

    return (
      <div className="App">
        <h2>You gots {BirdStore.birdCount || 0} burbs</h2>

        <br/>

        <form onSubmit={this.addDatBurb}>
          <input
            type="text"
            placeholder="Enter ur burb"
            ref={ input => this.bird = input }
          />
          <button>
            Add da Burb.
          </button>
        </form>

        <br/>

        <ul>
          { this.getBurbList() }
        </ul>

      </div>
    );
  }
}

export default App;
