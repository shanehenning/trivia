import React, {Component} from 'react';
import Button from './Button';

class GameOver extends Component {
  render(){
    return(
      <div className="game-over">
        <h2>Game Over</h2>
        <h4>
          You got {this.props.scoreCorrect} out of {this.props.scorePossible} questions correct!
        </h4>
        <h5>Play again?</h5>
        <Button
          buttonText={this.props.buttonTextOne}
          onButtonClick={this.props.onButtonClickOne}>
        </Button>
        <Button
          buttonText={this.props.buttonTextTwo}
          onButtonClick={this.props.onButtonClickTwo}>
        </Button>
      </div>
    );
  }
}

export default GameOver;
