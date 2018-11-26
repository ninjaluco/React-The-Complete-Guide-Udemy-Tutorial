import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/_Aux';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('App.js inside constructor', props);
  }

  // New way to initialise the state
  state = {
    persons: [
      { id: 'ads', name: 'Nicolas', age: 34},
      { id: 'dfs', name: 'Estefany', age: 24},
      { id: 'sfg', name: 'Cristian', age: 33}
    ],
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount()');
    // Older way to initialise the state
    // this.state = {
    //     persons: [
    //       { id: 'ads', name: 'Nicolas', age: 34},
    //       { id: 'dfs', name: 'Estefany', age: 24},
    //       { id: 'sfg', name: 'Cristian', age: 33}
    //     ],
    //     showPersons: false
    //   }
  }

  componentDidMount(){
    console.log('[App.js] inside componentDidMounted')
  }

  // ---------------------------------------------------------
  // THIS DOES NOT NEED IF IMPORTIN "PureComponent" INSTEAD
  // OF "Component"!!!!!!!!
  // ---------------------------------------------------------
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return (
  //     nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons
  //   );
  // }

  componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  // static getDerivedStateFromProps (nextProps, prevState) {
  //   console.log(
  //     '[UPDATE App.js] Inside getDerivedStateFromProps()',
  //     nextProps, prevState
  //   );
  //
  //   return prevState;
  // }

  // getSnapshotBeforeUpdate() {
  //   console.log(
  //     '[UPDATE App.js] Inside getSnapshotBeforeUpdate()'
  //   );
  // }

  componentDidUpdate(){
    console.log('[UPDATE App.js] Inside componentDidUpdate()');
  }



  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return (p.id === id);
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); Oldway to copy
    const persons = [...this.state.persons]; //New way
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandle = () => {
      console.log('App.js', this.state.authenticated);
      this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] inside render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}/>;
    }

     return (
       <Aux>
          <button onClick={ () => {this.setState({showPersons: true})}}>
            Show Persons
          </button>
          <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandle}
          clicked={this.togglePersonsHandler} />
          <AuthContext.Provider value={this.state.authenticated}>
              {persons}
          </AuthContext.Provider>
       </Aux>
     );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default withClass(App, classes.App);
