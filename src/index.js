// 物料准备
const stage = document.querySelector('#stage');
const characterTexture = createTexture('./images/character.png');
// const roadTexture = createTexture('./image/road.png');
// const obstaclTexture = createTexture('./image/obstacl.png');
// const bkTexture = createTexture('./image/bkTexture.png');

const {
  app
} = api;

// 初始化游戏舞台
const Stage = app.initContainer(stage);
const character = app.initCharacter({
  width: 100,
  height: 300,
  texture: characterTexture,
});
// const Road = FJ.initRoad({
//   length: 800,
//   height: 300,
//   texture: roadTexture
// });
// const Obstacle = FJ.initObstacle({
//   heightRange: [100, 300],
//   intervalRange: [200, 400],
//   texture: obstaclTexture
// });
// const Background = FJ.initBackground({
//   texture: bkTexture
// })

// Road.add(Obstacle);
// Stage.add(Character, Road, Background);

// setTimeout(functon() {
//   Stage.run();
// }, 3000);

function createTexture(src) {
  const img = new Image();
  img.src = src;
  return img;
}