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

  initObstacle({
    width,
    height,
    texture
  }) {
    const newProps = {
      width,
      height,
      y: this.road.y - height,
      img: texture
    };
    this.obstacleProps = newProps;
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
    const height = originY - offset;
    this.stage.update('character', 'y', height);
    this.jumpId = setTimeout(() => {
      this._fall(height, originY, y => {
        this.stage.update('character', 'y', y);
      });
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
      const obstacleName = 'obstacle' + i;
      if (pos.x > -this.obstacleProps.width) {
        pos.x -= offset;
        this.stage.update(obstacleName, 'x', pos.x);
      } else {
        this.stage.remove(obstacleName);
      }
    });
  }

  render() {
    this.stage.render();
  }

  isHitObstacle() {
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

  _fall(height, target, fn) {
    if (height < target) {
      const speed = Math.ceil((target - height) / 5);
      height += speed;
      fn(height);
      window.requestAnimationFrame(this._fall.bind(this, height, target, fn));
    } else {
      fn(target);
    }
  }
}

export default new App();