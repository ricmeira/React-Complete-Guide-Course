import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 1, name:"Max", age:29 },
      { id: 2, name:"Steve", age:18 },
      { id: 3, name:"Ethan", age:31 }
    ],
    otherState: 'Some value',
    showPerson: false
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

    this.setState({
      persons: persons
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

  render() {
    let persons = null;
    let btnClass = '';

    if(this.state.showPerson){
        persons = (
          <div>
            {this.state.persons.map((person, index) => {
              return <ErrorBoundary key = {person.id}>
                <Person 
                  click = {() => this.deletePersonHandler(index)} 
                  name = {person.name} 
                  age = {person.age}
                  changed = {(event) => this.nameChangedHandler(event, person.id)}/>
                </ErrorBoundary>
            })}
          </div>
        );
        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
      if(this.state.persons.length <= 1){
        assignedClasses.push(classes.bold);
      }
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I am a react app</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
          className={btnClass}
          onClick={() => this.togglePersonsHandle()}>Switch Name</button>
          {persons}
        </div>
    );
  }
}

export default App;
