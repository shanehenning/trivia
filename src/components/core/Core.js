import React, { Component } from 'react';
import Question from './Question';

class Core extends Component{
  constructor(props){
    super(props);
    this.state = {
      trivias: [],
      questionNumber: 0,
    };
  }

  componentWillMount(){
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

  handleClick(e){
    let guess = e.currentTarget;
    if (guess.textContent === (this.props.trivias[this.props.questionNumber].correct_answer)) {
        guess.style.backgroundColor = '#47B88A';
    } else{
      guess.style.backgroundColor = '#F47456';
    }
  }

  render(){
    if(!this.state.trivias[0]){
      return <h1>...</h1>;
    }
    return (
      <Question
        trivias={this.state.trivias}
        questionNumber={this.state.questionNumber}
        onQuestionClick={this.handleClick}
      />
    );
  }
}

export { Core };
