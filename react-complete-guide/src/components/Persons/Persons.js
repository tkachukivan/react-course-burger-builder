import React from 'react';
import Person from './Person/Person';

const Persons = (props) => (
    props.persons.map((p, i) => (
        <Person
        name={p.name}
        age={p.age}
        key={p.id}
        click={() => props.clicked(i)}
        changed={(event) => props.changed(event.target.value, p.id)}
        />
    ))
);

export default Persons;