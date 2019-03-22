import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


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

    const person = {
      ...this.state.persons[personIndex]
    }; 

    //this is the older way of copying an object
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value

    const persons = [...this.state.persons];
    persons[personIndex] = person;


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

  resetList = () => {
    this.setState({ persons: [
      { id: 'asd32', name: 'Max', age: 28},
      { id: '23dsd', name: 'Manu', age: 29},
      { id: '4ed3d', name: 'Stephanie', age: 26}
    ]})
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)} 
                // click= {this.deletePersonHandler.bind(this, index)}
                name={person.name} 
                age={person.age}         
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
              </ErrorBoundary>
          })}
        </div>
      );
      btnClass = classes.Red;
    };

    const assignedClasses = [];
    if (this.state.persons.length <= 2 ) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi I'm a react app</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button
          className={btnClass} 
          onClick={this.togglePersonsHandler}>
          {this.state.showPersons ? 'Hide' : 'Show'}
        </button>
        <button 
          className={classes.resetList}
          onClick={this.resetList}>
          Reset List
        </button>
          {persons}
      </div>
    );
  }
}

export default App;
