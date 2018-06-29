import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'ponter',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if(this.state.showPerson){
        persons = (
          <div>
            {this.state.persons.map((person, index) => {
              return <Person 
                click = {() => this.deletePersonHandler(index)} 
                name = {person.name} 
                age = {person.age}
                key = {person.id}
                changed = {(event) => this.nameChangedHandler(event, person.id)}/>
            })}
          </div>
        );

        style.backgroundColor = 'red';
        style[':hover'] = {
          backgroundColor: 'salmon',
          color: 'black'
        }
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
      if(this.state.persons.length <= 1){
        classes.push('bold');
      }
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I am a react app</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
          style={style}
          onClick={() => this.togglePersonsHandle()}>Switch Name</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
