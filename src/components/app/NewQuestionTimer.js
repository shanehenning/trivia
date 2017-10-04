import React, {Component} from 'react';

class NewQuestionTimer extends Component{
  componentDidMount () {
    let amount = this.props.timeUntil;
    var i = setInterval(function(){
      console.log(amount);
      amount = amount - 1000;
      if(amount < 0) {
        clearInterval(i);
      }
    }, 1000);
  }

  render(){
    return (
      <div>
        <h6>
          {/* New Question in {amount} */}
        </h6>
      </div>
    );
  }
}

export default NewQuestionTimer;
