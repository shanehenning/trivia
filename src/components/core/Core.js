import React, { Component } from 'react';
import Question from './Question';
import Button from './Button';

class Core extends Component{
  constructor(props){
    super(props);
    this.state = {
      trivias: [],
      questionNumber: 0,
    };
  }

  componentDidMount(){
    console.log('componentWillMount this.state: ', this.state);
    return fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
    .then((response) => response.json())
    .then((responseJson) =>{
      responseJson.results.forEach(function(item){
        if(item.type === 'boolean') return;
        item.allAnswers = item.incorrect_answers;
        item.allAnswers.splice(Math.floor(Math.random() * (item.incorrect_answers.length + 1)), 0, item.correct_answer);
      });
      this.setState({trivias: responseJson.results});
    }).catch((error) =>{
      console.error(error);
    });
  }

  handleClick = (e) => {
    let guess = e.currentTarget;
    if (guess.textContent === (this.state.trivias[this.state.questionNumber].correct_answer)) {
        guess.style.backgroundColor = '#47B88A';
    } else{
      guess.style.backgroundColor = '#F47456';
    }
  }

  handleNextQuestion = () => {
    if(this.state.questionNumber > 9 ) return;
    this.setState({questionNumber: this.state.questionNumber + 1});
  }

  render(){
    if(!this.state.trivias[0]){
      return <h1>...</h1>;
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
