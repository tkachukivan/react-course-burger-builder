import React, { Component } from 'react';
import classes from './Person.css'

class Person extends Component {
  render() {
    const {
      click,
      name,
      age,
      changed,
      children
    } = this.props;

    return (
      <div className={classes.Person}>
        <p onClick={click}>I'm {name} {age} years old</p>
        <p>{children}</p>
        <input type="text" onChange={changed} value={name} />
      </div>
    )
  }
};

export default Person;