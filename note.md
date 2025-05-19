# 1. Timer

## 1-1. Settings

使用 `createTimer()` 创建 Timer 对象，其中：

```ts
createTimer({
  duration: 1000,
  frameRate: true,
  loop: true,
  // 上面是 Setting，下面是 Callbacks
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

### delay

| 属性  | 作用                 | 值                           | 默认值 |
| ----- | -------------------- | ---------------------------- | ------ |
| delay | 等待多少毫秒后开始。 | 一个大于等于 0 的 `Number`。 | 0      |

可以通过如下方式修改 default:

```ts
import { engine } from "animejs";
engine.defaults.delay = 500;
```

### duration

| 属性     | 作用                       | 值                                                                            | 默认值   |
| -------- | -------------------------- | ----------------------------------------------------------------------------- | -------- |
| duration | 持续时间（以毫秒为单位）。 | 一个大于等于 0 的 `Number`。当超过 `1e12` 时内部会固定为 `1e12`（大约 32 年） | Infinity |

当设置为 0 时， timer 会执行一次，`currentTime` 为 `0`。设置小于 0 的数字 timer 将不会执行。（至少 `onUpdate` 不会触发）

### loop

| 属性 | 作用           | 值                                        | 默认值 |
| ---- | -------------- | ----------------------------------------- | ------ |
| loop | 重复执行的次数 | [0, Infinity] 或 (Infinity 或 true 或 -1) | 0      |

### loopDelay

| 属性      | 作用                           | 值                       | 默认值 |
| --------- | ------------------------------ | ------------------------ | ------ |
| loopDelay | 每次循环之间的延迟（单位毫秒） | 大于等于 0 的 `Number`。 | 0      |

### alternate

| 属性      | 作用                                     | 值        | 默认值 |
| --------- | ---------------------------------------- | --------- | ------ |
| alternate | 设置为 `true` 时，循环计数的方向是否交替 | `Boolean` | false  |

```ts
createTimer({
  duration: 1000,
  loop: true,
  alternate: true,
  onUpdate: (self) => console.log(self.currentTime, self.iterationCurrentTime),
});
// iterationCurrentTime 会 0->1000, 1000->0 交替
```

### reversed

| 属性     | 作用                                                                                                | 值        | 默认值 |
| -------- | --------------------------------------------------------------------------------------------------- | --------- | ------ |
| reversed | 设置 timer 的初始方向，`currentTime` 永远是从 0 -> `duration`。只有 `iterationTime` 支持 `reversed` | `Boolean` | false  |

### autoplay

| 属性     | 作用                                                                      | 值                                                                           | 默认值 |
| -------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------ |
| autoplay | 是否自动开始，当 timer 开始后再设置是没有效果的，并且会被重置为 `false`。 | `true`: 自动执行; `false`: 手动调用 `play()`; `onScroll`: 达到滚动阈值后执行 | true   |

### frameRate

| 属性      | 作用                                      | 值                       | 默认值 |
| --------- | ----------------------------------------- | ------------------------ | ------ |
| frameRate | 设置 fps，也可以通过 `timer.fps` 实时修改 | 大于等于 0 的 `Number`。 | 120    |

该值受限于浏览器的最高刷新率

### playbackRate

| 属性         | 作用                      | 值                       | 默认值 |
| ------------ | ------------------------- | ------------------------ | ------ |
| playbackRate | 设置 timer 运行速度的倍率 | 大于等于 0 的 `Number`。 | 1      |

## 1-2. Callbacks

### onBegin

| 方法名  | 作用               | 值                    | 默认值 |
| ------- | ------------------ | --------------------- | ------ |
| onBegin | timer 开始时的回调 | `(timerSelf) => void` | noop   |

### onComplete

| 方法名     | 作用                        | 值                    | 默认值 |
| ---------- | --------------------------- | --------------------- | ------ |
| onComplete | 结束时（包括 loop）时的回调 | `(timerSelf) => void` | noop   |

### onUpdate

| 方法名   | 作用                            | 值                    | 默认值 |
| -------- | ------------------------------- | --------------------- | ------ |
| onUpdate | 每帧调用（由 `frameRate` 决定） | `(timerSelf) => void` | noop   |

### onLoop

| 方法名 | 作用               | 值                    | 默认值 |
| ------ | ------------------ | --------------------- | ------ |
| onLoop | 每次循环结束时调用 | `(timerSelf) => void` | noop   |

### onPause

| 方法名  | 作用       | 值                    | 默认值 |
| ------- | ---------- | --------------------- | ------ |
| onPause | 暂停时回调 | `(timerSelf) => void` | noop   |

通过 `timer.pause()` 和 `timer.resume()` 暂停和恢复

## 特殊: then(callback)

和 `onComplete` 一样，在 timer 完成时会调用 callback。

```ts
createTimer({ duration: 500 }).then(callback);
// 或者
async function waitForTimerToComplete() {
  return createTimer({ duraction: 500 });
}
const asyncTimer = await waitForTimerToComplete();
```

## 1-3. Methods

`createTimer()` 返回的 timer 对象可调用的方法，`then()` 应该也属于 Methods，但可能是考虑到 Callbacks 都是 timer 生命周期中的回调，所以将 `then()` 归到了 Callbacks。

Methods 没有特殊说明应该都是支持链式调用的。

### play()

手动开始 timer（`autoplay = false` 或者 reverse() complete 的 timer 都能被重新开始）。

### reverse()

让 timer 反向开始

### pause()

暂停

### restart()

重置所有属性，因为 `currentTime` 也重置为 0 了，所以如果该 timer 是 `autoplay = true`，则 timer 会自动开始。

### alternate()

切换 timer 的播放方向，`currentTime` 会重置到对应方向的时间轴上，即如果正向播放到 80% 的位置，执行 `alternate()` 后，会重置到 20% 的位置，接下就是 (20% -> 0%) 反向播放。

### resume()

恢复暂停的 timer。

### complete()

立即完成 timer。

### cancel()

暂停 timer，并且从引擎中删除以释放内存。

### revert()

取消 timer，并重置 `currentTime`。

### seek(time, muteCallbacks = false)

更新 `currentTime` 到指定的 time。`muteCallbacks` 设置为 true 时，会强制触发 `onUpdate` 等事件的回调。

### stretch(totalDuration)

设置总时间，注意如果一个 timer 是 `{duration: 1000, loop: 2}`，那么它原来的总时间是 `1000*3`，所以此时如果设置总时间为 300，那么每个 loop 分配到的 duration 就是 `300/3`。

## 1-4 Properties

`createTimer()` 返回的 timer 对象的属性。

| 名称                 | 类型             | 介绍                               |
| -------------------- | ---------------- | ---------------------------------- |
| id                   | String 或 Number | set/get timer 的 ID                |
| deltaTime            | Number           | 二帧之间的间隔时间（单位毫秒）     |
| currentTime          | Number           | set/get 总的时间（单位毫秒）       |
| iterationCurrentTime | Number           | set/get 当前迭代的时间（单位毫秒） |
| progress             | Number           | set/get 当前总时间的进度 (0 - 1)   |
| iterationProgress    | Number           | set/get 当前迭代时间的进度 (0 - 1) |
| currentIteration     | Number           | set/get 当前迭代次数               |
| speed                | Number           | set/get playbackRate               |
| fps                  | Number           | set/get frameRate                  |
| paused               | Number           | set/get 暂停状态                   |
| began                | Number           | set/get 开始状态                   |
| complete             | Number           | set/get 结束状态                   |
| reversed             | Number           | set/get 方向反转                   |

# 2. Animation

使用 `animate()` 创建 Animation 对象。

```ts
import { animate } from "animejs";
const animation = animate(targets, parameters);
```

## WAAPI

创建轻量级的(3KB)的 Animation。相比基础版本(10KB)，覆盖了大部分基础 API。

使用`(JS)`标记为仅基础版本支持，使用`(WAAPI)`标记为仅轻量版本支持。

```ts
import { waapi } from "animejs";
const animation = waapi.animate(targets, parameters);
```

## 2.1 Targets

`animate(targets, {})`

### CSS Selector

使用 CSS 选择器指定一个或多个 DOM 元素为目标。

支持所有 `document.querySelectorAll()` 支持的 `String` 值。

### DOM Elements

一个或多个 DOM 元素作为目标。

支持类型：

- HTMLElement
- SVGElement
- SVGGeometryElement
- NodeList

### JavaScript Objects `(JS)`

支持一个或多个 JavaScript 对象作为目标。

支持类型：

- Object
- Class 实例

```ts
const vector = { x: 0, y: 0 };
animate(vector, {
  x: 100,
  y: 150,
  onUpdate: () => (res1.textContent = JSON.stringify(vector)), // vector 会从 x:0,y:0 -> x:100,y:150
});
```

### Array of targets

所有支持的类型都可以放在数组中一起传给 `animate()`

## 2.2 Animatable