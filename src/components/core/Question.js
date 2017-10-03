import React, {Component} from 'react';

class Question extends Component{
  componentWillMount(){
    console.log('question componentWillMount this.props: ', this.props);
  }

render(){
    return (
      <div className="question">
        <h2>{this.props.question}</h2>
        <h3>Category: {this.props.category}</h3>
        <ol>
          {this.props.allAnswers.map((answer, i) =>
            <li key={i}
              onClick={this.props.onQuestionClick}
              className={this.props.questionClassName[i]}
              value={i}
              >
            {answer}
          </li>)}
        </ol>
      </div>
    );
  }
}
export default Question;
