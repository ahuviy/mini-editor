import React from 'react';

const inputIdToRgbIndex = {
  'color-r': 0,
  'color-g': 1,
  'color-b': 2
};

class InputRgb extends React.Component {
  handleChange = event => {
    const { id, value } = event.target;

    // The new value cannot be less than 0 or more than 255.
    const newValue = Math.max(0, Math.min(255, value));

    const index = inputIdToRgbIndex[id];
    if (this.props.rgb[index] === newValue) {
      return;
    }
    let newRgb = this.props.rgb.slice();
    newRgb[index] = newValue;
    this.props.onChange(newRgb);
  };

  render() {
    const { rgb } = this.props;

    return (
      <div className="rgb">
        <span>RGB Color:</span>
        <input
          id="color-r"
          type="number"
          min="0"
          max="255"
          value={rgb[0]}
          onChange={this.handleChange}
        />
        <input
          id="color-g"
          type="number"
          min="0"
          max="255"
          value={rgb[1]}
          onChange={this.handleChange}
        />
        <input
          id="color-b"
          type="number"
          min="0"
          max="255"
          value={rgb[2]}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

InputRgb.defaultProps = {
  rgb: [0, 0, 0],
  onChange: () => {}
};

export default InputRgb;
