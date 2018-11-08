### SDK document

#### initRecorder

开启录音，获得声音频率，用来分析声音。

#### initContainer

初始化游戏舞台。

- canvas[ElemenetDom]: 用于渲染的画布
- width[number]: 画布宽度
- height[number]: 画布高度

#### initBackground

初始化游戏背景。

- attrs[obeject]: 背景参数
  - texture[Image]: 背景图

#### initRoad

初始化道路。

- attrs[object]: 道路参数
  - corlor[string]: 道路颜色
  - height[number]: 道路距离屏幕底部的高度，即道路的高度

#### initCharacter

初始化游戏人物。

- attrs[object]: 人物参数
  - x[number]: 人物与屏幕左侧的距离
  - width[number]: 人物渲染的宽度
  - height[number]: 人物渲染的高度
  - texture[Image]: 人物纹理

#### initObstacle

初始化游戏障碍物。

- x[number]: 障碍物与屏幕左侧的距离

- attrs[object]: 障碍物参数
  - intervalRange[array]: 相邻障碍物的距离范围，intervalRange[0] ~ intervalRange [1]
  - width[number]: 障碍物渲染的宽度
  - height[number]: 障碍物渲染的高度
  - texture[Image]: 障碍物纹理

#### addObstacle

增加障碍物。

#### initGame

游戏数据初始化。

#### jump

控制人物跳跃。

- height[number]: 跳跃高度

#### move

控制场景移动。

- offset[number]: 移动距离

#### render

渲染画布。

#### isHitObstacle

碰撞检测，判断人物是否撞到障碍物。

#### alertGameover

渲染游戏结束提示。
