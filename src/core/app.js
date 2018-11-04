import Stage from './Stage';
import Recorder from './Recorder';

class App {
  initGame() {
    this.obstacles = [];
    this.distance = 0;
    this.obstacleInterval = 0;
    this.obstacleIntervalImit = this.canvas.width / 2;

    this.addObstacle(this.obstacleIntervalImit);
  }

  initRecorder() {
    this.recorder = new Recorder();
    return this.recorder.start();
  }

  initBackground() {}

  initContainer(stageCanvas, width, height) {
    this.canvas = stageCanvas;
    this.stage = new Stage(stageCanvas, width, height);
  }

  initCharacter(props) {
    const newProps = {
      ...props,
      y: this.road.y - props.height,
      type: 'image',
      img: props.texture
    };
    this.character = this.stage.add('character', newProps);
  }

  initRoad(props) {
    const {
      height,
      color
    } = props;
    this.road = this.stage.add('road', {
      x: 0,
      y: this.canvas.height - height,
      width: this.canvas.width,
      height,
      color,
      type: 'rect',
    });
  }

  initObstacle(props) {
    props.img = props.texture;
    props.y = this.road.y - props.height;
    this.obstacleProps = props;
  }

  addObstacle(x) {
    const obstacleProps = this.obstacleProps;
    const pos = {
      x,
      y: obstacleProps.y,
    }
    this.obstacles.push(pos);
    this.stage.add('obstacle' + (this.obstacles.length - 1), {
      ...this.obstacleProps,
      ...pos,
      type: 'image',
    });
  }

  jump(offset) {
    clearTimeout(this.jumpId);

    const originY = this.road.y - this.character.height;
    this.stage.update('character', 'y', originY - offset);
    this.jumpId = setTimeout(() => {
      this.stage.update('character', 'y', originY);
    }, 10);
  }

  move(offset) {
    this.distance += offset;
    this.obstacleInterval += offset;

    if (this.obstacleInterval > this.obstacleIntervalImit) {
      this.addObstacle(this.canvas.width);
      this.obstacleInterval = 0;
    }
    this.obstacles.forEach((pos, i) => {
      if (pos.x > -this.obstacleProps.width) {
        pos.x -= offset;
        this.stage.update('obstacle' + i, 'x', pos.x);
      }
    });

    if (this.isHitObstacle()) {
      console.log('game over');
    }
  }

  render() {
    this.stage.render();
  }

  isHitObstacle() {
    console.log(this.character);
    console.log(this.obstacles)
    const obstacleWidth = this.obstacleProps.width;
    const obstacleHeight = this.obstacleProps.height;
    const {
      x,
      y,
      width,
      height
    } = this.character;

    return this.obstacles.find(pos => {
      return x + width > pos.x && x < pos.x + obstacleWidth && y + height > pos.y && y < pos.y + obstacleHeight;
    });
  }
}

export default new App();