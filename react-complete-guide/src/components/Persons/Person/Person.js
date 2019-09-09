import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props)
    this.inputElRef = React.createRef();
  }

  componentDidMount() {
    this.inputElRef.current.focus();
  }

  render() {
    const {
      click,
      name,
      age,
      changed,
      children,
    } = this.props;

    return (
      <div className={classes.Person}>
        { this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
        <p onClick={click}>I'm {name} {age} years old</p>
        <p>{children}</p>
        <input type="text" onChange={changed} value={name} ref={this.inputElRef}/>
      </div>
    )
  }
};

Person.propTypes = {
  clicked: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
}

export default Person;