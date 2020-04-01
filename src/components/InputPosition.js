import React from 'react';

const inputIdToPosition = {
  'position-x': 0,
  'position-y': 1
};

class InputPosition extends React.Component {
  handleChange = event => {
    const { id, value } = event.target;
    const index = inputIdToPosition[id];

    if (this.props.position[index] === value) {
      return;
    }
    let newPosition = this.props.position.slice();
    newPosition[index] = value;
    this.props.onChange(newPosition);
  };

  render() {
    const { position } = this.props;

    return (
      <div className="position">
        <span>Position (x,y):</span>
        <input id="position-x" type="number" value={position[0]} onChange={this.handleChange} />
        <input id="position-y" type="number" value={position[1]} onChange={this.handleChange} />
      </div>
    );
  }
}

InputPosition.defaultProps = {
  position: [0, 0],
  onChange: () => {}
};

export default InputPosition;
