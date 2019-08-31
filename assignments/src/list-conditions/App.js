import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    textField: ''
  }

  textFieldChangeHandler = (event) => {
    this.setState({
      textField: event.target.value
    })
  }

  onCharRemoveHandler = (index) => {
    const charsArr = this.state.textField.split('')
    charsArr.splice(index, 1);

    this.setState({
      textField: charsArr.join('')
    })
  }

  render() {
    const letters = this.state.textField
      .split('')
      .map( (l, i) => (
        <CharComponent
          letter={l}
          clicked={() => this.onCharRemoveHandler(i)}
        />
      ))

    return (
      <div>
        <input
          type="text"
          value={this.state.textField}
          onChange={this.textFieldChangeHandler}
        />
        <p>Length: {this.state.textField.length}</p>
        <ValidationComponent textLength={this.state.textField.length}/>
        {letters}
      </div>
    );
  }
}

export default App;
