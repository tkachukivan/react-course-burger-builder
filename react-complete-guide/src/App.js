import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Max', age: 28, },
      { id: '2', name: 'Manu', age: 29, }
    ],
    showPersons: false,
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

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          { this.state.persons
                .map((p, i) => (
                  <Person
                    name={p.name}
                    age={p.age}
                    key={p.id}
                    click={() => this.deletePersonHandler(i)}
                    changed={(event) => this.nameChangedHandler(event.target.value, p.id)}
                    />
                ))
          }
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi</h1>
        <button style={style} onClick={this.togglePersonsHandler}>
          Switch name
        </button>
        { persons }
      </div>
    );
  }
};

export default App;