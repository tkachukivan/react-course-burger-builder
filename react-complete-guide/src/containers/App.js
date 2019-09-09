import React, { Component } from 'react';

import classes from'./App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context'

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 28, },
      { id: '2', name: 'Manu', age: 29, },
      { id: '3', name: 'Bip', age: 19, }
    ],
    showPersons: false,
    authenticated: false,
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  nameChangedHandler = (newName, id) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === id);
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1, { ...this.state.persons[personIndex], name: newName })
    this.setState({
      persons,
    });
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons,
    });
  }

  loginHandler = () => {
    this.setState({
      authenticated: true
    });
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}
                />;
    }

    return (
      <div className={classes.App}>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler}}
          >
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
          />
          { persons }
        </AuthContext.Provider>
      </div>
    );
  }
};

export default App;