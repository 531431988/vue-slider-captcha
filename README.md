### vue-slider-captcha 滑动验证

#### 使用方法

> npm i vue-slider-captcha

```javascript
import VueSliderCaptcha from "vue-slider-captcha";
components{
  VueSliderCaptcha
}
```

> 引入以下代码

```javascript
<VueSliderCaptcha
  ref="sliderCaptcha"
  v-model="status"
  :src="src"
  :sliderSrc="sliderSrc"
  :y="y"
  color="#1890ff"
  @on-refresh="onRefresh"
  @on-finish="onFinish"
></VueSliderCaptcha>
```

#### API

##### props

| 参数       | 说明                                            | type    | 默认值                     |
| ---------- | ----------------------------------------------- | ------- | -------------------------- |
| value      | 验证状态                                        | Boolean | false                      |
| tip        | 初始文字                                        | String  | 向右拖动滑块填充拼图       |
| successTip | 成功提示文字                                    | String  | 验证通过                   |
| failTip    | 成功提示文字                                    | String  | 拖动滑块将悬浮图像正确合并 |
| color      | 主题颜色                                        | String  | #76c61d                    |
| src        | 后台返回随机背景图片地址（base64 png 400\*200） | String  | -                          |
| sliderSrc  | 后台返回随机滑块图片地址（base64 png ）         | String  | -                          |
| y          | 后台返回随机生成 Y 轴的偏移量                   | Number  | -                          |

##### methods

| 参数    | 说明         | type | 默认值 |
| ------- | ------------ | ---- | ------ |
| onReset | 重置验证状态 |      | -      |

##### event

| 事件名称  | 说明         | 回调参数 |
| --------- | ------------ | -------- |
| on-finish | 点击刷新回调 | -        |

[演示](https://531431988.github.io/vue-slider-captcha/dist/)
