import React, {Component} from 'react';
import Score from './Score';

class Question extends Component {
  componentWillMount() {
    console.log('question componentWillMount this.props: ', this.props);
  }

  render() {
    return (
      <div className="question">
        <h4>Question #{this.props.questionNumber + 1}</h4>
        <Score
          scorePossible={this.props.trivias.length}
          scoreCorrect={this.props.scoreCorrect}
        />
        <h2>{this.props.question}</h2>
        <h3>Category: {this.props.category}</h3>
        <ol type="A">
          {this.props.allAnswers.map((answer, i) =>
            <li key={i}
              onClick={this.props.onQuestionClick}
              className={this.props.questionClassName[i]}
              value={i + 1}
              >
            {answer}
          </li>)}
        </ol>
      </div>
    );
  }
}
export default Question;
