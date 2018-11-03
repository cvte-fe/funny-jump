# funny-jump

包教不包会，60 分钟写个游戏小程序

### 它是什么？

这是一个非常有趣的项目，只要跟着教程一步一步的学习，就算是前端小白也能顺利完成一个微信小程序的游戏开发。

### 游戏内容

- 这个一个横版刷分游戏
- 通过手机语音识别，根据你喊出声音的大小去控制人物跳跃的高度，避开路上的障碍
- 可分享给好友（待定）

### 你能学到什么？

- 知道基础前端知识
- 了解游戏设计的基础知识
- 学会调用相关 API（笑）

### 学前准备

在开始本课程前，请确保你的电脑安装了编辑器，下面两个任选一个安装即可：

- [sublime](https://www.sublimetext.com/)
- [vscode](https://code.visualstudio.com/)

### 基础知识

- 基础前端知识[https://www.cnblogs.com/dreamingbaobei/p/5062901.html]
- 该游戏的实现思路[]

### 开始你的表演

首先我们先创建项目，项目目录为:

```
funny-jump

 - index.html
 - index.js
 - reset.css
```

[ 这里介绍什么是 html、css、 js, 以及它们的关系 ]

首先我们先创建一个 html 文本，内容如下:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>funny jump</title>
  <link rel="stylesheet" type="text/css" href="./reset.css">
</head>
<body>
<div id="stage"></div>
<script src="core.js"></script>
<script src="index.js"></script>
</body>
</html>
```

[ 介绍 html 引入 css 和 js 的基本方式 ]

可以看到我们一共引入了两个 js 文件，分别为`core.js`和`index.js`。`core.js`是整个游戏的核心代码，里面实现了动画、外设检测音量、碰撞检测等较为复杂的功能，而对于开发者而已，仅需简单地调用`core`提供的接口即可实现整个游戏逻辑。因此，我们主要的发挥舞台是`index.js`。

[ 实现逻辑 ][ 1. 需要将图片 - 纹理，介绍图片的一般加载方式 ]
[ 2. 动画的运行方式 - requestAnimationFrame ][ 3. 声音音量的检测 - api的调用 ]
