import React, {Component} from 'react';

class Question extends Component{
  componentWillMount(){
    console.log('this.props: ', this.props);
    console.log('this.props.trivias: ', this.props.trivias);
  }

render(){
  let allAnswers = this.props.trivias[this.props.questionNumber].allAnswers;
    return (
      <div>
        <h2>{this.props.trivias[this.props.questionNumber].question}</h2>
        <h3>Category: {this.props.trivias[this.props.questionNumber].category}</h3>
        <ol>
          {allAnswers.map((answer, i) =>
            <li key={i}
              onClick={this.props.onQuestionClick.bind(this)}
              value={this.props.answer}
              >
            {answer}
          </li>)}
        </ol>
      </div>
    );
  }
}
export default Question;
