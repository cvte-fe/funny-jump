// 物料准备
const stage = document.querySelector("#stage");
const characterTexture = createTexture("./images/character.png");
const obstaclTexture = createTexture("./images/obstacle.png");
const bkTexture = createTexture("./images/background.jpg");

const { app } = api;

// 初始化 Audio
app.initRecorder().then(() => {
  // 初始化游戏舞台
  app.initContainer(stage, window.innerWidth, window.innerHeight);
  app.initBackground({
    texture: bkTexture
  });
  app.initRoad({
    color: "#090",
    height: 50
  });
  app.initCharacter({
    x: 100,
    width: 100,
    height: 100,
    texture: characterTexture
  });
  app.initObstacle({
    intervalRange: [600, 1200],
    width: 50,
    height: 100,
    texture: obstaclTexture
  });

  app.initGame();

  // add obstacle in the beginning
  app.addObstacle(stage.width / 2);

  play();
});

function createTexture(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function play() {
  app.stage.clean();

  const volume = app.recorder.getVolume();

  if (volume >= 90) {
    // jump
    app.jump(~~volume * 1.5);
  }

  if (volume >= 70) {
    // run
    const offset = ~~(volume / 10);
    app.move(offset);
  }
  app.render();
  if (app.isHitObstacle()) {
    app.alertGameover();
  } else {
    window.requestAnimationFrame(play);
  }
}
