class Stage {
  static defaultProps = {
    type: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  constructor(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.elements = {};
  }

  add(name, props) {
    this.elements[name] = props;
    return props;
  }

  update(name, key, value) {
    this.elements[name][key] = value;
  }

  remove(name) {
    delete this.elements[name];
  }

  render() {
    Object.keys(this.elements).forEach(name => {
      const props = this.elements[name];
      const {
        type
      } = props;
      switch (type) {
        case 'image':
          this._addImage(props);
          break;
        case 'rect':
          this._addRect(props);
          break;
      }
    });
  }

  clean() {
    const canvas = this.canvas;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  _addImage(props) {
    const {
      x,
      y,
      width,
      height,
      img
    } = Object.assign({}, Stage.defaultProps, props);
    img.width = width;
    img.height = height;

    this.context.drawImage(img, x, y, width, height);
  }

  _addRect(props) {
    const {
      x,
      y,
      width,
      height,
      color,
    } = Object.assign({}, Stage.defaultProps, props);

    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }
}

export default Stage;