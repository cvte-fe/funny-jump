import Stage from "./Stage";
import Recorder from "./Recorder";

class App {
  initGame() {
    this.obstacles = [];
    this.isFall = true;
    this.jumpStartTime = 0;
    this.distance = 0;
    this.obstacleInterval = 0;

    this.addObstacle(this.obstacleIntervalImit);
  }

  initRecorder() {
    this.recorder = new Recorder();
    return this.recorder.start();
  }

  initBackground(props) {
    const { texture } = props;
    const ratio = texture.height / texture.width;
    const newProps = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.width * ratio,
      type: "image",
      img: props.texture
    };
    this.character = this.stage.add("background", newProps);
  }

  initContainer(stageCanvas, width, height) {
    this.canvas = stageCanvas;
    this.stage = new Stage(stageCanvas, width, height);
  }

  initCharacter(props) {
    const newProps = {
      ...props,
      y: this.road.y - props.height,
      type: "image",
      img: props.texture
    };
    this.character = this.stage.add("character", newProps);
  }

  initRoad(props) {
    const { height, color } = props;
    this.road = this.stage.add("road", {
      x: 0,
      y: this.canvas.height - height,
      width: this.canvas.width,
      height,
      color,
      type: "rect"
    });
  }

  initObstacle({ width, height, texture, intervalRange }) {
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
      y: obstacleProps.y
    };
    this.obstacles.push(pos);
    this.stage.add("obstacle" + (this.obstacles.length - 1), {
      ...this.obstacleProps,
      ...pos,
      type: "image"
    });
  }

  setObstacleIntervalRange(range) {
    if (range[0] > range[1]) {
      console.warn(
        "[funny-jump] range[0] should less than range[1].You set incorrect range," +
          range +
          "."
      );
    }
    this.obstacleIntervalRange = range;
  }

  jump(offset) {
    // 计算跳跃持续时间
    let lastTime = 0;
    if (this.jumpStartTime === 0) {
      this.jumpStartTime = Date.now();
    } else {
      lastTime = Date.now() - this.jumpStartTime;
    }

    if (lastTime < 1000 && this.isFall) {
      clearTimeout(this.jumpId);

      const originY = this.road.y - this.character.height;
      const height = originY - offset;
      this._rise(originY, height, y => {
        this.stage.update("character", "y", y);
      }).then(() => {
        this.jumpId = setTimeout(() => {
          if (this.isFall) {
            this.isFall = false;
            this._fall(height, originY, y => {
              this.stage.update("character", "y", y);
            }).then(() => {
              this.isFall = true;
              this.jumpStartTime = 0;
            });
          }
        }, 30);
      });
    }
  }

  move(offset) {
    this.distance += offset;
    this.obstacleInterval += offset;

    const [range1, range2] = this.obstacleIntervalRange;
    if (
      this.obstacleInterval >= range2 ||
      (Math.random() <= range1 / range2 && this.obstacleInterval >= range1)
    ) {
      this.addObstacle(this.canvas.width);
      this.obstacleInterval = 0;
    }
    this.obstacles.forEach((pos, i) => {
      const obstacleName = "obstacle" + i;
      if (pos.x > -this.obstacleProps.width) {
        pos.x -= offset;
        this.stage.update(obstacleName, "x", pos.x);
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
    const { x, y, width, height } = this.character;

    const isHit = this.obstacles.find(pos => {
      return (
        x + width > pos.x &&
        x < pos.x + obstacleWidth &&
        y + height > pos.y &&
        y < pos.y + obstacleHeight
      );
    });

    this.gameOver = isHit;
    return isHit;
  }

  _rise(height, target, render) {
    return new Promise(resolve => {
      const rise = (height, target, render) => {
        if (!this.gameOver) {
          if (height < target) {
            const speed = Math.ceil((target - height) / 3);
            height += speed;
            render(height);
            window.requestAnimationFrame(
              rise.bind(null, height, target, render)
            );
          } else {
            render(target);
            resolve();
          }
        }
      };

      rise(height, target, render);
    });
  }

  _fall(height, target, render) {
    return new Promise(resolve => {
      const fall = (height, target, render) => {
        if (!this.gameOver) {
          if (height < target) {
            const speed = Math.ceil((target - height) / 3);
            height += speed;
            render(height);
            window.requestAnimationFrame(
              fall.bind(null, height, target, render)
            );
          } else {
            render(target);
            resolve();
          }
        }
      };

      fall(height, target, render);
    });
  }

  alertGameover() {
    this.stage.alertGameover("game over!");
  }
}

export default new App();
