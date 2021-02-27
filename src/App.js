import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  // esto funciona solamente en clases que hereden de Component
  state = {
    persons: [
      { id: 'asd1',name: 'Max', age: 28 },
      { id: 'asd2',name: 'Manu', age: 29 },
      { id: 'asd3',name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }

  // switchNameHandler = (newName) => {
  //   // console.log('Executed');
  //   // NO HACER ESTO this.state.persons[0].name = 'Maximilian';
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 28 },
  //       { name: 'Manu', age: 29 },
  //       { name: 'Stephanie', age: 27 }
  //     ]
  //   });
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id == id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons;
    // persons.splice(personIndex,1); MALA PRACTICA
    // Siempre se debe cambiar el estado creando una copia y despues guardando la copia
    const persons = [...this.state.persons]; // Spread out of the array
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }; // Es medio complejo usar :hover por ejemplo

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return (
              <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event,person.id)}/>
            );
          })}
        </div> 
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a react developer</h1>
        {/* // onClick={() => this.switchNameHandler('Maximilian!!')} puede ser ineficiente  */}
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div',{className: 'App'}, React.createElement('h1',null,'Does this works now?'))
  }
}

export default App;
