import React, { Component } from 'react';
import Question from './Question';
import Button from './Button';
import GameOver from './GameOver';

class Core extends Component{
  constructor(props){
    super(props);
    this.state = {
      trivias: [],
      questionNumber: 0,
      requestFailed: false,
      gameOver: false,
    };
  }

  fetchTrivia = () => {
    console.log('fetchTrivia this.state: ', this.state);
    return fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
    .then((response) => {
      if(!response.ok){
        this.setState({
          requestFailed: true
        });
        throw Error('Api request failed');
      }
      return response.json();
    })
    .then((responseJson) =>{
      responseJson.results.forEach(function(item){
        if(item.type === 'boolean') {
          item.allAnswers = [true, false];
        }
        item.allAnswers = item.incorrect_answers;
        item.allAnswers.splice(Math.floor(Math.random() * (item.incorrect_answers.length + 1)), 0, item.correct_answer);
      });
      this.setState({trivias: responseJson.results});
    }).catch((error) => {
      console.error(error);
    });

  }

  componentDidMount(){
    this.fetchTrivia();
  }

  handleClick = (e) => {
    let guess = e.currentTarget;
    if (guess.textContent === (this.state.trivias[this.state.questionNumber].correct_answer)) {
        if (guess.classList) {
          guess.classList.add('correct');
        }
      } else{
        if(guess.classList){
            guess.classList.add('incorrect');
        }
      }
  }

  handleNextQuestion = () => {
    if(this.state.questionNumber >= 9 ) {
      this.setState({gameOver: true});
    }
    this.setState({questionNumber: this.state.questionNumber + 1});
  }

  handleNewGame = () =>{
    this.fetchTrivia();
    this.setState({
      gameOver: false,
      trivias: [],
      questionNumber: 0
    });
  }

  render(){
    if(!this.state.trivias[0]){
      return <h1>...</h1>;
    }
    if(this.state.requestFailed === true){
      return <h1>Request Failed</h1>;
    }
    if(this.state.gameOver === true){
      return (
        <GameOver
          buttonText={"Start New Game?"}
          onButtonClick={this.handleNewGame}
        />
      );
    }
    return (
      <div>
      <Question
        trivias={this.state.trivias}
        questionNumber={this.state.questionNumber}
        onQuestionClick={this.handleClick}
      />
      <Button
        onButtonClick={this.handleNextQuestion}
        buttonText={"Next Question"} />
    </div>
    );
  }
}

export { Core };
