import React, {Component} from 'react';
import Button from './Button';

class GameOver extends Component {
  render(){
    return(
      <div className="game-over">
        <h2>Game Over</h2>
        <Button
          buttonText={this.props.buttonText}
          onButtonClick={this.props.onButtonClick}>
        </Button>
      </div>
    );
  }
}

export default GameOver;
