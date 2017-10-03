import React, { Component } from 'react';
import Question from './Question';
import Button from './Button';
import Score from './Score';
import GameOver from './GameOver';

class Core extends Component{
  constructor(props){
    super(props);
    this.state = {
      trivias: [],
      questionNumber: 0,
      questionClassName: [],
      scoreCorrect: 0,
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
      this.setState({
        questionClassName: new Array(this.state.trivias[this.state.questionNumber].allAnswers.length).fill('default'),
      });
      console.log('fetchTrivia this.state: ', this.state);
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    this.fetchTrivia()
  }

  handleGuess = (e) => {
    let guess = e.currentTarget;
    let questionClassNameArray = this.state.questionClassName;
    if (guess.textContent === (this.state.trivias[this.state.questionNumber].correct_answer)) {
    questionClassNameArray.splice(guess.value, 1, 'correct');
          this.setState({
            scoreCorrect: this.state.scoreCorrect + 1,
            questionClassName: questionClassNameArray,
          });
      } else{
        questionClassNameArray.splice(guess.value, 1, 'incorrect');
        this.setState({questionClassName: questionClassNameArray});
      }
  }

  handleNextQuestion = () => {
    if(this.state.questionNumber >= 9 ) {
      this.setState({gameOver: true});
    }
    this.setState({questionNumber: this.state.questionNumber + 1});
    this.setState({questionClassName: new Array(this.state.trivias[this.state.questionNumber].allAnswers.length).fill('default')});
  }

  handleNewGame = () =>{
    this.fetchTrivia();
    this.setState({
      gameOver: false,
      scoreCorrect: 0,
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
        {console.log('render this.state.questionClassName: ', this.state.questionClassName)}
      <Question
        questionNumber={this.state.questionNumber}
        onQuestionClick={this.handleGuess}
        question={this.state.trivias[this.state.questionNumber].question}
        category={this.state.trivias[this.state.questionNumber].category}
        allAnswers={this.state.trivias[this.state.questionNumber].allAnswers}
        questionClassName={this.state.questionClassName}
      />
      <Button
        onButtonClick={this.handleNextQuestion}
        buttonText={"Next Question"}
      />
      <Score
        scorePossible={this.state.trivias.length}
        scoreCorrect={this.state.scoreCorrect}
      />
    </div>
    );
  }
}

export { Core };
