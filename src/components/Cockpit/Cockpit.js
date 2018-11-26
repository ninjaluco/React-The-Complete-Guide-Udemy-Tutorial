import React from 'react';
import classes from './cockpit.css';
import Aux from '../../hoc/_Aux';

const cockpit = (props) => {
  const assignedClasses = [];
  let buttonClass = classes.Button;
  if (props.showPersons) {
    buttonClass = [classes.Button, classes.Red].join(' ');
  }

  if (props.persons.length <= 2) {
    assignedClasses.push( classes.red); //classes will be red classes = ['red']
  }
  if (props.persons.length <= 1 ) {
    assignedClasses.push( classes.bold ); // classes will be bold classes = ['red', 'bold']
  }

  return (
    <Aux>
      <h1>{props.appTitle}</h1>
      <p className={assignedClasses.join(' ')}>This is reallly working!</p>

      <button
        className={buttonClass}
        onClick={props.clicked}>
          Toggle Persons
      </button>
      <button onClick={props.login}>
      Log in</button>
     </Aux>
  );
};

export default React.memo(cockpit);
