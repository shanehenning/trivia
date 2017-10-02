import React, {Component} from 'react';

class Button extends Component{
  render(){
    return (
      <div
        onClick={this.props.onButtonClick}
        >
        {this.props.buttonText}
      </div>
    );
  }
}

export default Button;
