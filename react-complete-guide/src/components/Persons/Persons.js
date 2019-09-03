import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {    
  //   return nextProps.persons !== this.props.persons;
  // }

  render() {
    return (
      this.props.persons.map((p, i) => (
        <Person
          name={p.name}
          age={p.age}
          key={p.id}
          click={() => this.props.clicked(i)}
          changed={(event) => this.props.changed(event.target.value, p.id)}
        />
      ))
    );
  }
}

export default Persons;