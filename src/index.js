// 物料准备
const stage = document.querySelector('#stage');
const characterTexture = createTexture('./images/character.png');
const obstaclTexture = createTexture('./images/obstacle.png');
// const bkTexture = createTexture('./image/bkTexture.png');

const {
  app
} = api;

// 初始化 Audio
app.initRecorder().then(() => {


  // 初始化游戏舞台
  app.initContainer(stage, window.innerWidth, window.innerHeight);

  app.initRoad({
    color: '#090',
    height: 150,
  });
  app.initCharacter({
    x: 100,
    width: 100,
    height: 100,
    texture: characterTexture,
  });
  app.initObstacle({
    intervalRange: [400, 800],
    width: 120,
    height: 120,
    texture: obstaclTexture,
  });
  // const Background = app.initBackground({
  //   texture: bkTexture
  // })

  app.initGame();

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

  if (volume >= 120) {
    // jump
    app.jump(~~(volume));
  }

  if (volume >= 40) {
    // run
    const offset = ~~(volume / 10);
    app.move(offset);
  }

  if (app.isHitObstacle()) {
    console.log('game over');
  } else {
    window.requestAnimationFrame(play);
  }

  app.render();
}