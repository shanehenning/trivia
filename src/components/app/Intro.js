import React, {Component} from 'react';
import Button from './Button';

class Intro extends Component{
  render(){
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label>
          {this.props.labelFormInput}
          <input
            name={this.props.nameFormInput}
            type={this.props.formInputType}
            value={this.props.questionAmount}
            onChange={this.props.handleInputChange}
            max={this.props.inputMax}
          />
        </label>

        <label>
          {this.props.labelCategory}
          <select
            name={this.props.nameCategory}
            value={this.props.selectedCategory}
            onChange={this.props.handleInputChange}
            >
              <option value="0">
                {"Any Category"}
              </option>
              {this.props.allCategories.map((selectable, i) =>
                <option key={i + 1}
                  value={i + 9}
                  >
                    {selectable}
                  </option>
              )}
          </select>
        </label>

        {/* <label>
          {this.props.labelDifficulty}
          <select
            name={this.props.nameDifficulty}
            value={this.props.selectedDifficulty}
            onChange={this.props.handleInputChange}>
            {this.props.allDifficulties.map((selectable, i) =>
              <option
                key={i}
                value={selectable.toLowerCase()}>
                {selectable}
              </option>
            )}
          </select>
        </label> */}

        <br />
        <p>Ready?</p>
        <Button onButtonClick={this.props.handleFormButton}
          buttonText={this.props.buttonText}>
        </Button>

      </form>
    );
  }
}

export default Intro;
