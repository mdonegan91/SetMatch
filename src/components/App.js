import React from 'react';
import Header from './Header';
import OnSet from './OnSet';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
      <div className="game-set-match">
        <div className="love-all">
          <Header />
          <OnSet />
          <Inventory />
        </div>
      </div>
    )
  }
}

export default App;