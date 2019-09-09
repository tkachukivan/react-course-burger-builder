import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth-context';

import classes from './Cockpit.css';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('Cockpit use effect')
  }, [])

  const authContext = useContext(AuthContext);

  const assignedClasses = [];
  let btnClass = '';

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }

  if (props.personsLength <=1) {
    assignedClasses.push(classes.bold)
  }

  if (props.showPersons) {
    btnClass = classes.Red;
  }  

  return (
    <div>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working</p>
      <button className={btnClass} onClick={props.clicked}>
        Switch name
      </button>
      <button onClick={authContext.login}>Log in</button>
    </div>
  )
}

export default React.memo(Cockpit);