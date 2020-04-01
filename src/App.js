import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import InputRgb from './components/InputRgb';
import InputPosition from './components/InputPosition';
import Canvas from './components/Canvas';
import { fonts } from './utils/fonts';
import { dispatch } from './redux/store';

const mapStateToProps = state => ({
  canvasContent: state.canvasContent
});

const emptyForm = () => ({
  freeText: '',
  font: null,
  colorRGB: [0, 0, 0],
  position: [0, 0],
  sizeInPx: 12
});

class App extends React.Component {
  state = emptyForm();

  submit = e => {
    e.preventDefault();
    const submitValue = {
      ...this.state,
      font: this.state.font.value
    };
    dispatch({ type: 'SUBMIT', payload: submitValue });
    this.setState(emptyForm()); // Clear the form.
  };

  undo = () => {
    dispatch({ type: 'UNDO' });
  };

  downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'output.png';
    link.href = document.getElementById('canvas').toDataURL('image/png');
    link.click();
  };

  onFreetextChange = e => {
    this.setState({ freeText: e.target.value });
  };

  onFontChange = e => {
    this.setState({ font: e });
  };

  onRgbChange = e => {
    this.setState({ colorRGB: e });
  };

  onPositionChange = e => {
    this.setState({ position: e });
  };

  onSizeChange = e => {
    this.setState({ sizeInPx: e.target.value });
  };

  render() {
    const { canvasContent } = this.props;
    const { freeText, font, colorRGB, position, sizeInPx } = this.state;

    return (
      <form className="wrapper" onSubmit={this.submit}>
        <div className="controls">
          <input
            className="freetext"
            maxLength={50}
            placeholder="Enter text"
            value={freeText}
            onChange={this.onFreetextChange}
          />
          <div className="select-font">
            <Select
              isClearable
              placeholder="Select a font"
              options={fonts}
              value={font}
              onChange={this.onFontChange}
            />
          </div>
          <InputRgb rgb={colorRGB} onChange={this.onRgbChange} />
          <InputPosition position={position} onChange={this.onPositionChange} />
          <div>
            <span>Size (px):</span>
            <input
              className="size"
              type="number"
              min="0"
              value={sizeInPx}
              onChange={this.onSizeChange}
            />
          </div>
        </div>
        <Canvas />
        <div className="button-row">
          <button type="submit" disabled={!freeText || !font}>
            Submit
          </button>
          <button type="button" disabled={canvasContent.length === 0} onClick={this.undo}>
            Undo
          </button>
          <button type="button" disabled={canvasContent.length === 0} onClick={this.downloadImage}>
            Download Image
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps)(App);
