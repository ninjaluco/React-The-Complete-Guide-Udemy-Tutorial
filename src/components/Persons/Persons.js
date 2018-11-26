import React, {PureComponent} from 'react';
import Person from './Person/Person';


class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log('Persons.js inside constructor', props);
    this.lastPersonRef = React.createRef();
  }

  componentWillMount(){
    console.log('[Persons.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[Persons.js] inside componentDidMounted');
    this.lastPersonRef.current.focus();
  }

  componentWillReceiveProps (nextProps) {
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps() ', nextProps);
  }

  // ---------------------------------------------------------
  // THIS DOES NOT NEED IF IMPORTIN "PureComponent" INSTEAD
  // OF "Component"!!!!!!!!
  // ---------------------------------------------------------
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons ||
  //   nextProps.changed !== this.props.changed ||
  //   nextProps.clicked !== this.props.clicked;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE Persons.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  componentDidUpdate(){
    console.log('[UPDATE Persons.js] Inside componentDidUpdate()');
  }

  render () {
    console.log('[Persons.js] inside Render()');

    return this.props.persons.map((person, index) => {
      return <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        position={index}
        age={person.age}
        ref={this.lastPersonRef}
        key={person.id}
        changed={(event) => this.props.changed(event, person.id)}/>
      } );
  }
}

export default Persons;
