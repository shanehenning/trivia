import React, {Component} from 'react';

class NewQuestionTimer extends Component{
  constructor(props){
    super(props);
    this.state = {
      amount: 6000
    }
  }
  countdown = () => {
    setInterval(function(){
      this.setState({amount: (this.state.amount - 1000)});
    }, 1000);
  }

  render(){
    return (
      <div>
        <h6>
          New Question in {this.countdown}
        </h6>
      </div>
    );
  }
}

export default NewQuestionTimer;
