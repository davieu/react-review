import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asd32', name: 'Max', age: 28},
      { id: '23dsd', name: 'Manu', age: 29},
      { id: '4ed3d', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      console.log(p.id === id)
      return p.id === id;
    })
    console.log('1: ', personIndex)

    const person = {
      ...this.state.persons[personIndex]
    }; 
    console.log('2: ', person)

    //this is the older way of copying an object
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value
    console.log('3: ', person.name)

    const persons = [...this.state.persons];
    console.log('4: ', persons)
    persons[personIndex] = person;

    console.log('5: ', person)
    this.setState({ persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)} 
              // click= {this.deletePersonHandler.bind(this, index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi I'm a react app</h1>
        <p>hello</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Switch Name</button>
          {persons}
      </div>
    );
  }
}

export default App;
