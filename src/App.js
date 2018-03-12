import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I am a react app</h1>
        <p>This is really working!</p>
        <button>Switch Name</button>
        <Person name="Max" age="28"/>
        <Person name="Steve" age="12">My Hobbies: Racing</Person>
        <Person name="Ethan" age="31"/>
      </div>
    );
  }
}

export default App;
