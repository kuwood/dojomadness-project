import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Overwatch Heroes</h1>
        </header>
        {this.state.loading && <p className='loading'>Loading...</p>}
      </div>
    );
  }
}

export default App;
