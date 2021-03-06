import React, { Component } from 'react';
import Intro from './Intro';
import Loading from './Loading';
import Question from './Question';
// import NewQuestionTimer from './NewQuestionTimer';
import Button from './Button';
import GameOver from './GameOver';

import apiData from '../../trivia-data';

function decodeData(content){
  let area = document.createElement('textarea');
  area.innerHTML = content;
  return area.value;
}

function filterUnique(list){
  let seen = {};
  return list.filter(function(item){
    return seen.hasOwnProperty(item) ? false : seen[item] = true;
  });
}

var allQuestions = {};
function filterAllQuestions(oldStuff, newStuff){
  return newStuff.filter(function(item){
  return oldStuff.hasOwnProperty(item.question) ? oldStuff[item] : oldStuff[item.question] = item;
  });
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      welcome: true,
      allCategories: apiData.categories,
      allDifficulties: apiData.difficulties,
      allQuestionTypes: apiData.questionTypes,
      allQuestionTypeValues: apiData.questionTypeValues,
      trivias: [],
      questionNumber: 0,
      questionClassName: [],
      correctGuess: false,
      scoreCorrect: 0,
      seconds: 0,
      requestFailed: false,
      gameOver: false,
      questionAmount: 10,
      selectedCategory: 0,
      selectedDifficulty: 0,
      selectedQuestionType: 0,

      qriusityCategories: [],
    };
    this.timer = 0;
    this.allData = [];
  }

  fetchTrivia = (questionAmount, selectedCategory, selectedDifficulty, selectedQuestionType) => {
    console.log('fetchTrivia this.state: ', this.state);
    let baseUrl = 'https://opentdb.com/api.php?amount=';
    let url = baseUrl;
    if(questionAmount) url += questionAmount;
    if(selectedCategory) url += '&category=' + selectedCategory;
    if(selectedDifficulty) url += '&difficulty=' + selectedDifficulty;
    if(selectedQuestionType) url += '&type=' + selectedQuestionType;
    return fetch(url)
    .then((response) => {
      console.log('response: ', response);
      if(!response.ok){
        this.setState({
          requestFailed: true
        });
        throw Error('Api request failed');
      }
      return response.json();
    })
    .then((responseJson) =>{
      console.log('responseJson: ', responseJson);
      // <-- parsing out html special characters
      responseJson.results.forEach(function(result){
        result.question = decodeData(result.question);
        result.correct_answer = decodeData(result.correct_answer);
        result.incorrect_answers = result.incorrect_answers.map(function(answer){
          return answer = decodeData(answer);
        });
      });
      // -->
      responseJson.results.forEach(function(item){
        if(item.type === 'boolean') {
          item.allAnswers = ['True', 'False'];
          return;
        }
          item.allAnswers = item.incorrect_answers;
          item.allAnswers.splice(Math.floor(Math.random() * (item.incorrect_answers.length + 1)), 0, item.correct_answer);
      });
      this.setState({trivias: responseJson.results});
      this.setState({questionClassName: new Array(this.state.trivias[this.state.questionNumber].allAnswers.length).fill('default')});
      console.log('fetchTrivia this.state: ', this.state);
      filterAllQuestions(allQuestions, this.state.trivias);
      console.log('allQuestions: ', allQuestions);
    }).catch((error) => {
      console.error(error);
    });
  }

//   promiseCity = () => {
//     let url;
//     let i = 1;
//     url = 'https://qriusity.com/v1/categories?page=' + i + '&limit=50';
// }

// promiseIteration = (apiUrl) => {
//   fetch(apiUrl)
//   .then((response) => {
//     console.log('response: ', response);
//     return response.json();
//   })
//   .then((responseJson) => {
//     this.allData.push(responseJson);
//     console.log('this.allData: ', this.allData);
//     if(responseJson.length < 20) return;
//   });
// }

