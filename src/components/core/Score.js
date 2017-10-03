import React, {Component} from 'react';

class Score extends Component {
  render(){
    return (
      <h5>Score: {this.props.scoreCorrect} / {this.props.scorePossible} </h5>
    );
  }
}

export default Score;
