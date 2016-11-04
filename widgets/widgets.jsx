import React from 'react';
import ReactDOM from 'react-dom';

class Widgets extends React.component {
  render() {
    return(
      <div>Hello?</div>
    );
  }
}

console.log('hit listener');
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Widgets/>,
    document.getElementById('root')
  );
});
