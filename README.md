# funny-jump

包教不包会，60 分钟写个游戏小程序

### 它是什么？

这是一个非常有趣的项目，只要跟着教程一步一步的学习，就算是前端小白也能顺利完成一个微信小程序的游戏开发。

### 游戏内容

- 这个一个横版刷分游戏
  这个游戏有点类似于小时候玩的超级玛丽，我们需要操控马里奥，让他奔跑、跳跃，越过一道又一道的障碍。一旦他触碰到障碍就 game over
- 利用语音控制。
  当你对准手机呐喊时，手机会接受到你的音量大小并作出相应的反应。喊得越大跳得越高。

### 你能学到什么？

- 知道基础前端知识
- 了解游戏设计的基础知识
- 学会调用相关 API（笑）

### 学前准备

- Node.js

可到[这里](https://nodejs.org/zh-cn/)下载最新版本的 Node.js

- IDE

请确保你的电脑安装了编辑器，下面两个任选一个安装即可

- [sublime](https://www.sublimetext.com/)
- [vscode](https://code.visualstudio.com/)

### 开始你的表演

#### 安装并运行

首先我们得先确保项目是否能正常运行，在命令行输入如下指令，将仓库克隆到本地：

```
git clone https://github.com/cvte-fe/funny-jump.git
```

安装并运行：

```
npm install
```

```
npm run start
```

正常运行后，在浏览器输入`localhost:9000`，打开控制台，看看是否有报错，无没有则说明运行成功，我们继续~

#### 目录结构介绍

打开目录`src/index.html`文件

```html
<!DOCTYPE html>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>funny jump</title>
  <link rel="stylesheet" type="text/css" href="./reset.css">
</head>

<body>
  <canvas id="stage"></canvas>
  <script src="core.js"></script>
  <script src="index.js"></script>
</body>

</html>
```

从上面这段代码可以发现，一般 html 与 css、js 相关联的方式是：使用 link 标签将 css 引入，使用 script 标签引入 js 文件。上面这段代码一共引入了三个文件:

- `reset.css` 这是一个专门用来统一不同浏览器的渲染差异，尽可能让它们的表现行为一致。

- `core.js` 它是整个游戏的核心代码，里面实现了动画、外设检测音量、碰撞检测等较为复杂的功能，而对于学员而已，仅需简单地调用`core`提供的接口即可实现整个游戏逻辑，不必关心它里面做了什么

- `index.js` 这是我们发挥的主舞台，我们将在这里实现人生中的第一段 js 代码:)

#### 游戏设计要素

在创建游戏前我们需要从整体上了解它的设计思路，这对于后续的代码编写非常有好处，你可以清晰的知道现在自己在做什么，以及写的这段代码有什么含义自。

就该游戏而言，它包含了几个基本要素，分别是：

- 场景
  场景是一个可以容纳所有游戏元素的容器，这就好比你去看一场话剧，演员需要一个舞台来表演节目，灯光也需要打到舞台上才能看清演员面孔…...而这个舞台就是我们所说的场景，它涵盖了所有可展示、可衬托的元素（如人物，光照）

- 元素
  按上面的比喻那它就是舞台中的话剧演员了。一般而言，元素按功能可分为几种：可交互与不可交互，动态与静态等。因此在游戏中，可交互、动态的元素有马里奥，不可交互的、动态的则是障碍物，而蓝天、白云、土地则是不可交互且静态的元素。

- 游戏规则

  就是说白了就是游戏玩法，在本游戏中，我们通过呐喊的音量去控制马里奥的行为，当声音到达某一分贝（设为 N）的时候，我们让它行走，而超出某一分贝时（设为 K），则在行走的同时让它向上跳跃，而一旦马里奥与障碍物有了接触，则游戏失败。整个过程非常简单。

#### 获取容器与纹理

OK 废话讲了一大堆，我们继续，首先我们打开`src/index.js`，在里面写这么一段代码：

```javascript
// 物料准备
const stage = document.querySelector("#stage");
// 人物、障碍物及背景皮肤
const characterTexture = createTexture("./images/character.png");
const obstaclTexture = createTexture("./images/obstacle.png");
const bkTexture = createTexture("./images/background.jpg");
```

我们通过`document.querySelector`的方式获取到了 html 中的 id 为`stage`的 div 容器，把它当作游戏的场景。接着就是一些纹理的准备：一般而言每个游戏元素都有着自己的纹理，这样才能体现出它应有的特征，你可以简单理解成游戏角色的皮肤。我们通过`createTexture`这个函数获取到了纹理图片。这个函数的实现方法也非常简单，如下所示：

```javascript
function createTexture(src) {
  const img = new Image();
  img.src = src;
  return img;
}
```

#### 创建舞台

所有的构建代码如下所示：

```javascript
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
```

首先，我们通过`initRecorder`的方式初始化手机的录音设备，

由于它是一个异步方法，所以我们只能通过往`then`方法传入回调的形式来继续下面的流程。

我们通过`initContainer`的方式去创建场景，同时传入了三个参数：刚刚获取的容器、页面宽度与高度:

```javascript
app.initContainer(stage, window.innerWidth, window.innerHeight);
```

#### 创建游戏元素

- 背景
  `initBackground`可创建背景

  ```javascript
  app.initBackground({
    texture: bkTexture
  });
  ```

- 道路
  通过`initRoad`方法可以创建出道路，它接受两个参数：颜色与高度

  ```javascript
  app.initRoad({
    color: "#090",
    height: 50
  });
  ```

  ​

- 马里奥

  ```javascript
  app.initCharacter({
    x: 100,
    width: 100,
    height: 100,
    texture: characterTexture
  });
  ```

  `initCharacter`可用于创建出游戏角色，x 代表的是游戏的初始位置（x 方向），width 和 height 则是人物的宽高。而 texture 就使用了上面所创建的人物纹理`characterTexture`

- 障碍物

  ```javascript
  app.initObstacle({
    intervalRange: [600, 1200],
    width: 50,
    height: 100,
    texture: obstaclTexture
  });
  ```

  `intervalRange`表示的是每隔多少长度出现一个障碍物，这增加了游戏的随机性，剩余后三个参数不用说，值得一提的是我们这里使用了`obstaclTexture`这个纹理。

#### 让游戏跑起来

可以看到最后我们还加了两个函数`initGame`和`play`，前者用于初始化整个游戏，后者则是启动游戏，并让它循环运行整个游戏，敲重点，这可是整个游戏能否顺利运行的关键！

为何怎么说？首先我们需要明白游戏是怎么运行起来的，它的原理有点类似于视频，视频里面的人物之所以能够“动”起来，是因为它是逐帧逐帧地播放图片，由于人眼视觉暂留的影响，导致觉得它在动。游戏也是类似的，只不过人物该怎么运动交给我们自己去控制罢了。接下来我们看看`play`具体怎么实现：

```javascript
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
```

既然要“逐帧”播放图片，那怎么从一张图片切换到另一张图片呢？方法很简单，我们先渲染出游戏场景，然后等待下一个周期的到来，下一个周期到来后我们把整个容器的内容给擦除清空，再根据当前的操控指令重新计算渲染游戏场景，再继续等待下一个周期的到来……以此类推，反复下去。

因此在`play`函数中要做的第一件事就是清空整个容器内容（这里调用了`app.stage.clean`），然后通过`app.recorder.getVolume()`获取我们实时呐喊的音量大小，接着我们做了两个判断：当音量大于等于 70 分贝的时候，我们让马里奥行走。而大于 90 的时候，我们不仅让他行走，还让他向前跳跃，跳跃这个动作通过`app.jump(~~(volume))`完成，然后通过`app.render`将计算后的结果绘制到场景里。

这还没完，我们还需要判断马里奥是否撞到了障碍物呢，接着我们通过`app.isHitObstacle`判断马里奥与障碍物是否有“身体接触”，有则调用`app.alertGameover`方法提示游戏结束。

接着我们通过`window.requestAnimationFrame(play)`去循环执行 play 函数，这个 api 很有趣，它的作用是，向`window.requestAnimationFrame`方法传入一个指定的回调函数，当浏览器空闲的时候，就会去执行指定它，恰好我们是把`window.requestAnimationFrame`放在了递归调用里，因此它就可以无限循环下去。

代码写完啦，现在我们再看看浏览器，看看你的马里奥是否能够运行吧！

学完不烦点个 star 再走噢~😆

### 附录完整代码

```javascript
// 物料准备
const stage = document.querySelector("#stage");
const characterTexture = createTexture("./images/character.png");
const obstaclTexture = createTexture("./images/obstacle.png");
const bkTexture = createTexture("./images/background.jpg");

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
```
