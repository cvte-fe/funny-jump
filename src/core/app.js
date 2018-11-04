import Stage from './Stage';
import Recorder from './Recorder';

class App {
  initGame() {
    this.obstacles = [];
    this.fall = true;
    this.distance = 0;
    this.obstacleInterval = 0;

    this.addObstacle(this.obstacleIntervalImit);
  }

  initRecorder() {
    this.recorder = new Recorder();
    return this.recorder.start();
  }

  initBackground(props) {
    const newProps = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.width,
      type: 'image',
      img: props.texture
    };
    this.character = this.stage.add('background', newProps);
  }

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
    texture,
    intervalRange,
  }) {
    const newProps = {
      width,
      height,
      y: this.road.y - height,
      img: texture
    };
    this.obstacleProps = newProps;
    this.setObstacleIntervalRange(intervalRange);
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

  setObstacleIntervalRange(range) {
    this.obstacleIntervalRange = range;
  }

  jump(offset) {
    clearTimeout(this.jumpId);

    const originY = this.road.y - this.character.height;
    const height = originY - offset;
    this.stage.update('character', 'y', height);
    this.jumpId = setTimeout(() => {
      if (this.fall) {
        this.fall = false;
        this._fall(height, originY, y => {
          this.stage.update('character', 'y', y);
        }).then(() => {
          this.fall = true;
        });
      }
    }, 30);
  }

  move(offset) {
    this.distance += offset;
    this.obstacleInterval += offset;

    const [range1, range2] = this.obstacleIntervalRange;
    if (this.obstacleInterval >= range2 ||
      ((Math.random() <= range1 / range2) && this.obstacleInterval >= range1)) {
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
    return new Promise((resolve) => {
      const fall = (height, target, fn) => {
        if (height < target) {
          const speed = Math.ceil((target - height) / 5);
          height += speed;
          fn(height);
          window.requestAnimationFrame(fall.bind(null, height, target, fn));
        } else {
          fn(target);
          resolve();
        }
      };

      fall(height, target, fn);
    });
  }
}

export default new App();