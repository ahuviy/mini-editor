import React from 'react';
import { connect } from 'react-redux';
import { canvasDimensions } from '../utils/canvasDimensions';
import { rgbToHex } from '../utils/rgbToHex';

const mapStateToProps = state => ({
  canvasContent: state.canvasContent
});

class Canvas extends React.Component {
  canvasRef = React.createRef();

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate(prevProps) {
    const { canvasContent } = this.props;

    if (prevProps.canvasContent !== canvasContent) {
      this.renderCanvas();
    }
  }

  /**
   * Sets up the canvas and renders the canvas content.
   */
  renderCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas.
    ctx.clearRect(0, 0, canvasDimensions[0], canvasDimensions[1]);

    // Set the background as white.
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the text for each item in the canvasContent array.
    this.props.canvasContent.forEach(item => {
      ctx.font = `${item.sizeInPx}px ${item.font}`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = rgbToHex(...item.colorRGB);
      ctx.fillText(item.freeText, item.position[0], item.position[1]);
    });
  }

  render() {
    return (
      <canvas
        id="canvas"
        ref={this.canvasRef}
        width={canvasDimensions[0]}
        height={canvasDimensions[1]}
      />
    );
  }
}

export default connect(mapStateToProps)(Canvas);
