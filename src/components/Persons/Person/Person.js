import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/_Aux';

import {AuthContext} from '../../../containers/App';

class Person extends Component {
  constructor(props) {
    super(props);
    console.log('Person.js inside constructor', props);
    this.inputElement = React.createRef();
  }

  componentWillMount(){
    console.log('[Person.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[Person.js] inside componentDidMounted');
    if (this.props.position === 0) {
      this.inputElement.current.focus();
    }
  }

  focus () {
    this.inputElement.current.focus();
  }

  render() {
    console.log('[Persons.js] inside Render()');
    return (
      <Aux>
        <AuthContext.Consumer>
            {auth => auth ?
              <p>I'm Authenticated</p> : null}
        </AuthContext.Consumer>

        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} old!</p>
        <p>{this.props.children}</p>
        <input
        ref={this.inputElement}
        type="text"
        onChange={this.props.changed}
        value={this.props.name} />
      </Aux>
  );
  // return [
  //   <p key="1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} old!</p>,
  //   <p key="2">{this.props.children}</p>,
  //   <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />
  // ]
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);