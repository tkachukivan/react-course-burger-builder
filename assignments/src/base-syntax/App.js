import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {
  state = {
    userName: 'David'
  }

  userNameChangeHandler = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <div>
        <UserInput userName={this.state.userName} changed={this.userNameChangeHandler}/>
        <UserOutput userName={this.state.userName}/>
      </div>
    );
  }
}

export default App;
