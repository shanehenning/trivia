import React, {Component} from 'react';

class Button extends Component{
  render(){
    return (
      <span
        onClick={this.props.onButtonClick}
        >
        {this.props.buttonText}
      </span>
    );
  }
}

export default Button;
