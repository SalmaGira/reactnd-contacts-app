import React, { Component } from "react";
// import logo from "../logo.svg";
import "./App.css";
import Score from "./Score";
import Game from "./Game";

class App extends Component {
  /*
  We could have declared the state variable inside of the constructor like this:
  constructor(props){
    super(props);
    this.state = {
      correctAnswer: 0,
      numQuestions: 0
    };
  }

  Here, we're using the ESnext field declarations proposal syntax in order to write
  less code:
  https://github.com/tc39/proposal-class-fields
  */
  state = {
    value1: 0,
    value2: 0,
    value3: 0,
    proposedAnswer: 0,
    numQuestions: 0,
    numCorrect: 0,
  };

  /*
  If you do not an arrow function here, you'd need to bind `this`. In arrow
  function, `this` refers to the enclosing execution context:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Lexical_this.
  If you wrote the `handleAnswer` function like this (in ES5):

  handleAnswer(answerWasCorrect) {
    if (answerWasCorrect) {
      this.setState(currState => ({
        correctAnswer: currState.correctAnswer + 1
      }));
    }
    this.setState(currState => ({
      numQuestions: currState.numQuestions + 1
    }));
  }

  Then, you'd need to bind `this` in order for the function to refer to the
  App object, which has the state property on it, as its 'this' value.

  Common Approach 1:

  `<Game handleAnswer={this.handleAnswer} />`
  would need to be
  `<Game handleAnswer={this.handleAnswer.bind(this)} />`

 Take a look here if you're not sure what the `.bind(this)` does:
 https://stackoverflow.com/questions/38334062/why-do-you-need-to-bind-a-function-in-a-constructor.

 This approach doesn't have great performance because using `bind` creates an entirely
 new function
 (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind),
 thereby making the component it's passed to believe that it's being passed a different
 property. In other words, binding inside of a property that's being passed to
 a component (e.g. <Game handleAnswer={this.handleAnswer} />) makes that component
 think that the property it's getting (handleAnswer) has changed. Components
 re-render when the property that's passed to them changes or their state changes,
 so the component can re-render many more times than is actually necessary. Take
 a look at these examples and pay attention to how many times the print statement
 is executed:

 - https://codesandbox.io/s/3rp9rjqxwq
 - https://codesandbox.io/s/mqpwy2v37p

 (The code for the examples was largely adapted from: https://medium.freecodecamp.org/why-arrow-functions-and-bind-in-reacts-render-are-problematic-f1c08b060e36.
  Check out the article above for additional examples and explanations.)


 Common Approach 2:

 Bind `this` in the constructor:

 constructor(props){
   super(props);
   this.handleAnswer = this.handleAnswer.bind(this);
 }
  */

  constructor(props) {
    super(props);
    const valuesArray = this.makeNewQuestion();
    this.state = {
      value1: valuesArray[0],
      value2: valuesArray[1],
      value3: valuesArray[2],
      proposedAnswer: valuesArray[3],
      numCorrect: 0,
      numQuestions: 0,
    };
    console.log("inside game constructor");
  }

  makeNewQuestion = () => {
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    const value3 = Math.floor(Math.random() * 100);
    const proposedAnswer =
      Math.floor(Math.random() * 3) + (value1 + value2 + value3);
    return [value1, value2, value3, proposedAnswer];
  };

  updateState = (newValuesArray) => {
    console.log("here is update state");
    this.setState((currState) => ({
      value1: newValuesArray[0],
      value2: newValuesArray[1],
      value3: newValuesArray[2],
      proposedAnswer: newValuesArray[3],
    }));
  };

  handleAnswer = (event) => {
    const newValuesArray = this.makeNewQuestion();
    this.updateState(newValuesArray);

    if (this.evaluateAnswer(event.target.name)) {
      this.setState((currState) => ({
        numCorrect: currState.numCorrect + 1,
      }));
    }
    this.setState((currState) => ({
      numQuestions: currState.numQuestions + 1,
    }));
    console.log("handle answer clicked", event.target.name);
  };

  evaluateAnswer(givenAnswer) {
    const { value1, value2, value3, proposedAnswer } = this.state;
    const corrAnswer = value1 + value2 + value3;

    console.log("evaluate answer clicked", givenAnswer);

    return (
      (corrAnswer === proposedAnswer && givenAnswer === "true") ||
      (corrAnswer !== proposedAnswer && givenAnswer === "false")
    );
  }

  render() {
    const {
      value1,
      value2,
      value3,
      proposedAnswer,
      numCorrect,
      numQuestions,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <div className="game">
            <h2>Mental Math</h2>
            <div className="equation">
              <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
            </div>
            <button onClick={this.handleAnswer} name="true">
              True
            </button>
            <button onClick={this.handleAnswer} name="false">
              False
            </button>
            <p className="text">
              Your Score: {numCorrect}/{numQuestions}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
