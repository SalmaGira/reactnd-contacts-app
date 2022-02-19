import React, { Component } from "react";
// import logo from '../logo.svg';
import "./App.css";

class App extends Component {
  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="container">
          <input
            type="text"
            placeholder="Say Something"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <p className="echo">Echo:</p>
          {this.state.query && <p>{this.state.query}</p>}
        </div>
      </div>
    );
  }
}

export default App;
