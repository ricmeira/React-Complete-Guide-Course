import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context'

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 1, name:"Max", age:29 },
      { id: 2, name:"Steve", age:18 },
      { id: 3, name:"Ethan", age:31 }
    ],
    otherState: 'Some value',
    showPerson: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps');
    return state;
  }

  componentWillMount(){
    console.log('[App.js] componentWillMount');
  }
  componentDidMount(){
    console.log('[App.js] componentDidMount');    
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');  
  }

  nameChangedHandler = (event, id) => {
    console.log(event.target.value);
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandle = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow})
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js] render');
    let persons = null;

    if(this.state.showPerson){
        persons = (
            <Persons 
              persons={this.state.persons} 
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler}
              isAuthenticated={this.state.authenticated}
            />
        );
    }

    //<WithClass classes={classes.App}>
    return (
      <Auxiliary>
        <button onClick={() => {this.setState({showCockpit: !this.state.showCockpit})}}>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler }}>
          {this.state.showCockpit ?  (
            <Cockpit title={this.props.appTitle}
              showPerson={this.state.showPerson}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandle}
            />
          ) : null}
            {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