componentWillMount(){
  console.log('componentWillMount allQuestions: ', allQuestions);
}

  fetchTriviaCategories = () => {
    Promise.all([
      fetch('https://qriusity.com/v1/categories?page=1&limit=20')
      .then((response) => {
        return response.json();
      }),
       fetch('https://qriusity.com/v1/categories?page=2&limit=20')
      .then((response) => {
        return response.json();
      })
    ])

    .then((categories) => {
      let qriusityCategories = [];
      categories = categories[0].concat(categories[1]);
      categories.forEach(function(item){
        qriusityCategories.push(item.name);
      });
      let qriusity = filterUnique(qriusityCategories).sort(function(a,b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
      });
      this.setState({qriusityCategories: qriusity});
    });
  }

  fetchQriusityTrivia = (questionAmount, selectedCategory) => {
    let baseUrl = 'https://qriusity.com/v1';

  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  restart = () => {
    this.setState({
      gameOver: false,
      trivias: [],
      welcome: true,
      questionNumber: 0,
      scoreCorrect: 0,
    });
  }

  handleStart = (e) => {
    e.preventDefault();
    this.setState({welcome: false});
    this.fetchTrivia(
      this.state.questionAmount,
      this.state.selectedCategory,
      this.state.selectedDifficulty,
      this.state.selectedQuestionType
    );
  }

  handleGuess = (e) => {
    let guess = e.currentTarget;
    let questionClassNameArray = this.state.questionClassName;
    if (guess.textContent === (this.state.trivias[this.state.questionNumber].correct_answer)) {
      if(this.state.correctGuess) return;
      questionClassNameArray.splice((guess.value - 1), 1, 'correct');
          this.setState({
            scoreCorrect: this.state.scoreCorrect + 1,
            questionClassName: questionClassNameArray,
            correctGuess: true
          });
          setTimeout(() => {
            this.handleNextQuestion();
          }, 3000);
          this.startCountdown();
      } else{
        questionClassNameArray.splice((guess.value - 1), 1, 'incorrect');
        this.setState({questionClassName: questionClassNameArray});
      }
  }

  startCountdown = () => {
    this.setState({seconds: 3});
    this.timer = setInterval(this.countdownTimer, 1000);
  }
  countdownTimer = () => {
    this.setState({seconds: (this.state.seconds - 1)});
    if(this.state.seconds === 0){
      clearInterval(this.timer);
    }
  }

  handleNextQuestion = () => {
    if(this.state.questionNumber >= this.state.questionAmount - 1 ) {
      this.setState({gameOver: true});
    }
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      questionClassName: new Array(this.state.trivias[this.state.questionNumber].allAnswers.length).fill('default'),
      correctGuess: false
    });
  }

  handleNewGame = () => {
    this.fetchTrivia(
      this.state.questionAmount,
      this.state.selectedCategory,
      this.state.selectedDifficulty,
      this.state.selectedQuestionType
    );
    this.setState({
      gameOver: false,
      scoreCorrect: 0,
      trivias: [],
      questionNumber: 0
    });
  }

  render(){
    if(!this.state.trivias[0] && !this.state.welcome){
      return(
        <Loading/>
      );
    }
    if(this.state.requestFailed === true){
      return <h1>Request Failed</h1>;
    }
    if(this.state.gameOver === true){
      return (
        <GameOver
          scoreCorrect={this.state.scoreCorrect}
          scorePossible={this.state.questionAmount}
          buttonTextOne={"Use Same Settings"}
          onButtonClickOne={this.handleNewGame}
          buttonTextTwo={"Use New Settings"}
          onButtonClickTwo={this.restart}
        />
      );
    }
    if(this.state.welcome === true){
      return (
        <div>
          {/* <h1>Welcome to Ugly Trivia!</h1> */}
          {/* <h2>Below are options to customize your trivial experience.</h2> */}
          <Intro
            handleSubmit={this.handleStart}
            handleInputChange={this.handleInputChange}
            labelFormInput={"How many questions?"}
            formInputType={"number"}
            inputMax={20}
            nameFormInput={"questionAmount"}
            questionAmount={this.state.questionAmount}
            labelCategory={"Select a category"}
            nameCategory={"selectedCategory"}
            selectedCategory={this.state.selectedCategory}
            allCategories={this.state.allCategories}
            labelDifficulty={"Select a difficulty"}
            nameDifficulty={"selectedDifficulty"}
            selectedDifficulty={this.state.selectedDifficulty}
            allDifficulties={this.state.allDifficulties}
            handleFormButton={this.handleStart}
            buttonText={"Start"}
          />
        </div>
      );
    }
    return (
      <div>
        <Button
          buttonText={"Start Over"}
          onButtonClick={this.restart}
        />
        <Button
          onButtonClick={this.handleNextQuestion}
          buttonText={"Skip Question"}
        />
      <Question
        questionNumber={this.state.questionNumber}
        trivias={this.state.trivias}
        scoreCorrect={this.state.scoreCorrect}
        onQuestionClick={this.handleGuess}
        question={this.state.trivias[this.state.questionNumber].question}
        category={this.state.trivias[this.state.questionNumber].category}
        allAnswers={this.state.trivias[this.state.questionNumber].allAnswers}
        questionClassName={this.state.questionClassName}
      />
      {this.state.correctGuess ?
        <div>
          <h6>Next question in {this.state.seconds}</h6>
        </div>
        : null
      }
    </div>
    );
  }
}

export { App };
